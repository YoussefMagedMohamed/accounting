// import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

const AllItems = () => {


  let [data, setData] = useState([]);

  useEffect(()=> {
    axios.get('http://localhost:3000/items').then(a=> setData(a.data))
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold my-10 mb-8">All Items</h1>
      <Link to={"/items"}><Button className="me-auto">New Item</Button></Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NAME</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Purchase Description</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Purchase Rate</TableHead>
            <TableHead className="text-right">Usage Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.desc}</TableCell>
              <TableCell>{item.purchaseDesc}</TableCell>
              <TableCell>{item.rate}</TableCell>
              <TableCell>{item.purchaseRate}</TableCell>
              <TableCell className="text-right">{item.usageUnit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AllItems;
