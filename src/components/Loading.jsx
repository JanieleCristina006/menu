"use client";

import { TailSpin } from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "120px"
    }}>
      <TailSpin
        height="60"
        width="60"
        color="#F9B8D4"
        ariaLabel="loading"
      />
    </div>
  );
}
