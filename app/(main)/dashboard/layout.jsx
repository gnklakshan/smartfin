import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
import DashboardPage from "./page";

const DashboardLayout = () => {
  return (
    <div className="px-5">
      <h1 className="text-6xl font-bold gradient-title mb-5">Dashboard</h1>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />} //from react spinner for indicate loading state
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
