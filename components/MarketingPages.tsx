"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  CalendarDays,
  Camera,
  Check,
  Facebook,
  Hammer,
  HardHat,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  Ruler,
  Send,
  ShowerHead,
  Sparkles,
  Star,
  Waves,
  Wrench,
  X
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { categoryKeys, whatsapp, type CategoryKey } from "@/lib/content";
import { featuredProjects, heroProjects, sampleProjects, type GalleryProjectView } from "@/lib/gallery";
import { useLanguage } from "@/components/LanguageProvider";

type PageKind = "home" | "services" | "gallery" | "quote" | "about" | "contact";

export function MarketingPage({ page }: { page: PageKind }) {
  const [projects, setProjects] = useState<GalleryProjectView[]>(sampleProjects);

  useEffect(() => {
    let mounted = true;
    fetch("/api/gallery", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { projects?: GalleryProjectView[] }) => {
        if (mounted && data.projects?.length) {
          setProjects(data.projects);
        }
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

  if (page === "services") return <ServicesPage />;
  if (page === "gallery") return <GalleryPage projects={projects} />;
  if (page === "quote") return <QuotePage projects={projects} />;
  if (page === "about") return <AboutPage />;
  if (page === "contact") return <ContactPage />;

  return (
    <>
      <Hero projects={projects} />
      <TrustBar />
      <section className="stone-grid py-14 sm:py-20">
        <div className="section-shell grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionIntro />
          <ServicePreview />
        </div>
      </section>
      <GalleryPreview projects={projects} />
      <HighlightSections compact />
      <PriceSection />
      <QuoteCTA />
      <ContactBand />
    </>
  );
}

function Hero({ projects }: { projects: GalleryProjectView[] }) {
  const { t, lang } = useLanguage();
  const slides = heroProjects(projects).slice(0, 5);
  const [active, setActive] = useState(0);
  const whatsappHref = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(t.whatsappMessage)}`;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-graphite text-ceramic">
      <div className="absolute inset-0">
        {slides.map((project, index) => (
          <Image
            key={project.id}
            src={project.imageUrl}
            alt={lang === "sq" ? project.titleSq : project.titleSr}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition duration-[1600ms] ease-out ${
              index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/72 to-graphite/12" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-graphite/80 to-transparent" />
      </div>

      <div className="section-shell relative flex min-h-[calc(100svh-5rem)] items-center py-14">
        <div className="grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-lg border border-ceramic/25 bg-white/10 px-3 py-2 text-sm font-bold text-ceramic backdrop-blur">
              <Sparkles size={16} />
              {t.hero.badge}
            </p>
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">{t.hero.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ceramic/82 sm:text-xl">{t.hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/oferta" className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-water px-5 py-4 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-water/90">
                <Send size={18} />
                {t.hero.quote}
              </Link>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-4 text-sm font-black text-graphite transition hover:-translate-y-0.5 hover:bg-ceramic">
                <MessageCircle size={18} />
                {t.hero.whatsapp}
              </a>
              <Link href="/punimet" className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-ceramic/30 bg-white/8 px-5 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/14">
                <Camera size={18} />
                {t.hero.gallery}
              </Link>
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-3">
            {slides.slice(0, 3).map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setActive(index)}
                className={`group relative h-48 overflow-hidden rounded-lg border text-left shadow-soft transition ${
                  index === active ? "border-water" : "border-white/18 hover:border-white/60"
                }`}
              >
                <Image src={project.imageUrl} alt="" fill sizes="260px" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-graphite/82 to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 text-sm font-black text-white">
                  {lang === "sq" ? project.titleSq : project.titleSr}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((project, index) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${index === active ? "w-9 bg-water" : "w-2.5 bg-white/55"}`}
          />
        ))}
      </div>
    </section>
  );
}

