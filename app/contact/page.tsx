import ContactForm from "./contact-form";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Contact
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">Contact Us</h1>

        <p className="mt-2 text-slate-600">
          Have a question about our products? Send us a message.
        </p>
      </div>

      <ContactForm />
    </main>
  );
}
