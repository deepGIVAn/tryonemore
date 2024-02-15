"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import useAuth from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import firebase from "firebase/compat/app";
import firebaseConfig from "@/config/firebaseConfig";

firebase.initializeApp(firebaseConfig);

export default function RootLayout({ children }) {
  const navigate = useRouter();
  const isLoggedIn = useAuth();
  console.log(isLoggedIn);
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    if (!isLoggedIn) {
      (pathname.includes("dashboard") || pathname.includes("e-warranty")) &&
        navigate.replace("/");
    }
    if (isLoggedIn) {
      ((pathname.includes("create-studio") &&
        !pathname.includes("dashboard")) ||
        pathname.includes("auth") ||
        pathname === "/") &&
        navigate.replace("/dashboard");
    }
  }, [isLoggedIn, navigate, pathname, setLoading]);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <MantineProvider>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? (
              <Loader />
            ) : (
              <div className="min-h-screen overflow-hidden">
                <main>
                  <div className="min-h-screen mx-auto max-w-screen-2xl flex justify-center items-center">
                    {children}
                    <ToastContainer
                      position="top-center"
                      autoClose={4000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover={false}
                      theme="light"
                    />
                  </div>
                </main>
              </div>
            )}
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
