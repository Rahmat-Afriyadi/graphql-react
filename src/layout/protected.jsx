import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebars from "../components/sidebar";
import Header from "../components/header";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);
  // const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Sidebars sidebarOpen={isOpen} setSidebarOpen={setIsOpen} />

      <div className="">
        <main className="lg:pl-72">
          <Header setSidebarOpen={setIsOpen} />
          <div className="py-10 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
