"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  // Проверка роли пользователя
  useEffect(() => {
    if (session?.user?.role !== "ADMIN") {
      redirect("/dashboard");
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
