"use client";

import { useSearchParams } from "next/navigation";

export default function Topics() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");

  return (
    <div>
      <h1>{topic} Page</h1>
    </div>
  );
}
