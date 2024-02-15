"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { useEffect, useState } from "react";
import { WarrantyService } from "@/services/warrantyService";
import { addDays, addYears, format, parseISO, isAfter } from "date-fns";
import Link from "next/link";

const WarrantyDetails = ({ id }) => {
  const [warranty, setWarranty] = useState({
    productkey: "",
    studioName: "",
    vehNumber: "",
    vehChassisNo: "",
    startDate: null,
    endDate: null,
    status: "",
  });

  useEffect(() => {
    const getWarranty = async () => {
      const res = await WarrantyService.getWarranty(id);
      console.log(res);
      if (res?.data) {
        setWarranty(() => ({
          productkey: res?.data?.productkey?.productkey,
          studioName: res?.data?.installer_coverage,
          vehNumber: res?.data?.vehicle_number,
          vehChassisNo: res?.data?.vehicle_chassi_no,
          startDate: res?.data?.createdAt
            ? format(parseISO(res?.data?.createdAt), "dd-MM-yyyy")
            : null,
          endDate: res?.data.productkey?.tenure
            ? format(
                addYears(
                  addDays(parseISO(res?.data?.createdAt), -1),
                  res?.data.productkey?.tenure
                  // -1
                ),
                "dd-MM-yyyy"
              )
            : null,
          status: isAfter(
            new Date(),
            addYears(
              addDays(parseISO(res?.data?.createdAt), -1),
              res?.data.productkey?.tenure
              // -1
            )
          )
            ? "InActive"
            : "Active",
        }));
      }
    };
    getWarranty();
  }, [id]);

  return (
    <>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={"/images/cover/cover-01.png"}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            width={970}
            height={260}
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-2 xl:pb-5.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <Image
                src={"/images/user/user-06.png"}
                width={160}
                height={160}
                alt="profile"
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              Warranty Details
            </h3>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Product Key
                  </th>
                  <th className="min-w-[250px] py-4 px-4 font-medium text-black dark:text-white">
                    Studio Name
                  </th>
                  <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                    Vehicle Number
                  </th>
                  <th className="min-w-[290px] py-4 px-4 font-medium text-black dark:text-white">
                    Vehicle Chassis No
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Start Date
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    End Date
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-start">
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {warranty?.productkey}
                    </h5>
                    {/* <p className="text-sm">${packageItem.price}</p> */}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {warranty?.studioName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {warranty?.vehNumber}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {warranty?.vehChassisNo}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {warranty?.startDate}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {warranty?.endDate}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        warranty?.status === "Active"
                          ? "text-success bg-success"
                          : warranty?.status === "InActive"
                          ? "text-danger bg-danger"
                          : "text-warning bg-warning"
                      }`}
                    >
                      {warranty?.status}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-2 xl:pb-5.5">
          <Link href="/dashboard" className="text-sm text-primary">
            Back to Admin
          </Link>
        </div>
      </div>
    </>
  );
};

export default WarrantyDetails;
