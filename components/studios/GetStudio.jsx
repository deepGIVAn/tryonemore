"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, rem, Textarea } from "@mantine/core";
import { IconFileCv, IconPhoto } from "@tabler/icons-react";
import { StudioService } from "@/services/studioService";
import { toast } from "react-toastify";
import useAuth, { useAdmin } from "@/hooks/useAuth";
import DownloadIcon from "@/public/svg/tables/download.svg";
import ViewIcon from "@/public/svg/tables/view.svg";
import Image from "next/image";
import "./GetStudio.css";

const GetStudio = ({ id }) => {
  const navigate = useRouter();
  const isLoggedIn = useAuth();
  const isAdmin = useAdmin();

  const icon = (
    <IconPhoto style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  useEffect(() => {
    const getStudio = async () => {
      const res = await StudioService.getStudio(id);
      console.log(res);
      if (res?.data) {
        setStudio(res?.data);
      }
    };
    getStudio();
  }, [id]);

  const [studio, setStudio] = useState({});
  console.log(studio);

  const handleDownload = (link, name) => {
    const linking = document.createElement("a");
    linking.href = link;
    linking.download = name;
    linking.click();
  };

  return (
    <>
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
                  Detailing Titans Studio Owner Details
                </h3>
              </div>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <TextInput
                      disabled
                      w={"100%"}
                      value={studio?.user?.name}
                      withAsterisk
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
                      disabled
                      value={studio?.user?.email}
                      label="Email Address"
                      classNames={{
                        wrapper: "w-full",
                      }}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <TextInput
                      w={"100%"}
                      withAsterisk
                      disabled
                      value={studio?.user?.mobile}
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
                      w={"100%"}
                      withAsterisk
                      disabled
                      value={studio?.address}
                      label="Address"
                      classNames={{
                        wrapper: "w-full",
                      }}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <TextInput
                      w={"100%"}
                      withAsterisk
                      disabled
                      value={studio?.city}
                      label="City"
                      classNames={{
                        wrapper: "w-full",
                      }}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <TextInput
                      w={"100%"}
                      withAsterisk
                      disabled
                      value={studio?.pincode}
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
                      w={"100%"}
                      disabled
                      // withAsterisk
                      value={studio?.company_name}
                      label="Register Company Name"
                      classNames={{
                        wrapper: "w-full",
                      }}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <TextInput
                      w={"100%"}
                      disabled
                      // withAsterisk
                      value={studio?.gst_number}
                      label="GST Number"
                      classNames={{
                        wrapper: "w-full",
                      }}
                    />
                  </div>
                  <div className="w-full xl:w-1/2 flex flex-row gap-2 flex-wrap items-end">
                    <div>
                      <TextInput
                        w={"100%"}
                        disabled
                        leftSection={icon}
                        label="GST Number (Upload Doc)"
                        // withAsterisk
                        value={studio?.gst_doc?.length > 1 ? "GST Doc" : ""}
                        leftSectionPointerEvents="none"
                      />
                    </div>
                    {studio?.gst_doc?.length > 1 && (
                      <>
                        <div className="mb-2">
                          <a href={studio?.gst_doc} target="_blank">
                            <Image
                              src={ViewIcon}
                              alt="viewIcon"
                              width={18}
                              height={18}
                            />
                          </a>
                        </div>
                      </>
                    )}{" "}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <TextInput
                      w={"100%"}
                      disabled
                      // withAsterisk
                      value={studio?.pan_number}
                      label="Pan Card"
                      classNames={{
                        wrapper: "w-full",
                      }}
                    />
                  </div>
                  <div className="w-full xl:w-1/2  flex flex-row gap-2 flex-wrap items-end">
                    <div>
                      <TextInput
                        w={"100%"}
                        disabled
                        leftSection={icon}
                        label="Pan Card (Upload Photo)"
                        // withAsterisk
                        value={studio?.pan_doc?.length > 1 ? "Pan Doc" : ""}
                        leftSectionPointerEvents="none"
                      />
                    </div>
                    {studio?.pan_doc?.length > 1 && (
                      <>
                        <div className="mb-2">
                          <a href={studio?.pan_doc} target="_blank">
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
                  <div className="w-full xl:w-1/2 flex flex-row gap-2 flex-wrap items-end">
                    <div>
                      <TextInput
                        w={"100%"}
                        disabled
                        leftSection={icon}
                        label="Studio (Upload Photo)"
                        value={
                          studio?.studio_doc?.length > 1 ? "Studio Doc" : ""
                        }
                        withAsterisk
                        // placeholder="Upload Photo"
                        leftSectionPointerEvents="none"
                      />
                    </div>
                    {studio?.studio_doc?.length > 1 && (
                      <>
                        <div className="mb-2">
                          <a href={studio?.studio_doc} target="_blank">
                            <Image
                              src={ViewIcon}
                              alt="viewIcon"
                              width={18}
                              height={18}
                            />
                          </a>
                        </div>
                      </>
                    )}{" "}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <TextInput
                      w={"100%"}
                      disabled
                      withAsterisk
                      // placeholder="Enter Aadhar Number"
                      value={studio?.aadhar_number}
                      label="Aadhar Card"
                      classNames={{
                        wrapper: "w-full",
                      }}
                    />
                  </div>
                  <div className="w-full xl:w-1/2  flex flex-row gap-2 flex-wrap items-end">
                    <div>
                      <TextInput
                        w={"100%"}
                        leftSection={icon}
                        disabled
                        label="Aadhar Card (Upload Photo)"
                        withAsterisk
                        // placeholder="Upload Photo"
                        value={
                          studio?.aadhar_doc?.length > 1 ? "Aadhar Doc" : ""
                        }
                        leftSectionPointerEvents="none"
                      />
                    </div>
                    {studio?.aadhar_doc?.length > 1 && (
                      <>
                        <div className="mb-2">
                          <a href={studio?.aadhar_doc} target="_blank">
                            <Image
                              src={ViewIcon}
                              alt="viewIcon"
                              width={18}
                              height={18}
                            />
                          </a>
                        </div>
                      </>
                    )}{" "}
                  </div>
                  <div className="w-full xl:w-1/2  flex flex-row gap-2 flex-wrap items-end">
                    <div>
                      <TextInput
                        w={"100%"}
                        leftSection={icon}
                        disabled
                        label="User (Upload Photo)"
                        withAsterisk
                        // placeholder="Upload Photo"
                        value={studio?.user_doc?.length > 1 ? "User Doc" : ""}
                        leftSectionPointerEvents="none"
                      />
                    </div>
                    {studio?.user_doc?.length > 1 && (
                      <>
                        <div className="mb-2">
                          <a href={studio?.user_doc} target="_blank">
                            <Image
                              src={ViewIcon}
                              alt="viewIcon"
                              width={18}
                              height={18}
                            />
                          </a>
                        </div>
                      </>
                    )}{" "}
                  </div>
                </div>
                <div className="mb-6">
                  <Textarea
                    w={"100%"}
                    disabled
                    // placeholder="Type your comments"
                    value={studio?.comment}
                    label="Comments"
                    autosize
                    classNames={{
                      wrapper: "w-full",
                    }}
                    minRows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default GetStudio;
