"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
// import MechmannLogo from "./MechmannLogo";
import { ChevronDownIcon } from "@heroicons/react/outline";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
export default function Header() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  return (
    <>
      {isClient && (
        <div className="p-6 absolute top-0 w-full z-50 bg-transparent hidden sm:inline">
          <Navbar className="flex items-center relative sm:inline">
            <NavbarBrand className="justify-start ml-4">
              <div className="relative h-10 w-10">
                <Image fill className src={"/logo.svg"} />
              </div>
            </NavbarBrand>
            <NavbarContent className="flex items-center justify-center pr-4 lg:pr-20 sm:flex-grow gap-4 lg:gap-20 ">
              <NavbarItem className="">
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "active-link font-bold" : ""
                  } `}
                >
                  Home
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  href="/aboutus"
                  className={`${
                    pathname === "/aboutus" ? "active-link font-bold" : ""
                  } `}
                >
                  About Us
                </Link>
              </NavbarItem>

              <NavbarItem className="flex items-center">
                <Dropdown>
                  <DropdownTrigger>
                    <div className="flex items-center focus-visible:border-none">
                      <Link
                        href="/products"
                        className={`${
                          pathname === "/products"
                            ? "active-link font-bold"
                            : ""
                        } flex gap-1 mr-1 text-foreground`}
                      >
                        <button>Products</button>
                        <ChevronDownIcon className="h-5 w-5 flex text-gray-700 font-thin" />
                      </Link>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu className="flex flex-col">
                    <DropdownItem>Product 1</DropdownItem>
                    <DropdownItem>Product 2</DropdownItem>
                    <DropdownItem>Product 3</DropdownItem>
                    <DropdownItem className="">Product 4</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
              <NavbarItem className="">
                <Link
                  color="foreground"
                  href="/career"
                  className={`${
                    pathname === "/career" ? "active-link font-bold" : ""
                  } `}
                >
                  Career
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  color="foreground"
                  href="/contactus"
                  className={`${
                    pathname === "/contactus" ? "active-link font-bold" : ""
                  } `}
                >
                  Contact Us
                </Link>
              </NavbarItem>
            </NavbarContent>
            {!isSignedIn ? (
              <NavbarContent>
                <NavbarItem className="mr-2 mlg:mr-10">
                  <Link href={"/sign-up"}>
                    <button className="rounded-xl bg-[#FF0204] text-white px-4 py-1.5 font-bold">
                      SIGN IN
                    </button>
                  </Link>
                </NavbarItem>
              </NavbarContent>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </Navbar>
        </div>
      )}
    </>
  );
}
