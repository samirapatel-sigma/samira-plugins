import React from "react";
import { SimpleGrid } from "./components/SimpleGrid";

export const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SimpleGrid />
    </div>
  );
};