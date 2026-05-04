"use client";

import Image from "next/image";
import Link from "next/link";
import { Images, LogOut, MessageCircle, RefreshCw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { allStatuses, whatsapp } from "@/lib/content";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";

type Quote = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string | null;
  location: string;
  workType: string;
  squareMeters: string | null;
  desiredDate: string | null;
  materialStatus: string | null;
  description: string;
  photoUrls: string[];
  status: (typeof allStatuses)[number];
  notes: string | null;
  createdAt: string;
};

export function AdminDashboardFrame() {
  return (
    <LanguageProvider>
      <AdminDashboard />
    </LanguageProvider>
  );
}

function AdminDashboard() {
  const { t } = useLanguage();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadQuotes() {
    setLoading(true);
    const response = await fetch("/api/admin/quotes", { cache: "no-store" });
    if (response.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const data = (await response.json()) as { quotes: Quote[] };
    setQuotes(data.quotes);
    setLoading(false);
  }

  useEffect(() => {
    void loadQuotes();
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="min-h-screen bg-ceramic">
      <header className="border-b border-graphite/10 bg-white">
        <div className="section-shell flex h-20 items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-water">Niki Keramik</p>
            <h1 className="text-2xl font-black text-graphite">{t.admin.title}</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/gallery" className="focus-ring inline-grid h-11 w-11 place-items-center rounded-lg border border-graphite/15 bg-white text-graphite" aria-label={t.admin.gallery}>
              <Images size={19} />
            </Link>
            <button onClick={loadQuotes} className="focus-ring inline-grid h-11 w-11 place-items-center rounded-lg border border-graphite/15 bg-white text-graphite" aria-label="Refresh">
              <RefreshCw size={19} />
            </button>
            <button onClick={logout} className="focus-ring inline-grid h-11 w-11 place-items-center rounded-lg bg-graphite text-white" aria-label={t.admin.logout}>
              <LogOut size={19} />
            </button>
          </div>
        </div>
      </header>
      <section className="section-shell py-8">
        {loading ? <p className="font-bold text-concrete">...</p> : null}
        {!loading && quotes.length === 0 ? <p className="rounded-lg bg-white p-6 font-bold text-concrete">{t.admin.empty}</p> : null}
        <div className="grid gap-5">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} onSaved={loadQuotes} />
          ))}
        </div>
      </section>
    </main>
  );
}

function QuoteCard({ quote, onSaved }: { quote: Quote; onSaved: () => Promise<void> }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState(quote.status);
  const [notes, setNotes] = useState(quote.notes ?? "");
  const [saving, setSaving] = useState(false);
  const phone = quote.whatsapp || quote.phone;
  const digits = phone.replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${digits}?text=${encodeURIComponent("Niki Keramik")}`;

  async function save() {
    setSaving(true);
    await fetch(`/api/admin/quotes/${quote.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes })
    });
    setSaving(false);
    await onSaved();
  }

  return (
    <article className="rounded-lg border border-graphite/10 bg-white p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-graphite">{quote.name}</h2>
              <p className="mt-1 text-sm font-semibold text-concrete">
                {t.admin.received}: {new Date(quote.createdAt).toLocaleString()}
              </p>
            </div>
            <span className="rounded-lg bg-water/10 px-3 py-2 text-sm font-black text-water">{t.statuses[quote.status]}</span>
          </div>
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <Info label="Telefon" value={quote.phone} />
            <Info label="WhatsApp" value={quote.whatsapp || "-"} />
            <Info label="Lokacion" value={quote.location} />
            <Info label="Pune" value={quote.workType} />
            <Info label="m²" value={quote.squareMeters || "-"} />
            <Info label="Material" value={quote.materialStatus || "-"} />
            <Info label="Data" value={quote.desiredDate ? new Date(quote.desiredDate).toLocaleDateString() : "-"} />
          </dl>
          <p className="mt-5 rounded-lg bg-sand/55 p-4 text-sm leading-6 text-graphite">{quote.description}</p>
          {quote.photoUrls.length ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {quote.photoUrls.map((url) => (
                <a key={url} href={url} target="_blank" rel="noreferrer" className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone">
                  <Image src={url} alt="" fill sizes="220px" className="object-cover" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <div className="grid content-start gap-4 rounded-lg bg-ceramic p-4">
          <label className="grid gap-2">
            <span className="label">Status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value as Quote["status"])} className="field">
              {allStatuses.map((item) => (
                <option key={item} value={item}>
                  {t.statuses[item]}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="label">{t.admin.notes}</span>
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="field min-h-36 resize-y" />
          </label>
          <button onClick={save} disabled={saving} className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-water px-4 py-3 text-sm font-black text-white">
            <Save size={18} />
            {saving ? "..." : t.admin.save}
          </button>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-black text-white">
            <MessageCircle size={18} />
            {t.admin.whatsapp}
          </a>
        </div>
      </div>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-black uppercase text-concrete">{label}</dt>
      <dd className="mt-1 font-bold text-graphite">{value}</dd>
    </div>
  );
}
