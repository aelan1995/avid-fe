"use client";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button  } from "./providers.js";

import React, { useEffect, useState } from "react";

import { DefaultPagination } from "./getPagination.js";


const TABLE_HEAD = ["Contract Key","Contract Number","Contract Type","Contract Sub Type"];

export function Contracts() {

  const [contract, getContracts] = useState([])

  const fetchContracts = () => {
    fetch("https://demoapi.jcadevdomain.com/api/contract")
      .then(response => {
        return response.json()
      })
      .then(data => {
        getContracts(data.data)
      })
  }

  useEffect(() => {
    fetchContracts()
  }, [])

  return (
    <Card className="overflow-scroll ">
       <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Contracts list
              </Typography>
            </div>
          </div>
       </CardHeader>
       <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>        
            {contract.map(index => {
                const isLast = index === contract.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index.id}>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {index.contract_key}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {index.contract_no}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {index.contract_type}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {index.contract_sub_type}
                        </Typography>
                      </td>
                  </tr>                  
                )             
              })}
            </tbody>
          </table>
      </CardBody>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50">
        <DefaultPagination />
      </CardFooter>
      
    </Card>
  )
}



