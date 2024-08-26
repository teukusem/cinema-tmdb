import React from "react";
import { Spinner } from "@nextui-org/react";

export default function LoadingList() {
  return (
    <div className="h-96 flex items-center justify-center rounded-lg">
      <Spinner label="Loading..." color="warning" />
    </div>
  );
}
