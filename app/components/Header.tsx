"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButtons from "@/app/components/auth-buttons";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      {" "}
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        {" "}
        <Link href="/" className="text-xl font-bold text-blue-600">
          CatalogFlow
        </Link>
        <div className="order-3 flex w-full items-center justify-center gap-1 text-sm font-medium sm:order-none sm:w-auto sm:gap-2">
          {" "}
          <Link
            href="/"
            className={`rounded-lg px-3 py-2 sm:px-4 transition ${
              isActive("/")
                ? "bg-indigo-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`rounded-lg px-3 py-2 sm:px-4 transition ${
              isActive("/products")
                ? "bg-indigo-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            }`}
          >
            Products
          </Link>
          <Link
            href="/contact"
            className={`rounded-lg px-3 py-2 sm:px-4 transition ${
              isActive("/contact")
                ? "bg-indigo-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            }`}
          >
            Contact
          </Link>
        </div>
        <AuthButtons />
      </nav>
    </header>
  );
}
