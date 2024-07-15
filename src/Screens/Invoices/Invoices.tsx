// import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { date, z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  customerName: z
    .string()
    .min(3, {
      message: "Customer Name must be at least 3 characters.",
    })
    .max(20, {
      message: "Customer Name must not be longer than 20 characters.",
    }),
  invoiceNum: z.string(),
  orderNum: z.string(),
  startDateInvoice: z.date({
    required_error: "A start date of invoice is required.",
  }),
  endDateInvoice: z.date({
    required_error: "A end date of invoice is required.",
  }),
  terms: z.string(),
  itemDetails: z
    .string()
    .min(3, {
      message: "Bio must be at least 3 characters.",
    })
    .max(500, {
      message: "Bio must not be longer than 500 characters.",
    }),
  quantity: z.number().positive(),
  rate: z.number().positive(),
  customerNote: z
    .string()
    .min(3, {
      message: "Bio must be at least 3 characters.",
    })
    .max(500, {
      message: "Bio must not be longer than 500 characters.",
    }),
});

const Invoices = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      customerName: "",
      invoiceNum: "",
      orderNum: "",
      quantity: 1,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // Data Of Table
  type newTable = {
    itemDetails: string;
    quantity: string;
    rate: number;
    amount: number;
    row: number[];
  };

  const { register, handleSubmit, errors, control } = useForm<newTable>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "row",
  });
  if (fields.length === 0) {
    append({});
    append({});
  }

  // Function for adding new row
  let addNewRow = () => {
    append({});
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-6 mb-8">New Invoice</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Add a Customer Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoiceNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice#*</FormLabel>
                <FormControl>
                  <Input placeholder="Add a Invoice Serial" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="orderNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="startDateInvoice"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Invoice Date*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick Your Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terms</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Due on Receipt" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDateInvoice"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick Your Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h2>Item Table</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/4]">ITEM DETAILS </TableHead>
                <TableHead>QUANTITY</TableHead>
                <TableHead>RATE </TableHead>
                <TableHead className="text-right">AMOUNT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <FormField
                        control={form.control}
                        name="itemDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Enter item details"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    <TableCell>
                      <i className="fa-solid fa-xmark cursor-pointer"></i>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <FormField
            control={form.control}
            name="customerNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Thanks for your business."
                    className="resize-none w-1/3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="block" type="button" onClick={addNewRow}>
            Add New Row
          </Button>

          <Button type="submit" className="me-3">
            Save as Draft
          </Button>
          <Button type="submit" className="me-3">
            Save and Send
          </Button>
          <Button type="button" className="me-3">
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Invoices;
