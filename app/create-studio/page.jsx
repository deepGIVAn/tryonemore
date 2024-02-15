// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CreateStudio from "@/components/studios/CreateStudio";
export const metadata = {
  title: "Admin Panel : Create Studio",
  description: "Detailing Titans Panel",
};

const Page = () => {
  return (
    <>
      {/* <Breadcrumb pageName="Add Studio" /> */}

      <div className="my-5 w-full px-2 sm:px-10">
        <CreateStudio />
      </div>
    </>
  );
};

export default Page;
