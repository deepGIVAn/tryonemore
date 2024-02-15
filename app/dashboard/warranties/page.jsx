import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WarrantyList from "@/components/warranties/WarrantyList";

export const metadata = {
  title: "Admin Panel : All Warranties",
  description: "Detailing Titans Panel",
  // other metadata
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Warranty List" />

      <div className="flex flex-col gap-10">
        <WarrantyList />
      </div>
    </>
  );
};

export default TablesPage;
