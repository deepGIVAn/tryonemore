import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CreateStudio from "@/components/studios/CreateStudio";

export const metadata = {
  title: "Admin Panel : Create Studio",
  description: "Detailing Titans Panel",
};

const FormLayout = () => {
  return (
    <>
      <Breadcrumb pageName="Add Studio" />
      <CreateStudio />
    </>
  );
};

export default FormLayout;
