"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        style: {
          background: "#1E293B",
          border: "1px solid rgba(148,163,184,0.2)",
          color: "#F1F5F9",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
