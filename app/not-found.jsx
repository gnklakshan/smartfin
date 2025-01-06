import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaSadTear } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <p className="text-2xl text-gray-800 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <Button className="mt-6 px-4 py-2 bg-red-500 text-white text-lg rounded hover:bg-red-600 transition-all ">
          Return Home
        </Button>
      </Link>
      <div className="mt-10 text-red-500 animate-pulse">
        <FaSadTear size={100} />{" "}
      </div>
    </div>
  );
};

export default NotFound;
