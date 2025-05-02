
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-closetx-offwhite p-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold mb-2 text-closetx-teal">404</h1>
        <p className="text-xl font-medium text-closetx-charcoal mb-6">Oops! This page doesn't exist</p>
        <p className="text-gray-500 mb-8">
          The page you're looking for might have been removed or is temporarily unavailable.
        </p>
        <Button
          className="bg-closetx-teal hover:bg-closetx-teal/90"
          onClick={() => navigate("/")}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
