"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GetStudio from "@/components/studios/GetStudio";
import { useSearchParams } from "next/navigation";

// export const metadata = {
//   title: "Admin Panel : Viewing Studio",
//   description: "Detailing Titans Panel",
// };

const Page = () => {
  const params = useSearchParams();
  const studioId = params.get("Id");
  return (
    <>
      <Breadcrumb pageName="Studio Details" />
      <GetStudio id={studioId} />
    </>
  );
};

export default Page;
