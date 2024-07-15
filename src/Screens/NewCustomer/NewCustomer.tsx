// import React from 'react'
// import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";

// Validation Schema
const FormSchema = z.object({
  customertype: z.enum(["Business", "Individual"], {
    required_error: "You need to select a notification type.",
  }),
  primaryContact: z.string({
    required_error: "Please select an salutation to display.",
  }),
  firstName: z
    .string()
    .min(2, {
      message: "Fisrt Name must be at least 2 characters.",
    })
    .max(30, { message: "First Name must not be longer than 30 characters." }),
  lastName: z
    .string()
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    })
    .max(30, { message: "Last Name must not be longer than 30 characters." }),
  companyName: z
    .string()
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    })
    .max(30, { message: "Last Name must not be longer than 30 characters." }),
  customerDisplayName: z
    .string()
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    })
    .max(30, { message: "Last Name must not be longer than 30 characters." }),
  attention1: z
    .string()
    .min(2, {
      message: "Attention must be at least 2 characters.",
    })
    .max(30, { message: "Attention must not be longer than 30 characters." }),
  attention2: z
    .string()
    .min(2, {
      message: "Attention must be at least 2 characters.",
    })
    .max(30, { message: "Attention must not be longer than 30 characters." }),
  customerEmail: z.string().email(),
  customerPhone: z.string().regex(new RegExp(/^01[0125][0-9]{9}$/)), // (/^01[0125][0-9]{9}$/)
  customerMobile: z.number().positive(),
  phone1: z.number().positive(),
  faxNumber1: z.number().positive(),
  phone2: z.number().positive(),
  faxNumber2: z.number().positive(),
  workPhoneTable: z.number().positive(),
  mobilePhoneTable: z.number().positive(),
  zipCode1: z.number().positive(),
  zipCode2: z.number().positive(),
  currency: z.string(),
  taxRate: z.string(),
  country1: z.string(),
  country2: z.string(),
  address1: z
    .string()
    .min(2, {
      message: "Street 1 must be at least 2 characters.",
    })
    .max(50, { message: "Street 1 must not be longer than 50 characters." }),
  address2: z
    .string()
    .min(2, {
      message: "Street 2 must be at least 2 characters.",
    })
    .max(50, { message: "Street 2 must not be longer than 50 characters." }),
  address3: z
    .string()
    .min(2, {
      message: "Street 1 must be at least 2 characters.",
    })
    .max(50, { message: "Street 1 must not be longer than 50 characters." }),
  address4: z
    .string()
    .min(2, {
      message: "Street 2 must be at least 2 characters.",
    })
    .max(50, { message: "Street 2 must not be longer than 50 characters." }),
  city1: z
    .string()
    .min(2, {
      message: "City  must be at least 2 characters.",
    })
    .max(50, { message: "City must not be longer than 50 characters." }),
  city2: z
    .string()
    .min(2, {
      message: "City  must be at least 2 characters.",
    })
    .max(50, { message: "City must not be longer than 50 characters." }),
  paymentTerms: z.string(),
  portalLanguage: z.string(),
  state1: z.string(),
  state2: z.string(),
  openingBalance: z.number().positive(),
  enablePortal: z.boolean().default(false).optional(),
  salutation: z.string(),
  emailTable: z.string().email(),
  firstNameTable: z
    .string()
    .min(2, {
      message: "First Name  must be at least 2 characters.",
    })
    .max(20, { message: "First Name must not be longer than 20 characters." }),
  lastNameTable: z
    .string()
    .min(2, {
      message: "Last Name  must be at least 2 characters.",
    })
    .max(20, { message: "Last Name must not be longer than 20 characters." }),
  remarks: z
    .string()
    .min(3, {
      message: "Remarks must be at least 3 characters.",
    })
    .max(160, {
      message: "Remarks must not be longer than 160 characters.",
    }),
});

