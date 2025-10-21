"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  console.log("Renderizou ToastProvider");
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />

    </>
  );
};
