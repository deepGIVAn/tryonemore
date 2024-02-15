import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import StuioList from "@/components/studios/StudioList";

export const metadata = {
  title: "Admin Panel : All Studios",
  description: "Detailing Titans Panel",
  // other metadata
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Studio List" />

      <div className="flex flex-col gap-10">
        <StuioList />
      </div>
    </>
  );
};

export default TablesPage;
