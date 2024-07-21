// import React from 'react'
// import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NewAccount = () => {
  let idParam = useParams();
  console.log(idParam);

  const [accountsType, setAccountsType] = useState<any>([]);
  const [getAccount, setGetAccount] = useState<any>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/accountsType").then((res) => {
      setAccountsType(res.data);
    });

    axios
      .get(`http://localhost:3000/chartofaccount/${idParam.id}`)
      .then((res) => {
        setGetAccount(res.data);
        // form.setValue()
        console.log(getAccount);
      });
  }, []);

  // Validation Schema
  const FormSchema = z.object({
    accountType: z.string({
      required_error: "Please select an Assets to Display.",
    }),
    accountName: z
      .string({ required_error: "Account Name is required." })
      .min(2, {
        message: "Account Name must be at least 2 characters.",
      })
      .max(50, {
        message: "Account Name must not be longer than 50 characters.",
      }),
    accountCode: z.coerce.number().positive().optional(),
    wishlist: z.boolean().default(false).optional(),
    description: z
      .string()
      .min(3, {
        message: "Description must be at least 3 characters.",
      })
      .max(500, {
        message: "Description must not be longer than 500 characters.",
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wishlist: true,
      // accountName: {getAccount},
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    axios
      .post("http://localhost:3000/chartofaccounts", form.getValues())
      .then((a) => {
        console.log({ a });

        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      });
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-6 mb-8">
        Edit Account{" "}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Account Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {accountsType.map((item, index: number) => {
                      return (
                        <SelectItem key={index} value={item.id}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {/* <FormDescription>
                  You can manage email addresses in your{" "}
                  <Link href="/examples/forms">email settings</Link>.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name*</FormLabel>
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
            name="accountCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Code</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
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

          <FormField
            control={form.control}
            name="wishlist"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Add to the wishlist on my dashboard</FormLabel>
                  {/* <FormDescription>
                  You can manage your mobile notifications in the{" "}
                  <Link href="/examples/forms">mobile settings</Link> page.
                </FormDescription> */}
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="me-5">
            Save
          </Button>
          <Button type="button" className="me-5">
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
};

export default NewAccount;
