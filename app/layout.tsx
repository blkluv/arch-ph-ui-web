"use client"

import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import SideNav from "@/app/ui/dashboard/sidenav";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Set clinic-id in sessionStorage when the component mounts
    const clinicId = "3f2504e0-4f89-11d3-9a0c-0305e82c3301"; // This can be dynamically set from an API or other source
    sessionStorage.setItem("clinic-id", clinicId);
  }, []); // Runs only once when the component is mounted

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
