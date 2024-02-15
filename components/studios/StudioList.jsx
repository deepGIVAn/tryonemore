"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { StudioService } from "@/services/studioService";
import { toast } from "react-toastify";
import Actions from "./Actions";
import { useAdmin } from "@/hooks/useAuth";
import TokenHelper from "@/helpers/Token.helper";

const columns = [
  { field: "id", headerName: "S.No.", width: 80 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 150,
  },
  { field: "city", headerName: "City", width: 250 },
  { field: "pincode", headerName: "Pin Code", width: 150 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => <>{params.row.action}</>,
  },
];

// const rows = [
//   {
//     id: 1,
//     name: "Lannister",
//     email: "email@1234.com",
//     mobile: "9319979805",
//     city: "New Delhi",
//     pincode: "110066",
//     action: <Actions />,
//   },
// ];

const StudioList = () => {
  const [rows, setRows] = React.useState([]);
  const [deleteclick, setDeleteclick] = React.useState(null);
  const [approveclick, setApproveclick] = React.useState(null);
  const isAdmin = useAdmin();
  const userId = TokenHelper.getUser();

  React.useEffect(() => {
    if (deleteclick) {
      StudioService.deleteStudio(deleteclick).then(() => {
        toast.success("Studio Deleted!!");
        setDeleteclick(null);
      });
    }

    if (approveclick) {
      StudioService.approveStudio(approveclick).then(() => {
        toast.success("Studio Approved");
        setApproveclick(null);
      });
    }

    const getAdminStudios = async () => {
      const res = await StudioService.getallStudios();
      // console.log(res?.data);
      const result = res?.data.map((studio, index) => {
        return {
          id: index + 1,
          name: studio?.user?.name,
          email: studio?.user?.email,
          mobile: studio?.user?.mobile,
          city: studio?.city,
          pincode: studio?.pincode,
          action: (
            <Actions
              id={studio?._id}
              status={studio?.user?.status}
              setDeleteclick={setDeleteclick}
              setApproveclick={setApproveclick}
            />
          ),
        };
      });
      setRows(result || []);
    };

    const getUserStudios = async () => {
      const res = await StudioService.getUserStudio(userId);
      const result = res?.data.map((studio, index) => {
        return {
          id: index + 1,
          name: studio?.user?.name,
          email: studio?.user?.email,
          mobile: studio?.user?.mobile,
          city: studio?.city,
          pincode: studio?.pincode,
          action: (
            <Actions
              id={studio?._id}
              status={studio?.user?.status}
              setDeleteclick={setDeleteclick}
              setApproveclick={setApproveclick}
            />
          ),
        };
      });
      setRows(result || []);
    };
    isAdmin && getAdminStudios();
    !isAdmin && getUserStudios();
  }, [deleteclick, approveclick, isAdmin, userId]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark  sm:px-7.5 xl:pb-5">
      <div
        // style={{ height: 400, width: "100%" }}
        className="max-w-full overflow-x-auto"
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          //   checkboxSelection
          disableColumnMenu={true}
        />
      </div>
    </div>
  );
};

export default StudioList;
