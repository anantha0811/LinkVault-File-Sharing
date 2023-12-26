"use client";
import { UserButton } from "@clerk/nextjs";
import { AlignLeft, XCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import SideNav from "./SideNav";

const TopHeader = () => {
  const [SideNavOpen, setSideNavOpen] = useState(false);
  const toggleSideNav = () => {
    setSideNavOpen(!SideNavOpen);
  };
  return (
    <div className="flex p-5 border-b items-center justify-between md:justify-end">
      {SideNavOpen && (
        <>
          <SideNav />
          <XCircle
            className="fixed top-0 left-0 z-50 pt-1"
            onClick={toggleSideNav}
          />
        </>
      )}
      {!SideNavOpen && (
        <AlignLeft className="md:hidden" onClick={toggleSideNav} />
      )}
      <Image
        src="/logo.svg"
        alt="Logo"
        width={150}
        height={100}
        className="md:hidden"
      />
      <UserButton />
    </div>
  );
};

export default TopHeader;
