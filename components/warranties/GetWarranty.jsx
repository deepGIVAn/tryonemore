"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, rem, Textarea } from "@mantine/core";
import { IconExternalLink, IconFileCv, IconPhoto } from "@tabler/icons-react";
import { WarrantyService } from "@/services/warrantyService";
import useAuth from "@/hooks/useAuth";
import { DateInput } from "@mantine/dates";
import Image from "next/image";
import ViewIcon from "@/public/svg/tables/view.svg";
import { parseISO, addDays, format } from "date-fns";
import "./GetWarranty.css";

const GetWarranty = ({ id }) => {
  console.log(id);
  const navigate = useRouter();
  const isLoggedIn = useAuth();

  const icon = (
    <IconPhoto style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  const icon2 = (
    <IconExternalLink
      style={{ width: rem(18), height: rem(18) }}
      stroke={1.5}
    />
  );

  useEffect(() => {
    const getWarranty = async () => {
      const res = await WarrantyService.getWarranty(id);
      console.log(res);
      if (res?.data) {
        setWarranty(res?.data);
      }
    };
    getWarranty();
  }, [id]);

  const [warranty, setWarranty] = useState({});

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Detailing Titans E-Warranty Details
              </h3>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-8/12">
                  <TextInput
                    w={"100%"}
                    value={warranty?.productkey?.productkey}
                    disabled
                    withAsterisk
                    label="Product Key"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
                <div className="w-full xl:w-4/12">
                  <TextInput
                    w={"100%"}
                    value={`${warranty?.productkey?.tenure} Years`}
                    disabled
                    withAsterisk
                    label="Warranty Type"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    value={`${warranty?.name}`}
                    disabled
                    label="Full Name"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    value={warranty?.email}
                    disabled
                    label="Email Address"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <TextInput
                    disabled
                    value={warranty?.mobile}
                    w={"100%"}
                    withAsterisk
                    label="Mobile Number"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <TextInput
                    disabled
                    value={warranty?.address}
                    w={"100%"}
                    withAsterisk
                    label="Address"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <TextInput
                    disabled
                    w={"100%"}
                    value={warranty?.city}
                    withAsterisk
                    label="City"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <TextInput
                    disabled
                    value={warranty?.pincode}
                    w={"100%"}
                    withAsterisk
                    label="Pincode"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <TextInput
                    disabled
                    w={"100%"}
                    value={warranty?.vehicle_year}
                    withAsterisk
                    label="Vehicle Year"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <TextInput
                    disabled
                    w={"100%"}
                    value={warranty?.vehicle_make}
                    withAsterisk
                    placeholder="Enter Vehicle Make"
                    label="Vehicle Make"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <TextInput
                    disabled
                    w={"100%"}
                    value={warranty?.vehicle_model}
                    withAsterisk
                    label="Vehicle Model"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <TextInput
                    disabled
                    w={"100%"}
                    value={warranty?.vehicle_number}
                    withAsterisk
                    label="Vehicle Number"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <TextInput
                    disabled
                    w={"100%"}
                    value={warranty?.vehicle_chassi_no}
                    withAsterisk
                    label="Vehicle Chassis No"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <DateInput
                    w={"100%"}
                    disabled
                    value={
                      warranty?.vehicle_installation_date
                        ? addDays(
                            parseISO(warranty?.vehicle_installation_date),
                            -1
                          )
                        : null
                    }
                    withAsterisk
                    clearable
                    label="Vehicle Installation Date"
                    placeholder="Enter Installation Date"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <TextInput
                    disabled
                    w={"100%"}
                    value={warranty?.installer_coverage}
                    withAsterisk
                    label="Studio Name"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <TextInput
                    disabled
                    value={warranty?.installer_by}
                    w={"100%"}
                    withAsterisk
                    label="Installer Name"
                    classNames={{
                      wrapper: "w-full",
                    }}
                  />
                </div>
                <div className="w-full xl:w-1/2"></div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2  flex flex-row gap-2 flex-wrap items-end">
                  <div>
                    <TextInput
                      leftSection={icon}
                      w={"100%"}
                      disabled
                      label="Front-Side (Upload Photo)"
                      withAsterisk
                      value={
                        warranty?.photo1?.length > 1 ? "Front-Side Photo" : ""
                      }
                      leftSectionPointerEvents="none"
                    />
                  </div>
                  {warranty?.photo1?.length > 5 && (
                    <>
                      <div className="mb-2">
                        <a href={warranty?.photo1} target="_blank">
                          <Image
                            src={ViewIcon}
                            alt="viewIcon"
                            width={18}
                            height={18}
                          />
                        </a>
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full xl:w-1/2  flex flex-row gap-2 flex-wrap items-end">
                  <div>
                    <TextInput
                      leftSection={icon}
                      w={"100%"}
                      disabled
                      label="Back-Side (Upload Photo)"
                      withAsterisk
                      value={
                        warranty?.photo2?.length > 1 ? "Back-Side Photo" : ""
                      }
                      leftSectionPointerEvents="none"
                    />
                  </div>
                  {warranty?.photo2?.length > 5 && (
                    <>
                      <div className="mb-2">
                        <a href={warranty?.photo2} target="_blank">
                          <Image
                            src={ViewIcon}
                            alt="viewIcon"
                            width={18}
                            height={18}
                          />
                        </a>
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full xl:w-1/2  flex flex-row gap-2 flex-wrap items-end">
                  <div>
                    <TextInput
                      leftSection={icon}
                      w={"100%"}
                      disabled
                      label="Left-Side (Upload Photo)"
                      withAsterisk
                      value={
                        warranty?.photo3?.length > 1 ? "Left-Side Photo" : ""
                      }
                      leftSectionPointerEvents="none"
                    />
                  </div>
                  {warranty?.photo3?.length > 5 && (
                    <>
                      <div className="mb-2">
                        <a href={warranty?.photo3} target="_blank">
                          <Image
                            src={ViewIcon}
                            alt="viewIcon"
                            width={18}
                            height={18}
                          />
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2  flex flex-row gap-2 flex-wrap items-end">
                  <div>
                    <TextInput
                      leftSection={icon}
                      w={"100%"}
                      disabled
                      label="Right-Side (Upload Photo)"
                      withAsterisk
                      leftSectionPointerEvents="none"
                      value={
                        warranty?.photo4?.length > 1 ? "Right-Side Photo" : ""
                      }
                    />
                  </div>
                  {warranty?.photo4?.length > 1 && (
                    <>
                      <div className="mb-2">
                        <a href={warranty?.photo4} target="_blank">
                          <Image
                            src={ViewIcon}
                            alt="viewIcon"
                            width={18}
                            height={18}
                          />
                        </a>
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full xl:w-1/2  flex flex-row gap-2 flex-wrap items-end">
                  <div>
                    <TextInput
                      leftSection={icon}
                      w={"100%"}
                      disabled
                      label="Any Specific (Upload Photo)"
                      leftSectionPointerEvents="none"
                      withAsterisk
                      value={
                        warranty?.photo5?.length > 1 ? "Any Specific Photo" : ""
                      }
                    />
                  </div>
                  {warranty?.photo5?.length > 1 && (
                    <>
                      <div className="mb-2">
                        <a href={warranty?.photo5} target="_blank">
                          <Image
                            src={ViewIcon}
                            alt="viewIcon"
                            width={18}
                            height={18}
                          />
                        </a>
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full xl:w-1/2  flex flex-row gap-2 flex-wrap items-end">
                  <div>
                    <TextInput
                      leftSection={icon2}
                      leftSectionPointerEvents="none"
                      w={"100%"}
                      disabled
                      label="Video Link"
                      withAsterisk
                      value={warranty?.videolink || ""}
                    />
                  </div>
                  {warranty?.videolink?.length > 5 && (
                    <>
                      <div className="mb-2">
                        <a href={warranty?.videolink} target="_blank">
                          <Image
                            src={ViewIcon}
                            alt="viewIcon"
                            width={18}
                            height={18}
                          />
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <Textarea
                  w={"100%"}
                  disabled
                  label="Comments"
                  autosize
                  classNames={{
                    wrapper: "w-full",
                  }}
                  minRows={3}
                  value={warranty?.comment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GetWarranty;
