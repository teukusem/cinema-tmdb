import { NavigationBar } from "@/components";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavigationBar />
      <div className="flex justify-center h-full max-h-screen">
        <div className="max-w-[1024px] w-screen">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

export default Layout;
