// import React from 'react'
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

const ChartOfAccounts = () => {
  // let dataApi = [
  //   {
  //     accountName: "Lodging",
  //     accountCode: "",
  //     accountType: "Expenss",
  //     document: "",
  //     parentAccountName: "",
  //   },
  //   {
  //     accountName: "Purchase Account",
  //     accountCode: "",
  //     accountType: "Expenss",
  //     document: "",
  //     parentAccountName: "",
  //   },
  //   {
  //     accountName: "Petty Cash",
  //     accountCode: "",
  //     accountType: "Cash",
  //     document: "",
  //     parentAccountName: "",
  //   },
  //   {
  //     accountName: "Advance Tax",
  //     accountCode: "",
  //     accountType: "Other Current Asset",
  //     document: "",
  //     parentAccountName: "",
  //   },
  // ];

  // let [data, setData] = useState([]);
  // let getData = () => {
  //   setData(dataApi);
  // };

  const [accounts, setAccounts] = useState<any>([]);

  useEffect(()=> {
    axios.get('http://localhost:3000/chartofaccounts').then((res) =>{
      setAccounts(res.data);
    })
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold my-10 mb-8">Active Accounts</h1>
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
          {accounts.map((item, index:number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.AccountTypeId}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">
                {item.parentAccountName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ChartOfAccounts;
