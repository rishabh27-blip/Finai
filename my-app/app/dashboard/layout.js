import { BarLoader } from "react-spinners";
import DashboardPage from "./page";
import React, { Suspense } from "react";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex items-center justify-center">
      <div className="container mx-auto px-5 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800"></h1>
        </div>
        <Suspense
          fallback={<BarLoader className="my-10 mx-auto" width={"100%"} color="#9333ea" />}
        >
          <DashboardPage />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardLayout;