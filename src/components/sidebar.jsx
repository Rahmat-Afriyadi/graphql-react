import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function Sidebars({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Static sidebar for mobile */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="w-6 h-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white grow gap-y-5">
              <div className="flex items-center self-center h-16 shrink-0">
                <span className="text-xl font-bold text-gray-700">Logo</span>
              </div>
              <nav className="flex flex-col flex-1">
                <ul className="flex flex-col flex-1 gap-y-7">
                  <li>
                    <ul className="-mx-2 space-y-1">
                      <li className="">
                        <NavLink
                          to="/users"
                          className={({ isActive }) =>
                            `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 
                ${isActive ? "bg-gray-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"}`
                          }
                        >
                          User
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/products"
                          className={({ isActive }) =>
                            `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 
                ${isActive ? "bg-gray-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"}`
                          }
                        >
                          Product
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
          <div className="flex items-center self-center h-16 shrink-0">
            <span className="text-xl font-bold text-gray-700">HRCM</span>
          </div>
          <nav className="flex flex-col flex-1">
            <ul className="flex flex-col flex-1 gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  <li className="rounded-lg border-2 border-slate-200">
                    <NavLink
                      to="/"
                      end
                      className={({ isActive }) =>
                        `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 
                ${isActive ? "bg-slate-800 text-yellow-200" : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"}`
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="rounded-lg border-2 border-slate-200">
                    <NavLink
                      to="/users"
                      className={({ isActive }) =>
                        `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 
                ${isActive ? "bg-slate-800 text-yellow-200" : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"}`
                      }
                    >
                      User
                    </NavLink>
                  </li>
                  <li className="rounded-lg border-2 border-slate-200">
                    <NavLink
                      to="/products"
                      className={({ isActive }) =>
                        `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 
                ${isActive ? "bg-slate-800 text-yellow-200" : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"}`
                      }
                    >
                      Product
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
