"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Arial,
  Eurostile_Extended_Regular,
  TextLight,
  TextMedium,
  variableFont,
} from "../layout";

export default function Home() {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Get the id from the URL

  const { data, isLoading, isError } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const res = await fetch(
        `http://campion.medwithus.com/ResultTester?Order_id=${id}`
      );
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className={`${Arial.className}`}>
        {data.samples.map((sample, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex w-full ${Eurostile_Extended_Regular.className} gap-6 px-6 text-[9pt] patient`}
            >
              <div className={`flex  flex-col gap-1 w-full`}>
                <div className=" text-white rounded-lg gap-1  flex w-full">
                  <div className="w-[45%] bg-primary p-[2px] px-2 rounded-lg">
                    <h3 className=" ">Patient</h3>
                  </div>
                  <div className="w-full border border-black p-[2px] px-2  rounded-lg">
                    <h3 className={` text-black ${TextLight.className} `}>
                      {sample.patient_name}
                    </h3>
                  </div>
                </div>
                <div className=" text-white rounded-lg gap-1  flex w-full">
                  <div className="w-[45%] bg-primary p-[2px] px-2  rounded-lg">
                    <h3 className=" ">Age</h3>
                  </div>
                  <div className="w-full border border-black p-[2px] px-2 rounded-lg">
                    <h3 className=" text-black ">{sample.age}</h3>
                  </div>
                </div>
                <div className=" text-white rounded-lg gap-1  flex w-full">
                  <div className="w-[45%] bg-primary p-[2px] px-2  rounded-lg">
                    <h3 className=" ">Gender</h3>
                  </div>
                  <div className="w-full border border-black p-[2px] px-2 rounded-lg">
                    <h3 className=" text-black ">{sample.gender}</h3>
                  </div>
                </div>
                <div className=" text-white rounded-lg gap-1  flex w-full">
                  <div className="w-[45%] bg-primary p-[2px] px-2  rounded-lg">
                    <h3 className=" ">Consultant</h3>
                  </div>
                  <div className="w-full border border-black p-[2px] px-2 rounded-lg">
                    <h3 className=" text-black ">{sample.consultant}</h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <div className=" text-white rounded-lg gap-1  flex w-full">
                  <div className="w-[45%] bg-primary p-[2px] px-2  rounded-lg">
                    <h3 className=" ">Sample ID</h3>
                  </div>
                  <div className="w-full border border-black p-[2px] px-2 rounded-lg">
                    <h3 className=" text-black ">{sample["sample id"]}</h3>
                  </div>
                </div>

                <div className=" text-white rounded-lg gap-1  flex w-full">
                  <div className="w-[45%] bg-primary p-[2px] px-2  rounded-lg">
                    <h3 className=" ">Sample Date</h3>
                  </div>
                  <div className="w-full border border-black p-[2px] px-2 rounded-lg">
                    <h3 className=" text-black ">{sample.sample_date}</h3>
                  </div>
                </div>

                <div className=" text-white rounded-lg gap-1  flex w-full">
                  <div className="w-[45%] bg-primary p-[2px] px-2  rounded-lg">
                    <h3 className=" ">Sample Type</h3>
                  </div>
                  <div className="w-full border border-black p-[2px] px-2 rounded-lg">
                    <h3 className=" text-black ">{sample.sample_type}</h3>
                  </div>
                </div>

                <div className=" text-white rounded-lg gap-1  flex w-full">
                  <div className="w-[45%] bg-primary p-[2px] px-2  rounded-lg">
                    <h3 className=" ">Result Date</h3>
                  </div>
                  <div className="w-full border border-black p-[2px] px-2 rounded-lg">
                    <h3 className=" text-black ">{sample.result_date}</h3>
                  </div>
                </div>
              </div>
            </div>
            {sample.tests &&
              sample.tests.map((test) => (
                <div
                  key={test.tableheader}
                  className={` m-4 border-2 border-primary ${
                    test.onepage === "1" ? "test-table" : ""
                  }`}
                >
                  <table
                    className={`table-auto border-primary w-full divide-y divide-gray-200 ${
                      test.onepage === "1" ? "h-full" : ""
                    }`}
                  >
                    <thead className=" border-primary border-2  text-white">
                      <tr className={"uppercase"}>
                        <th className=" text-center text-sm bg-primary border-primary  font-normal  ">
                          Test
                        </th>
                        <th className=" text-center text-sm border-primary text-black font-normal  ">
                          {test.tableheader}
                        </th>
                      </tr>
                      <tr>
                        {test.columns.map((column, i) => (
                          <th
                            key={i}
                            className="px-6 py-1 text-left text-xs font-medium uppercase tracking-wider bg-primary"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y border-2 border-primary divide-gray-200">
                      {test.data.map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-gray-100 font-bold text-[12px]"
                        >
                          <td className="px-6 py-1 whitespace-nowrap">
                            {row.name}
                          </td>
                          <td className="px-6 py-1 whitespace-nowrap">
                            {row.result}
                          </td>
                          <td className="px-6 py-1 whitespace-nowrap">
                            {row["normal range"]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            {sample.test_name && (
              <div className="w-full flex justify-center">
                <div className=" w-[90%]   border-2 border-primary flex my-4  text-sm">
                  <div className="text-white bg-primary text-center uppercase w-[25%]">
                    Test
                  </div>
                  <div className="w-[75%] text-center uppercase">
                    {sample.test_name}
                  </div>
                </div>
              </div>
            )}
            {sample.text && (
              <div dangerouslySetInnerHTML={{ __html: sample.text }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
