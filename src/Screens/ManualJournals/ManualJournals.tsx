// import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  // FormDescription,
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ManualJournals = () => {
  // Validation
  const FormSchema = z.object({
    date: z.date({
      required_error: "A date is required.",
    }),
    journal: z.number().positive(),
    reference: z.string().min(3, {
      message: "Reference must be at least 3 characters.",
    }),
    note: z
      .string()
      .min(3, {
        message: "Bio must be at least 3 characters.",
      })
      .max(500, {
        message: "Bio must not be longer than 500 characters.",
      }),
    tableAccount: z.string({
      required_error: "Please select an account to display.",
    }),
    tableDescription: z
      .string()
      .min(3, {
        message: "Bio must be at least 3 characters.",
      })
      .max(160, {
        message: "Bio must not be longer than 160 characters.",
      }),
    tableDebit: z.number().positive(),
    tableCredit: z.number().positive(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      journal: 1,
      note: "",
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
    account: string;
    description: string;
    debits: number;
    credits: number;
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

  // Function for deleting row 
  let removeRow = () => {
    // remove({index});
    console.log("HELLO");
    
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-6 mb-8">New Journal</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 m-5 w-full"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 opacity-50" />
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
                {/* <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="journal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Journal#*</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference#</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Max. 500 Characters"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ACCOUNT</TableHead>
                <TableHead>DESCRIPTION</TableHead>
                <TableHead>DEBITS</TableHead>
                <TableHead>CREDITS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="w-2/4">
                      <FormField
                        control={form.control}
                        name="tableAccount"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an Account" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="m@example.com">
                                  m@example.com
                                </SelectItem>
                                <SelectItem value="m@google.com">
                                  m@google.com
                                </SelectItem>
                                <SelectItem value="m@support.com">
                                  m@support.com
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="w-1/4">
                      <FormField
                        control={form.control}
                        name="tableDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Description"
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
                        name="tableDebit"
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
                        name="tableCredit"
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
                      <i onClick={removeRow} className="fa-solid fa-xmark cursor-pointer"></i>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Button className="block" type="button" onClick={addNewRow}>
            Add New Row
          </Button>

          <Button type="submit" className="me-3">
            Save and Publish
          </Button>
          <Button type="submit" className="me-3">
            Save as Draft
          </Button>
          <Button type="button" className="me-3">
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ManualJournals;
