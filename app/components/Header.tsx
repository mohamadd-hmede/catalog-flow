import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          CatalogFlow
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="transition hover:text-blue-600">
            Home
          </Link>

          <Link href="/products" className="transition hover:text-blue-600">
            Products
          </Link>

          <Link href="/contact" className="transition hover:text-blue-600">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
