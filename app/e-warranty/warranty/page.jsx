"use client";
import WarrantyDetails from "@/components/warranties/WarrantyDetails";
import { useSearchParams } from "next/navigation";

// export const metadata = {
//   title: "Admin Panel",
//   description: "This is a Panel",
// };

export default function WarrantyDetailsPage() {
  const params = useSearchParams();
  const warrantyId = params.get("Id");

  // console.log(params);

  return (
    <>
      <WarrantyDetails id={warrantyId} />
    </>
  );
}
