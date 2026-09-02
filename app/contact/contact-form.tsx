"use client";

import { useActionState } from "react";
import posthog from "posthog-js";
import { submitContact } from "./actions";
import SubmitButton from "./submit-button";

const initialState = {
  message: "",
};

export default function ContactForm() {
  async function submitContactWithAnalytics(
    previousState: typeof initialState,
    formData: FormData,
  ) {
    const result = await submitContact(previousState, formData);
    posthog.capture("contact_message_submitted");

    return result;
  }

  const [state, formAction] = useActionState(
    submitContactWithAnalytics,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-7">
        <h2 className="text-xl font-semibold text-slate-900">
          Send us a message
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Fill in the form below and we&apos;ll get back to you.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            placeholder="How can we help?"
            required
            rows={5}
            className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <SubmitButton />
      </div>

      {state.message && (
        <p className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {state.message}
        </p>
      )}
    </form>
  );
}
