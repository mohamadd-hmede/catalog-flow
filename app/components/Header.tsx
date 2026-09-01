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
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          CatalogFlow
        </Link>

        <div className="flex items-center gap-2 text-sm font-medium">
          <Link
            href="/"
            className={`rounded-lg px-4 py-2 transition ${
              isActive("/")
                ? "bg-indigo-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          <Link
            href="/products"
            className={`rounded-lg px-4 py-2 transition ${
              isActive("/products")
                ? "bg-indigo-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            }`}
          >
            Products
          </Link>

          <Link
            href="/contact"
            className={`rounded-lg px-4 py-2 transition ${
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
