"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GetWarranty from "@/components/warranties/GetWarranty";
import { useSearchParams } from "next/navigation";

// export const metadata = {
//   title: "Admin Panel : Viewing Warranty",
//   description: "Detailing Titans Panel",
// };

const Page = () => {
  const params = useSearchParams();
  const warrantyId = params.get("Id");

  return (
    <>
      <Breadcrumb pageName="E-Warranty Details" />
      <GetWarranty id={warrantyId} />
    </>
  );
};

export default Page;