function TrustBar() {
  const { t } = useLanguage();
  return (
    <section className="border-y border-graphite/10 bg-white">
      <div className="section-shell grid gap-2 py-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.trust.map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded-lg bg-ceramic px-4 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-graphite text-ceramic">
              {index === 0 ? <Star size={17} /> : index === 1 ? <Check size={17} /> : index === 2 ? <Ruler size={17} /> : <MapPin size={17} />}
            </span>
            <p className="text-sm font-black text-graphite">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionIntro() {
  const { t } = useLanguage();
  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.18em] text-water">{t.homeIntro.eyebrow}</p>
      <h2 className="mt-4 max-w-2xl text-3xl font-black text-graphite sm:text-4xl">{t.homeIntro.title}</h2>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-concrete">{t.homeIntro.body}</p>
    </div>
  );
}

function PageHeader({ title, lead, image = "/images/niki-keramik-projects.png" }: { title: string; lead: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-graphite py-20 text-white sm:py-28">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-42" />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/78 to-graphite/20" />
      <div className="section-shell relative">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-water">Niki Keramik</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ceramic/78">{lead}</p>
      </div>
    </section>
  );
}

function ServicePreview() {
  const { t } = useLanguage();
  const services = t.services.slice(0, 9);
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {services.map((service, index) => (
        <div key={service} className="group rounded-lg border border-graphite/10 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-water/35 hover:shadow-soft">
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-sand text-graphite transition group-hover:bg-water group-hover:text-white">
            {index % 5 === 0 ? <ShowerHead size={21} /> : index % 5 === 1 ? <Hammer size={21} /> : index % 5 === 2 ? <Wrench size={21} /> : index % 5 === 3 ? <HardHat size={21} /> : <Waves size={21} />}
          </div>
          <p className="text-sm font-black text-graphite">{service}</p>
        </div>
      ))}
    </div>
  );
}

function ServicesPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader title={t.pages.servicesTitle} lead={t.pages.servicesLead} />
      <section className="py-14 sm:py-20">
        <div className="section-shell">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.map((service) => (
              <div key={service} className="group flex items-center gap-3 rounded-lg border border-graphite/10 bg-white p-4 transition hover:-translate-y-1 hover:border-water/30 hover:shadow-soft">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-water/12 text-water">
                  <Check size={17} />
                </span>
                <p className="font-bold text-graphite">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HighlightSections />
      <PriceSection />
      <ContactBand />
    </>
  );
}

function HighlightSections({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  const sections = [
    { icon: Sparkles, title: t.highlights.customSinkTitle, body: t.highlights.customSink, tone: "bg-graphite text-ceramic" },
    { icon: HardHat, title: t.highlights.exteriorTitle, body: t.highlights.exterior, tone: "bg-white text-graphite" },
    { icon: Wrench, title: t.highlights.industrialTitle, body: t.highlights.industrial, tone: "bg-water text-white" }
  ];

  return (
    <section className={`py-14 sm:py-20 ${compact ? "bg-ceramic" : "bg-sand/65"}`}>
      <div className="section-shell grid gap-4 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <article key={section.title} className={`group overflow-hidden rounded-lg p-6 shadow-soft transition hover:-translate-y-1 ${section.tone}`}>
              <div className="mb-8 grid h-12 w-12 place-items-center rounded-lg bg-white/16 transition group-hover:scale-105">
                <Icon size={24} />
              </div>
              <h2 className="text-2xl font-black">{section.title}</h2>
              <p className="mt-4 leading-7 opacity-80">{section.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PriceSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-graphite py-14 text-ceramic sm:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-water">
            <BadgeEuro size={18} />
            {t.prices.title}
          </p>
          <h2 className="mt-4 text-3xl font-black text-white">{t.prices.preview}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-ceramic/70">{t.prices.note}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {t.prices.items.map((item) => (
            <div key={item} className="rounded-lg border border-ceramic/12 bg-white/6 p-4 transition hover:border-water/45">
              <p className="font-bold text-white">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPage({ projects }: { projects: GalleryProjectView[] }) {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader title={t.pages.galleryTitle} lead={t.pages.galleryLead} />
      <GalleryExplorer projects={projects} />
      <ContactBand />
    </>
  );
}

function GalleryPreview({ projects }: { projects: GalleryProjectView[] }) {
  const { t } = useLanguage();
  const featured = featuredProjects(projects).slice(0, 5);
  return (
    <section className="py-14 sm:py-20">
      <div className="section-shell">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-water">Gallery</p>
            <h2 className="mt-3 text-3xl font-black text-graphite">{t.gallery.featuredTitle}</h2>
          </div>
          <Link href="/punimet" className="inline-flex items-center gap-2 text-sm font-black text-water">
            {t.hero.gallery}
            <ArrowRight size={18} />
          </Link>
        </div>
        <ProjectMasonry projects={featured} />
      </div>
    </section>
  );
}

function GalleryExplorer({ projects }: { projects: GalleryProjectView[] }) {
  const { t } = useLanguage();
  const [active, setActive] = useState<CategoryKey>("ALL");
  const filtered = useMemo(
    () => (active === "ALL" ? projects : projects.filter((project) => project.category === active)),
    [active, projects]
  );

  return (
    <section className="py-10 sm:py-14">
      <div className="section-shell">
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categoryKeys.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`shrink-0 rounded-lg px-4 py-3 text-sm font-black transition ${
                active === category ? "bg-graphite text-white" : "bg-white text-graphite hover:bg-sand"
              }`}
            >
              {t.gallery.categories[category]}
            </button>
          ))}
        </div>
        {filtered.length ? <ProjectMasonry projects={filtered} /> : <p className="rounded-lg bg-white p-6 font-bold text-concrete">{t.gallery.empty}</p>}
      </div>
    </section>
  );
}

