"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import ViewIcon from "@/public/svg/tables/view.svg";
import DeleteIcon from "@/public/svg/tables/delete.svg";
import Image from "next/image";
import { StudioService } from "@/services/studioService";
import ApproveIcon from "@/public/svg/tables/approve.svg";
import DenyIcon from "@/public/svg/tables/deny.svg";
import { toast } from "react-toastify";
import { useAdmin } from "@/hooks/useAuth";
import Link from "next/link";

const Actions = ({ id, status, setDeleteclick, setApproveclick }) => {
  const isAdmin = useAdmin();
  console.log(status);
  return (
    <>
      <div className="flex flex-row items-center justify-evenly w-full">
        {!status && isAdmin && (
          <>
            <button className="hover:text-success">
              <Image
                src={ApproveIcon}
                alt="icon"
                width={18}
                height={18}
                onClick={async () => {
                  setApproveclick(id);
                }}
              />
            </button>
            <button
              className="hover:text-danger"
              onClick={async () => {
                setDeleteclick(id);
              }}
            >
              <Image src={DenyIcon} alt="icon" width={16} height={16} />
            </button>
          </>
        )}{" "}
        <Link
          href={`/dashboard/warranties/warranty?Id=${id}`}
          className="hover:text-primary"
        >
          <Image src={ViewIcon} alt="icon" width={18} height={18} />
        </Link>
        {isAdmin && (
          <button
            className="hover:text-danger"
            onClick={async () => {
              setDeleteclick(id);
            }}
          >
            <Image src={DeleteIcon} alt="icon" width={18} height={18} />
          </button>
        )}{" "}
      </div>
    </>
  );
};

export default Actions;
