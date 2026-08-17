import ContactForm from "./contact-form";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <section className="lg:pt-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Contact
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Let&apos;s talk.
          </h1>

          <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
            Have a question about a product or need more information? Send us a
            message and we&apos;ll be happy to help.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Product Questions
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Ask about product details, categories, or anything in our
                catalog.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                General Support
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                We&apos;re here to help with any questions about CatalogFlow.
              </p>
            </div>
          </div>
        </section>

        <ContactForm />
      </div>
    </main>
  );
}
