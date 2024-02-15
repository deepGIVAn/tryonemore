import CheckWarranty from "@/components/warranties/CheckWarranty";

export const metadata = {
  title: "Admin Panel",
  description: "This is a Panel",
};

export default function Home() {
  return (
    <>
      <CheckWarranty />
    </>
  );
}
