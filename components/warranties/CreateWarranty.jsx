"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UseFormReturnType, isEmail, matches, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { validateString } from "@/helpers/common";
import {
  TextInput,
  PasswordInput,
  FileInput,
  rem,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { IconFileCv, IconPhoto } from "@tabler/icons-react";
import {
  uploadFile,
  deleteFile,
  uploadAllFiles,
  deleteAllFiles,
} from "@/helpers/files";
import { UserService } from "@/services/userService";
import { StudioService } from "@/services/studioService";
import { WarrantyService } from "@/services/warrantyService";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { DateInput } from "@mantine/dates";
import { KeyService } from "@/services/productkeyService";
import TokenHelper from "@/helpers/Token.helper";
import "./CreateWarranty.css";

const CreateWarranty = () => {
  const navigate = useRouter();
  const isLoggedIn = useAuth();
  const icon = (
    <IconPhoto style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  const [tenure, setTenure] = useState("Warranty Type");
  const [productkeyId, setProductkeyId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validatekey = (value) => {
    if (value?.length < 1) {
      return value?.length < 1 || value === null
        ? "Please Enter Product Key"
        : null;
    }
    const getKeyDetails = async () => {
      const res = await KeyService.getKey(value);
      if (res?.data[0].status) return "ProductKey is already in use";
      return res?.status === 200 ? null : "Invalid Product Key";
    };
    return getKeyDetails();
  };

  const form = useForm({
    initialValues: {
      // productkeyId: "",
      name: "",
      email: "",
      mobile: null,
      address: "",
      city: "",
      pincode: null,
      vehicle_year: null,
      vehicle_make: "",
      vehicle_model: "",
      vehicle_number: "",
      vehicle_chassi_no: "",
      vehicle_installation_date: null,
      installer_coverage: "",
      installer_by: "",
      photo1: null,
      photo2: null,
      photo3: null,
      photo4: null,
      photo5: null,
      videolink: "",
      comment: "",
    },
    validate: {
      // productkeyId: async (value) => await validatekey(value),
      name: (value) => validateString(value),
      email: isEmail("Invalid email"),
      // mobile: (value) => matches(/^\d{10}$/, "Invalid mobile number"),
      mobile: (value) =>
        /^\d{10}$/.test(value) ? null : "Invalid mobile number",
      address: (value) => validateString(value),
      city: (value) => validateString(value),
      // pincode: matches(/^[0-9]{6}$/, "Invalid pincode"),
      pincode: (value) => (/^[0-9]{6}$/.test(value) ? null : "Invalid pincode"),
      // vehicle_year: matches(/^[0-9]{4}$/, "Invalid Year"),
      vehicle_year: (value) =>
        /^[0-9]{4}$/.test(value) ? null : "Invalid Year",
      vehicle_make: (value) => validateString(value),
      vehicle_model: (value) => validateString(value),
      vehicle_number: (value) => validateString(value),
      vehicle_chassi_no: (value) => validateString(value),
      installer_coverage: (value) => validateString(value),
      vehicle_installation_date: (value) =>
        value ? null : "Please Enter Date",
      // installer_by: (value) => validateString(value),
      photo1: (value) => (value ? null : "Please Upload Photo"),
      photo2: (value) => (value ? null : "Please Upload Photo"),
      photo3: (value) => (value ? null : "Please Upload Photo"),
      photo4: (value) => (value ? null : "Please Upload Photo"),
      // photo5: (value) => (value ? null : "Please Upload Photo"),
      // videolink: matches(/^https:\/\/.*/, "Invalid URL"),
    },
  });

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();
    console.log(form.values);
    if (!hasErrors) {
      setSubmitting(true);
      console.log(form.values);
      const key = await validatekey(productkeyId);
      if (key) {
        toast.error(key);
        setSubmitting(false);
        return;
      }
      const keyValue = await KeyService.getKey(productkeyId);
      if (keyValue?.data) {
        setTenure(`${keyValue?.data[0].tenure} Years`);
        const toastPromise = () =>
          new Promise(async (resolve, reject) => {
            let result = {},
              uploadings = [],
              fileslist = [],
              photo1name = `photo1_${Math.floor(
                1000000 + Math.random() * 9000000
              )}`,
              photo2name = `photo2_${Math.floor(
                1000000 + Math.random() * 9000000
              )}`,
              photo3name = `photo3_${Math.floor(
                1000000 + Math.random() * 9000000
              )}`,
              photo4name = `photo4_${Math.floor(
                1000000 + Math.random() * 9000000
              )}`,
              photo5name = `photo5_${Math.floor(
                1000000 + Math.random() * 9000000
              )}`;

            form.values.photo1 &&
              uploadings.push(uploadFile(form.values.photo1, photo1name)) &&
              fileslist.push("photo1");
            form.values.photo2 &&
              uploadings.push(uploadFile(form.values.photo2, photo2name)) &&
              fileslist.push("photo2");
            form.values.photo3 &&
              uploadings.push(uploadFile(form.values.photo3, photo3name)) &&
              fileslist.push("photo3");
            form.values.photo4 &&
              uploadings.push(uploadFile(form.values.photo4, photo4name)) &&
              fileslist.push("photo4");
            form.values.photo5 &&
              uploadings.push(uploadFile(form.values.photo5, photo5name)) &&
              fileslist.push("photo5");

            const values = await uploadAllFiles(uploadings);
            for (let i = 0; i < fileslist.length; i++) {
              result[fileslist[i]] = values[i].value;
            }
            // form.values.photo1
            //   ? (photo1 = await uploadFile(form.values.photo1, photo1name))
            //   : null;
            // form.values.photo2
            //   ? (photo2 = await uploadFile(form.values.photo2, photo2name))
            //   : null;
            // form.values.photo3
            //   ? (photo3 = await uploadFile(form.values.photo3, photo3name))
            //   : null;
            // form.values.photo4
            //   ? (photo4 = await uploadFile(form.values.photo4, photo4name))
            //   : null;
            // form.values.photo5
            //   ? (photo5 = await uploadFile(form.values.photo5, photo5name))
            //   : null;

            const res = await WarrantyService.createWarranty({
              ...form.values,
              userId: TokenHelper.getUser(),
              ...result,
              photo1name: fileslist.includes("photo1") ? photo1name : "",
              photo2name: fileslist.includes("photo2") ? photo2name : "",
              photo3name: fileslist.includes("photo3") ? photo3name : "",
              photo4name: fileslist.includes("photo4") ? photo4name : "",
              photo5name: fileslist.includes("photo5") ? photo5name : "",
              productkeyId,
            });
            if (res?.status == 201) {
              navigate.replace("/dashboard");
              setSubmitting(false);
              resolve("Warranty Created Successfully");
            } else {
              let deleting = [];
              fileslist.includes("photo1") &&
                deleting.push(deleteFile(photo1name));
              fileslist.includes("photo2") &&
                deleting.push(deleteFile(photo2name));
              fileslist.includes("photo3") &&
                deleting.push(deleteFile(photo3name));
              fileslist.includes("photo4") &&
                deleting.push(deleteFile(photo4name));
              fileslist.includes("photo5") &&
                deleting.push(deleteFile(photo5name));
              const check = await deleteAllFiles(deleting);
              // console.log(check);
            }
            setSubmitting(false);
            reject("Errro while Warranty Creation..");
          });

        toast.promise(toastPromise, {
          pending: {
            render() {
              return "Creating Warranty..";
            },
          },
          success: {
            render({ data }) {
              return `${data}`;
            },
          },
          error: {
            render({ data }) {
              return `${data}`;
            },
          },
        });
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Detailing Titans E-Warranty Generate
              </h3>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-8/12">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter Product Key"
                    label="Product Key"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    value={productkeyId}
                    onChange={(e) => setProductkeyId(e.target.value)}
                    // {...form.getInputProps("productkeyId", { type: "input" })}
                  />
                </div>
                <div className="w-full xl:w-4/12">
                  <TextInput
                    w={"100%"}
                    disabled
                    withAsterisk
                    placeholder="Warranty Type"
                    label="Warranty Type"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    value={tenure}
                    // onChange={setValue}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter Full Name"
                    label="Full Name"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("name", { type: "input" })}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter Email Address"
                    label="Email Address"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("email", { type: "input" })}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <NumberInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter Mobile Number"
                    hideControls
                    label="Mobile Number"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("mobile")}
                    clampBehavior="strict"
                    min={0}
                    max={9999999999}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter Address"
                    label="Address"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("address", { type: "input" })}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter City"
                    label="City"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("city", { type: "input" })}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <NumberInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter Pincode"
                    hideControls
                    clampBehavior="strict"
                    min={0}
                    max={999999}
                    label="Pincode"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("pincode")}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3">
                  <NumberInput
                    w={"100%"}
                    withAsterisk
                    hideControls
                    clampBehavior="strict"
                    min={0}
                    max={3000}
                    placeholder="Enter Vehicle Year"
                    label="Vehicle Year"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("vehicle_year")}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter Vehicle Make"
                    label="Vehicle Make"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("vehicle_make", { type: "input" })}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter Vehicle Model"
                    label="Vehicle Model"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("vehicle_model", { type: "input" })}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter Vehicle Number"
                    label="Vehicle Number"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("vehicle_number", { type: "input" })}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter Vehicle Chassis No"
                    label="Vehicle Chassis No"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("vehicle_chassi_no", {
                      type: "input",
                    })}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <DateInput
                    w={"100%"}
                    withAsterisk
                    clearable
                    label="Vehicle Installation Date"
                    placeholder="Enter Installation Date"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("vehicle_installation_date")}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Enter Studio Name"
                    label="Studio Name"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("installer_coverage", {
                      type: "input",
                    })}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <TextInput
                    w={"100%"}
                    // withAsterisk
                    placeholder="Installed By"
                    label="Installer Name"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("installer_by", {
                      type: "input",
                    })}
                  />
                </div>
                <div className="w-full xl:w-1/3"></div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3">
                  <FileInput
                    leftSection={icon}
                    label="Front-Side (Upload Photo)"
                    withAsterisk
                    clearable
                    placeholder="Upload Photo"
                    leftSectionPointerEvents="none"
                    {...form.getInputProps("photo1")}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <FileInput
                    leftSection={icon}
                    label="Back-Side (Upload Photo)"
                    withAsterisk
                    clearable
                    placeholder="Upload Photo"
                    leftSectionPointerEvents="none"
                    {...form.getInputProps("photo2")}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <FileInput
                    leftSection={icon}
                    label="Left-Side (Upload Photo)"
                    withAsterisk
                    clearable
                    placeholder="Upload Photo"
                    leftSectionPointerEvents="none"
                    {...form.getInputProps("photo3")}
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3">
                  <FileInput
                    leftSection={icon}
                    label="Right-Side (Upload Photo)"
                    withAsterisk
                    clearable
                    placeholder="Upload Photo"
                    leftSectionPointerEvents="none"
                    {...form.getInputProps("photo4")}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <FileInput
                    leftSection={icon}
                    label="Any Specific (Upload Photo)"
                    // withAsterisk
                    clearable
                    placeholder="Upload Photo"
                    leftSectionPointerEvents="none"
                    {...form.getInputProps("photo5")}
                  />
                </div>
                <div className="w-full xl:w-1/3">
                  <TextInput
                    w={"100%"}
                    // withAsterisk
                    placeholder="https://www....."
                    label="Video Link"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("videolink", {
                      type: "input",
                    })}
                  />
                </div>
              </div>
              <div className="mb-6">
                <Textarea
                  w={"100%"}
                  placeholder="Type your comments"
                  label="Comments"
                  autosize
                  classNames={{
                    wrapper: "w-full",
                  }}
                  minRows={3}
                  {...form.getInputProps("comment")}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                Add Warranty
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateWarranty;
