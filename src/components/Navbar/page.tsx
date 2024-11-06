"use client";

import React from "react";
import { RiHomeFill, RiAppsFill, RiAppsLine, RiHomeLine } from "react-icons/ri";
import { HiOutlineTemplate, HiTemplate } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navlink = [
    {
      path: "/",
      iconFill: <RiHomeFill className="w-6 h-6" />,
      iconOutline: <RiHomeLine className="w-6 h-6" />,
      text: "Home",
    },
    {
      path: "/templates",
      iconFill: <HiTemplate className="w-6 h-6" />,
      iconOutline: <HiOutlineTemplate className="w-6 h-6" />,
      text: "Temp's",
    },
    {
      path: "/my-apps",
      iconFill: <RiAppsFill className="w-6 h-6" />,
      iconOutline: <RiAppsLine className="w-6 h-6" />,
      text: "Apps",
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[min(90%,450px)] bg-[rgba(255,255,255,0.1)] shadow-lg p-1 z-30 flex items-center justify-around gap-3 rounded-xl backdrop-blur-md">
      <div className="w-full rounded-lg bg-[rgb(72,72,72)] grid grid-cols-3 p-[0.3rem]">
        {navlink.map((link) => {
          // Adjust active condition for Home link
          const isActive =
            pathname === link.path || (link.path === "/" && pathname === "/");
          return (
            <Link
              href={link.path}
              className={`flex items-center justify-center gap-[0.3rem] ${
                isActive
                  ? "bg-[rgb(254,226,178)] text-graydark"
                  : "text-[rgb(254,226,178)]"
              }  h-full rounded-md w-full pt-[0.45rem] pb-[0.45rem]`}
              key={link.path}
            >
              {isActive ? (
                <>
                  {link.iconFill}
                  <span className="font-medium flex justify-center items-center">
                    {link.text}
                  </span>
                </>
              ) : (
                <>{link.iconOutline}</>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
