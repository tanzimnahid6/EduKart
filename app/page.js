"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function Home() {
  const handleClick = (mode) => {
    mode ? toast.success("success") : toast.error("error");
  };
  return (
    <div>
      <Button variant="secondary" onClick={() => handleClick(true)}>click</Button>
    </div>
  );
}
