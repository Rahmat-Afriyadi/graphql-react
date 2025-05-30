import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Avatar from "./avatar";
import Drawer from "./drawer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth";
import { Navigate } from "react-router-dom";

export default function Header({ setSidebarOpen }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const userNavigation = [
    {
      name: "Logout",
      href: "/login",
      onClick: function () {
        dispatch(logout());
        return <Navigate to="/login" />;
      },
    },
  ];

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="w-6 h-6" />
        </button>

        {/* Separator */}
        <div aria-hidden="true" className="w-px h-6 bg-gray-200 lg:hidden" />

        <div className="flex self-stretch flex-1 gap-x-4 lg:gap-x-6">
          <form action="#" method="GET" className="relative flex flex-1"></form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Separator */}
            <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <Avatar />
                <span className="hidden lg:flex lg:items-center">
                  <span aria-hidden="true" className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                    {localStorage.getItem("name")}
                  </span>
                  <ChevronDownIcon aria-hidden="true" className="w-5 h-5 ml-2 text-gray-400" />
                </span>
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2.5 w-52 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="px-3 py-1">
                  <div className="flex-wrap text-sm leading-6 text-gray-900">{localStorage.getItem("email")}</div>
                  {/* <div className="text-sm text-gray-500">{auth.user.role.name}</div> */}
                </div>
                <hr />
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <Drawer open={open} setOpen={setOpen}>
        Hallo
      </Drawer>
    </>
  );
}
