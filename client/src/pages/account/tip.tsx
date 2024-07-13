import React, { useState } from "react";

import { Button } from "@/components/ui/button";

export default function Tip() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <Button variant="round" size="round" className="mr-4">
        {" "}
        $1{" "}
      </Button>
      <Button variant="round" size="round" className="mr-4">
        {" "}
        $1{" "}
      </Button>
      <Button variant="round" size="round" className="mr-4">
        {" "}
        $1{" "}
      </Button>
    </div>
  );
}
