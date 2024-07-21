// import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import axios from "axios";
import { setDate } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ChartOfAccounts = () => {
  const [accounts, setAccounts] = useState<any>([]);

  const deleteAccount = async (id) => {
    let data = await axios.delete(
      `http://localhost:3000/chartofaccounts/${id}`
    );
  };

  useEffect(() => {
    axios.get("http://localhost:3000/chartofaccounts").then((res) => {
      setAccounts(res.data);
    });
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold my-10 mb-8">Active Accounts</h1>
      <Link to={"/newAccount"}>
        <Button className="me-auto">New Account</Button>
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ACCOUNT NAME</TableHead>
            <TableHead>ACCOUNT CODE</TableHead>
            <TableHead>ACCOUNT TYPE</TableHead>
            <TableHead>DOCUMENTS</TableHead>
            <TableHead className="text-right">PARENT ACCOUNT NAME</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((item, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.AccountTypeId}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">
                {item.parentAccountName}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>Delete</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <h2>Do you want to delete this account ?</h2>
                    <Button className="m-5" onClick={() => {
                      deleteAccount(item.id)
                    }}>Yes</Button>
                    <Button className="m-5">No</Button>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/editAccount/${item.id}`} className="">
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ChartOfAccounts;
