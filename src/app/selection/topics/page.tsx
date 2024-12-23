"use client";

import { useParams } from "next/navigation";

export default function Topics() {
  const params = useParams();

  console.log(params); // 동적 경로에서 추출된 매개변수 확인

  return (
    <div>
      <h1>Topics Page</h1>
    </div>
  );
}
