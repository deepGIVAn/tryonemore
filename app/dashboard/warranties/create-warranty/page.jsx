import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CreateStudio from "@/components/studios/CreateStudio";
import CreateWarranty from "@/components/warranties/CreateWarranty";

export const metadata = {
  title: "Admin Panel : Create Warranty",
  description: "Detailing Titans Panel",
};

const FormLayout = () => {
  return (
    <>
      <Breadcrumb pageName="E-Warranty" />
      <CreateWarranty />
    </>
  );
};

export default FormLayout;