function ProjectMasonry({ projects }: { projects: GalleryProjectView[] }) {
  const [openProject, setOpenProject] = useState<GalleryProjectView | null>(null);
  return (
    <>
      <div className="grid auto-rows-[12rem] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} tall={index === 0 || index === 3} onOpen={() => setOpenProject(project)} />
        ))}
      </div>
      {openProject ? <ProjectLightbox project={openProject} onClose={() => setOpenProject(null)} /> : null}
    </>
  );
}

function ProjectCard({ project, tall, onOpen }: { project: GalleryProjectView; tall: boolean; onOpen: () => void }) {
  const { t, lang } = useLanguage();
  const title = lang === "sq" ? project.titleSq : project.titleSr;
  const description = lang === "sq" ? project.descriptionSq : project.descriptionSr;

  return (
    <article className={`group relative overflow-hidden rounded-lg bg-graphite shadow-soft ${tall ? "sm:row-span-2" : ""}`}>
      <Image src={project.imageUrl} alt={title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="mb-2 inline-flex rounded-lg bg-white/16 px-2.5 py-1 text-xs font-black backdrop-blur">{t.gallery.categories[project.category]}</p>
        <h3 className="text-lg font-black">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/76">{description}</p>
        <button onClick={onOpen} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-black text-graphite transition hover:bg-ceramic">
          <Maximize2 size={16} />
          {t.gallery.details}
        </button>
      </div>
    </article>
  );
}

function ProjectLightbox({ project, onClose }: { project: GalleryProjectView; onClose: () => void }) {
  const { t, lang } = useLanguage();
  const [split, setSplit] = useState(52);
  const title = lang === "sq" ? project.titleSq : project.titleSr;
  const description = lang === "sq" ? project.descriptionSq : project.descriptionSr;
  const hasBeforeAfter = Boolean(project.beforeImageUrl && project.afterImageUrl);

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-graphite/86 p-4 backdrop-blur" role="dialog" aria-modal="true">
      <div className="relative max-h-[92svh] w-full max-w-6xl overflow-y-auto rounded-lg bg-ceramic shadow-soft">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-lg bg-white text-graphite shadow-soft" aria-label={t.gallery.close}>
          <X size={22} />
        </button>
        <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative min-h-[58svh] bg-graphite">
            {hasBeforeAfter ? (
              <div className="absolute inset-0 overflow-hidden">
                <Image src={project.afterImageUrl || project.imageUrl} alt="" fill sizes="70vw" className="object-cover" />
                <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${split}%` }}>
                  <Image src={project.beforeImageUrl || project.imageUrl} alt="" fill sizes="70vw" className="object-cover" />
                </div>
                <input
                  type="range"
                  min="8"
                  max="92"
                  value={split}
                  onChange={(event) => setSplit(Number(event.target.value))}
                  className="absolute bottom-5 left-1/2 w-2/3 -translate-x-1/2 accent-water"
                  aria-label="Before after slider"
                />
              </div>
            ) : (
              <Image src={project.imageUrl} alt={title} fill sizes="70vw" className="object-cover" />
            )}
          </div>
          <div className="p-6 sm:p-8">
            <p className="inline-flex rounded-lg bg-water/12 px-3 py-2 text-sm font-black text-water">{t.gallery.categories[project.category]}</p>
            <h2 className="mt-5 text-3xl font-black text-graphite">{title}</h2>
            <p className="mt-4 leading-7 text-concrete">{description}</p>
            <div className="mt-6 grid gap-3 text-sm font-bold text-graphite">
              {project.location ? (
                <p className="flex items-center gap-2">
                  <MapPin size={17} />
                  {project.location}
                </p>
              ) : null}
              {project.projectDate ? (
                <p className="flex items-center gap-2">
                  <CalendarDays size={17} />
                  {new Date(project.projectDate).toLocaleDateString()}
                </p>
              ) : null}
            </div>
            {project.tags.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-lg bg-white px-3 py-2 text-xs font-black text-concrete">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuotePage({ projects }: { projects: GalleryProjectView[] }) {
  const { t } = useLanguage();
  const hero = heroProjects(projects)[0] ?? sampleProjects[0];
  return (
    <>
      <PageHeader title={t.pages.quoteTitle} lead={t.pages.quoteLead} image={hero.imageUrl} />
      <section className="py-14 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="overflow-hidden rounded-lg bg-graphite text-ceramic shadow-soft">
            <div className="relative aspect-[4/3]">
              <Image src={hero.imageUrl} alt="" fill sizes="420px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite to-transparent" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-black">Niki Keramik</h2>
              <p className="mt-4 leading-7 text-ceramic/75">{t.homeIntro.body}</p>
              <div className="mt-8 space-y-4 text-sm font-bold text-ceramic/85">
                <p className="flex items-center gap-3">
                  <Phone size={18} />
                  {whatsapp.display}
                </p>
                <p className="flex items-center gap-3">
                  <MapPin size={18} />
                  {t.serviceArea}
                </p>
              </div>
            </div>
          </aside>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}

function QuoteForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/quotes", { method: "POST", body: formData });

    if (response.ok) {
      event.currentTarget.reset();
      setStatus("success");
      return;
    }

    setStatus("error");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-graphite/10 bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-7 grid gap-2 sm:grid-cols-4">
        {t.form.steps.map((step, index) => (
          <div key={step} className="rounded-lg bg-ceramic p-3">
            <p className="text-xs font-black uppercase text-water">0{index + 1}</p>
            <p className="mt-1 text-sm font-black text-graphite">{step}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.form.fields.name} name="name" required />
        <Field label={t.form.fields.phone} name="phone" type="tel" required />
        <Field label={t.form.fields.whatsapp} name="whatsapp" type="tel" />
        <Field label={t.form.fields.location} name="location" required />
        <Field label={t.form.fields.workType} name="workType" required />
        <Field label={t.form.fields.squareMeters} name="squareMeters" />
        <Field label={t.form.fields.desiredDate} name="desiredDate" type="date" />
        <label className="grid gap-2">
          <span className="label">{t.form.fields.materialStatus}</span>
          <select name="materialStatus" className="field" defaultValue="">
            <option value="" />
            <option value={t.form.yes}>{t.form.yes}</option>
            <option value={t.form.no}>{t.form.no}</option>
            <option value={t.form.partial}>{t.form.partial}</option>
          </select>
        </label>
      </div>
      <label className="mt-5 grid gap-2">
        <span className="label">{t.form.fields.description}</span>
        <textarea name="description" className="field min-h-36 resize-y" required />
      </label>
      <label className="mt-5 grid gap-2">
        <span className="label">{t.form.fields.photos}</span>
        <input name="photos" type="file" multiple accept="image/*" className="field file:mr-4 file:rounded-md file:border-0 file:bg-graphite file:px-3 file:py-2 file:text-sm file:font-bold file:text-white" />
      </label>
      <button type="submit" disabled={status === "sending"} className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-water px-5 py-4 text-sm font-black text-white transition hover:bg-water/90 disabled:cursor-wait disabled:opacity-70 sm:w-auto">
        <Send size={18} />
        {status === "sending" ? "..." : t.form.submit}
      </button>
      {status === "success" ? <p className="mt-4 rounded-lg bg-water/10 p-4 text-sm font-bold text-graphite">{t.form.success}</p> : null}
      {status === "error" ? <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm font-bold text-red-700">{t.form.error}</p> : null}
    </form>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      <input name={name} type={type} required={required} className="field" />
    </label>
  );
}

function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader title={t.pages.aboutTitle} lead={t.pages.aboutLead} />
      <section className="py-14 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-lg leading-8 text-concrete">{t.homeIntro.body}</p>
            <p className="mt-6 text-lg leading-8 text-concrete">{t.highlights.exterior}</p>
            <p className="mt-6 text-lg leading-8 text-concrete">{t.highlights.industrial}</p>
          </div>
          <ServicePreview />
        </div>
      </section>
      <ContactBand />
    </>
  );
}

function ContactPage() {
  const { t } = useLanguage();
  const whatsappHref = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(t.whatsappMessage)}`;
  return (
    <>
      <PageHeader title={t.pages.contactTitle} lead={t.pages.contactLead} />
      <section className="py-14 sm:py-20">
        <div className="section-shell grid gap-4 md:grid-cols-3">
          <a href={`tel:${whatsapp.display.replaceAll(" ", "")}`} className="rounded-lg border border-graphite/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
            <Phone className="text-water" size={26} />
            <p className="mt-6 text-sm font-black uppercase text-concrete">Telefon</p>
            <p className="mt-2 text-xl font-black text-graphite">{whatsapp.display}</p>
          </a>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-lg border border-graphite/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
            <MessageCircle className="text-water" size={26} />
            <p className="mt-6 text-sm font-black uppercase text-concrete">WhatsApp</p>
            <p className="mt-2 text-xl font-black text-graphite">{whatsapp.display}</p>
          </a>
          <a href={whatsapp.facebook} target="_blank" rel="noreferrer" className="rounded-lg border border-graphite/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
            <Facebook className="text-water" size={26} />
            <p className="mt-6 text-sm font-black uppercase text-concrete">Facebook</p>
            <p className="mt-2 text-xl font-black text-graphite">Niki Keramik</p>
          </a>
        </div>
      </section>
    </>
  );
}

function QuoteCTA() {
  const { t } = useLanguage();
  return (
    <section className="bg-sand/70 py-14">
      <div className="section-shell overflow-hidden rounded-lg bg-graphite shadow-soft">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-7 text-white sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-water">Niki Keramik</p>
            <h2 className="mt-4 text-3xl font-black">{t.pages.quoteTitle}</h2>
            <p className="mt-4 max-w-xl leading-7 text-ceramic/75">{t.pages.quoteLead}</p>
            <Link href="/oferta" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-water px-5 py-4 text-sm font-black text-white">
              <Send size={18} />
              {t.hero.quote}
            </Link>
          </div>
          <div className="relative min-h-64">
            <Image src="/images/niki-keramik-projects.png" alt="" fill sizes="50vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  const { t } = useLanguage();
  const whatsappHref = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(t.whatsappMessage)}`;
  return (
    <section className="bg-water py-12 text-white">
      <div className="section-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black">Niki Keramik</h2>
          <p className="mt-2 font-semibold text-white/80">{t.pages.contactLead}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/oferta" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-4 text-sm font-black text-graphite">
            <Send size={18} />
            {t.hero.quote}
          </Link>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-graphite px-5 py-4 text-sm font-black text-white">
            <MessageCircle size={18} />
            {t.hero.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