const NewCustomer = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      customerDisplayName: "",
      customerEmail: "",
      currency: "",
      taxRate: "",
      paymentTerms: "",
      portalLanguage: "",
      enablePortal: false,
      attention1: "",
      country1: "",
      attention2: "",
      country2: "",
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      city1: "",
      city2: "",
      state2: "",
      firstNameTable: "",
      lastNameTable: "",
      emailTable: "",
      remarks: "",
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

  type contactPersonTable = {
    salutation: string;
    firstName: string;
    lastName: string;
    email: string;
    workPhone: string;
    Mobile: string;
    row: number[];
  };

  const { register, handleSubmit, errors, control } = useForm<PersonScore>();
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
      <h1 className="text-center text-2xl font-bold my-6 mb-8">New Customer</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="customertype"
            render={({ field }) => (
              <FormItem className="space-y-3 flex items-center">
                <FormLabel>Customer Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row items-center space-y-1"
                  >
                    <FormItem className="flex flex-row items-center ms-10 space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Business" />
                      </FormControl>
                      <FormLabel className="font-normal">Business</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Individual" />
                      </FormControl>
                      <FormLabel className="font-normal">Individual</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="primaryContact"
              render={({ field }) => (
                <FormItem className="w-full me-10">
                  <FormLabel>Primary Contact</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Salutation" />
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
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full me-10">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full me-10">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="w-full me-10">
                <FormLabel>Company Name </FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerDisplayName"
            render={({ field }) => (
              <FormItem className="w-full me-10">
                <FormLabel>Customer Display Name* </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem className="w-full me-10">
                <FormLabel>Customer E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <FormLabel className="w-full">Customer Phone</FormLabel>

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem className="w-full me-10">
                  <FormControl>
                    <Input placeholder="Work Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerMobile"
              render={({ field }) => (
                <FormItem className="w-full me-10">
                  <FormControl>
                    <Input placeholder="Mobile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Tabs defaultValue="otherDetails" className="pb-20 pt-10">
            <TabsList className="w-full">
              <TabsTrigger value="otherDetails">Other Details</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="contactPersons">Contact Persons</TabsTrigger>
              <TabsTrigger value="remarks">Remarks</TabsTrigger>
            </TabsList>
            <TabsContent value="otherDetails" className="py-10">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-full me-10 my-5">
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Currency" />
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

              <FormField
                control={form.control}
                name="taxRate"
                render={({ field }) => (
                  <FormItem className="w-full me-10 my-5">
                    <FormLabel>Tax Rate</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Tax" />
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

              <FormField
                control={form.control}
                name="openingBalance"
                render={({ field }) => (
                  <FormItem className="w-full me-10 my-5">
                    <FormLabel>Opening Balance</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentTerms"
                render={({ field }) => (
                  <FormItem className="w-full me-10 my-5">
                    <FormLabel>Payment Terms</FormLabel>
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
              <FormField
                control={form.control}
                name="enablePortal"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start  space-x-3 space-y-0 p-4 my-5">
                    <FormLabel>Enable Portal ?</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        <p className="font-light">
                          Allow portal access for this customer
                        </p>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="portalLanguage"
                render={({ field }) => (
                  <FormItem className="w-full me-10 my-5">
                    <FormLabel>Portal Languages</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Language" />
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
            </TabsContent>
            <TabsContent value="address">
              <div>
                <div className="flex gap-4">
                  <div className="py-10 flex-1 w-1/2">
                    <h1 className="font-black pb-10">Billing Address</h1>
                    <FormField
                      control={form.control}
                      name="attention1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Attention</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country1"
                      render={({ field }) => (
                        <FormItem className="w-full me-10 my-5">
                          <FormLabel>Country / Region</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Country" />
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
                    <FormField
                      control={form.control}
                      name="address1"
                      render={({ field }) => (
                        <FormItem className="my-5">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Street 1"
                              className="resize-none w-1/2 my-5"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem className="my-5">
                          <FormControl>
                            <Textarea
                              placeholder="Street 2"
                              className="resize-none w-1/2 my-5"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city1"
                      render={({ field }) => (
                        <FormItem className="my-5">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state1"
                      render={({ field }) => (
                        <FormItem className="w-full me-10 my-5">
                          <FormLabel>State</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a State" />
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
                    <FormField
                      control={form.control}
                      name="zipCode1"
                      render={({ field }) => (
                        <FormItem className="my-5">
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone1"
                      render={({ field }) => (
                        <FormItem className="my-5">
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="faxNumber1"
                      render={({ field }) => (
                        <FormItem className="my-5">
                          <FormLabel>Fax Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                    <div className="py-10 flex-1 w-1/2">
                      <h1 className="font-black pb-10">Shipping Address</h1>

                      <FormField
                        control={form.control}
                        name="attention2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attention</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country2"
                        render={({ field }) => (
                          <FormItem className="w-full me-10 my-5">
                            <FormLabel>Country / Region</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a Country" />
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
                      <FormField
                        control={form.control}
                        name="address3"
                        render={({ field }) => (
                          <FormItem className="my-5">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Street 1"
                                className="resize-none w-1/2 my-5"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address4"
                        render={({ field }) => (
                          <FormItem className="my-5">
                            <FormControl>
                              <Textarea
                                placeholder="Street 2"
                                className="resize-none w-1/2 my-5"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city2"
                        render={({ field }) => (
                          <FormItem className="my-5">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state2"
                        render={({ field }) => (
                          <FormItem className="w-full me-10 my-5">
                            <FormLabel>State</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a State" />
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
                      <FormField
                        control={form.control}
                        name="zipCode2"
                        render={({ field }) => (
                          <FormItem className="my-5">
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone2"
                        render={({ field }) => (
                          <FormItem className="my-5">
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="faxNumber2"
                        render={({ field }) => (
                          <FormItem className="my-5">
                            <FormLabel>Fax Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
              </div>
            </TabsContent>
            <TabsContent value="contactPersons">
              <div className="py-10">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Salutation</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email Address</TableHead>
                      <TableHead>Work Phone </TableHead>
                      <TableHead>Mobile</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((row, index) => {
                      return (
                        <TableRow key={index} className="py-5">
                          <TableCell className="font-medium">
                            <FormField
                              control={form.control}
                              name="salutation"
                              render={({ field }) => (
                                <FormItem className="w-6/6">
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue />
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
                          <TableCell>
                            <FormField
                              control={form.control}
                              name="firstNameTable"
                              render={({ field }) => (
                                <FormItem className="w-6/6">
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
                              name="lastNameTable"
                              render={({ field }) => (
                                <FormItem className="w-6/6">
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
                              name="emailTable"
                              render={({ field }) => (
                                <FormItem className="w-6/6">
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
                              name="workPhoneTable"
                              render={({ field }) => (
                                <FormItem className="w-6/6">
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
                              name="mobilePhoneTable"
                              render={({ field }) => (
                                <FormItem className="w-6/6">
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <i
                              onClick={removeRow}
                              className="fa-solid fa-xmark cursor-pointer"
                            ></i>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <Button
                  className="block my-10"
                  type="button"
                  onClick={addNewRow}
                >
                  Add New Row
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="remarks">
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem className="py-10">
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          <Button type="submit" className="mb-10 me-5">
            Save
          </Button>
          <Button type="button" className="mb-10 me-5">
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
};

export default NewCustomer;
