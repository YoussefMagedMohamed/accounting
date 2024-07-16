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
import { useState } from "react";

const ChartOfAccounts = () => {
  let dataApi = [
    {
      accountName: "Lodging",
      accountCode: "",
      accountType: "Expenss",
      document: "",
      parentAccountName: "",
    },
    {
      accountName: "Purchase Account",
      accountCode: "",
      accountType: "Expenss",
      document: "",
      parentAccountName: "",
    },
    {
      accountName: "Petty Cash",
      accountCode: "",
      accountType: "Cash",
      document: "",
      parentAccountName: "",
    },
    {
      accountName: "Advance Tax",
      accountCode: "",
      accountType: "Other Current Asset",
      document: "",
      parentAccountName: "",
    },
  ];

  // let [data, setData] = useState([]);
  // let getData = () => {
  //   setData(dataApi);
  // };

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
          {dataApi.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.accountName}</TableCell>
              <TableCell>{item.accountCode}</TableCell>
              <TableCell>{item.accountType}</TableCell>
              <TableCell>{item.document}</TableCell>
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
