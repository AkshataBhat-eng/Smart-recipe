import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 sm:px-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;