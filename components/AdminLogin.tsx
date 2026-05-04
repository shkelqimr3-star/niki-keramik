"use client";

import { FormEvent, useState } from "react";
import { Lock } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";

export function AdminLoginFrame() {
  return (
    <LanguageProvider>
      <AdminLogin />
    </LanguageProvider>
  );
}

function AdminLogin() {
  const { t } = useLanguage();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(false);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.get("password") })
    });

    setLoading(false);

    if (response.ok) {
      window.location.href = "/admin";
      return;
    }

    setError(true);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ceramic px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-lg border border-graphite/10 bg-white p-7 shadow-soft">
        <div className="mb-7 grid h-14 w-14 place-items-center rounded-lg bg-graphite text-ceramic">
          <Lock size={26} />
        </div>
        <h1 className="text-3xl font-black text-graphite">{t.admin.loginTitle}</h1>
        <label className="mt-7 grid gap-2">
          <span className="label">{t.admin.password}</span>
          <input name="password" type="password" className="field" required />
        </label>
        <button className="focus-ring mt-5 w-full rounded-lg bg-water px-5 py-4 text-sm font-black text-white" disabled={loading}>
          {loading ? "..." : t.admin.login}
        </button>
        {error ? <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm font-bold text-red-700">Admin password is incorrect.</p> : null}
      </form>
    </main>
  );
}
