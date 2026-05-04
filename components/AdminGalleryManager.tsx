"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit3, ImagePlus, LayoutGrid, LogOut, Save, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { editableCategoryKeys } from "@/lib/content";
import { type GalleryProjectView } from "@/lib/gallery";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";

export function AdminGalleryFrame() {
  return (
    <LanguageProvider>
      <AdminGalleryManager />
    </LanguageProvider>
  );
}

function AdminGalleryManager() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<GalleryProjectView[]>([]);
  const [editing, setEditing] = useState<GalleryProjectView | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadProjects() {
    setLoading(true);
    const response = await fetch("/api/admin/gallery", { cache: "no-store" });
    if (response.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const data = (await response.json()) as { projects: GalleryProjectView[] };
    setProjects(data.projects);
    setLoading(false);
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const formData = new FormData(event.currentTarget);
    const url = editing ? `/api/admin/gallery/${editing.id}` : "/api/admin/gallery";
    const response = await fetch(url, {
      method: editing ? "PATCH" : "POST",
      body: formData
    });

    setSaving(false);
    if (response.ok) {
      event.currentTarget.reset();
      setEditing(null);
      await loadProjects();
    }
  }

  async function deleteProject(project: GalleryProjectView) {
    if (!window.confirm(`${t.admin.delete}: ${project.titleSq}`)) {
      return;
    }

    await fetch(`/api/admin/gallery/${project.id}`, { method: "DELETE" });
    await loadProjects();
  }

  return (
    <main className="min-h-screen bg-ceramic">
      <header className="sticky top-0 z-40 border-b border-graphite/10 bg-white/95 backdrop-blur">
        <div className="section-shell flex min-h-20 flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-water">Niki Keramik</p>
            <h1 className="text-2xl font-black text-graphite">{t.admin.galleryTitle}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin" className="focus-ring inline-flex items-center gap-2 rounded-lg border border-graphite/15 bg-white px-4 py-3 text-sm font-black text-graphite">
              <LayoutGrid size={18} />
              {t.admin.quotes}
            </Link>
            <button onClick={logout} className="focus-ring inline-flex items-center gap-2 rounded-lg bg-graphite px-4 py-3 text-sm font-black text-white">
              <LogOut size={18} />
              {t.admin.logout}
            </button>
          </div>
        </div>
      </header>

      <section className="section-shell grid gap-7 py-8 xl:grid-cols-[0.85fr_1.15fr]">
        <form key={editing?.id ?? "new"} onSubmit={onSubmit} className="rounded-lg border border-graphite/10 bg-white p-5 shadow-soft">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-water/12 text-water">
              <ImagePlus size={24} />
            </span>
            <div>
              <h2 className="text-xl font-black text-graphite">{editing ? t.admin.edit : t.admin.addPhoto}</h2>
              <p className="text-sm font-semibold text-concrete">{editing ? t.admin.replacePhoto : t.admin.mainProject}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t.admin.titleSq} name="titleSq" defaultValue={editing?.titleSq} required />
            <Field label={t.admin.titleSr} name="titleSr" defaultValue={editing?.titleSr} required />
          </div>
          <label className="mt-4 grid gap-2">
            <span className="label">{t.admin.descriptionSq}</span>
            <textarea name="descriptionSq" defaultValue={editing?.descriptionSq} required className="field min-h-24 resize-y" />
          </label>
          <label className="mt-4 grid gap-2">
            <span className="label">{t.admin.descriptionSr}</span>
            <textarea name="descriptionSr" defaultValue={editing?.descriptionSr} required className="field min-h-24 resize-y" />
          </label>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="label">{t.admin.category}</span>
              <select name="category" defaultValue={editing?.category ?? "BATHROOM"} className="field">
                {editableCategoryKeys.map((category) => (
                  <option key={category} value={category}>
                    {t.gallery.categories[category]}
                  </option>
                ))}
              </select>
            </label>
            <Field label={t.admin.location} name="location" defaultValue={editing?.location ?? ""} />
            <Field label={t.admin.date} name="projectDate" type="date" defaultValue={editing?.projectDate?.slice(0, 10) ?? ""} />
            <Field label={t.admin.tags} name="tags" defaultValue={editing?.tags.join(", ") ?? ""} />
            <Field label={t.admin.priority} name="priority" type="number" defaultValue={String(editing?.priority ?? 100)} />
            <Field label={t.admin.heroOrder} name="heroOrder" type="number" defaultValue={String(editing?.heroOrder ?? 100)} />
          </div>

          <div className="mt-4 grid gap-4">
            <FileField label={editing ? t.admin.replacePhoto : t.admin.image} name="image" required={!editing} />
            <FileField label={t.admin.beforeImage} name="beforeImage" />
            <FileField label={t.admin.afterImage} name="afterImage" />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <CheckField label={t.admin.featured} name="featured" defaultChecked={editing?.featured ?? true} />
            <CheckField label={t.admin.hero} name="showInHero" defaultChecked={editing?.showInHero ?? false} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button disabled={saving} className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-water px-5 py-4 text-sm font-black text-white disabled:cursor-wait disabled:opacity-70">
              <Save size={18} />
              {saving ? "..." : editing ? t.admin.update : t.admin.create}
            </button>
            {editing ? (
              <button type="button" onClick={() => setEditing(null)} className="focus-ring rounded-lg border border-graphite/15 px-5 py-4 text-sm font-black text-graphite">
                {t.gallery.close}
              </button>
            ) : null}
          </div>
        </form>

        <div>
          {loading ? <p className="rounded-lg bg-white p-6 font-bold text-concrete">...</p> : null}
          {!loading && projects.length === 0 ? <p className="rounded-lg bg-white p-6 font-bold text-concrete">{t.gallery.empty}</p> : null}
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-lg border border-graphite/10 bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-stone">
                  <Image src={project.imageUrl} alt={project.titleSq} fill sizes="360px" className="object-cover" />
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {project.featured ? <span className="rounded-lg bg-water px-2.5 py-1 text-xs font-black text-white">{t.admin.featured}</span> : null}
                    {project.showInHero ? <span className="rounded-lg bg-graphite px-2.5 py-1 text-xs font-black text-white">{t.admin.showHome}</span> : null}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase text-water">{t.gallery.categories[project.category]}</p>
                      <h3 className="mt-1 text-lg font-black text-graphite">{project.titleSq}</h3>
                      <p className="mt-1 text-sm font-semibold text-concrete">{project.titleSr}</p>
                    </div>
                    <span className="rounded-lg bg-ceramic px-3 py-2 text-xs font-black text-concrete">#{project.priority}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-concrete">{project.descriptionSq}</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <button onClick={() => setEditing(project)} className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-graphite px-4 py-3 text-sm font-black text-white">
                      <Edit3 size={17} />
                      {t.admin.edit}
                    </button>
                    <button onClick={() => deleteProject(project)} className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700">
                      <Trash2 size={17} />
                      {t.admin.delete}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue = "",
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      <input name={name} type={type} defaultValue={defaultValue} required={required} className="field" />
    </label>
  );
}

function FileField({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      <input name={name} type="file" accept="image/*" required={required} className="field file:mr-4 file:rounded-md file:border-0 file:bg-graphite file:px-3 file:py-2 file:text-sm file:font-bold file:text-white" />
    </label>
  );
}

function CheckField({ label, name, defaultChecked }: { label: string; name: string; defaultChecked: boolean }) {
  return (
    <label className="flex items-center gap-3 rounded-lg bg-ceramic p-4">
      <input name={name} type="checkbox" value="true" defaultChecked={defaultChecked} className="h-5 w-5 accent-water" />
      <span className="text-sm font-black text-graphite">{label}</span>
    </label>
  );
}
