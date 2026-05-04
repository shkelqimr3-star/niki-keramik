import { type CategoryKey, editableCategoryKeys } from "@/lib/content";

export type GalleryProjectView = {
  id: string;
  titleSq: string;
  titleSr: string;
  descriptionSq: string;
  descriptionSr: string;
  location: string | null;
  projectDate: string | null;
  category: Exclude<CategoryKey, "ALL">;
  tags: string[];
  imageUrl: string;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
  featured: boolean;
  showInHero: boolean;
  heroOrder: number;
  priority: number;
  createdAt?: string;
  updatedAt?: string;
  isPlaceholder?: boolean;
};

export const fallbackImage = "/images/niki-keramik-projects.png";
export const legacyHeroImage = "/images/niki-keramik-hero.png";

export const sampleProjects: GalleryProjectView[] = [
  {
    id: "sample-bathroom",
    titleSq: "Banjo moderne me pllaka mermeri",
    titleSr: "Moderno kupatilo sa mermernim pločicama",
    descriptionSq: "Banjë moderne me pllaka të mëdha, dush walk-in dhe detaje të pastra.",
    descriptionSr: "Moderno kupatilo sa velikim formatima, walk-in tušem i čistim detaljima.",
    location: "Lugina e Preshevës",
    projectDate: null,
    category: "BATHROOM",
    tags: ["banjo", "mermer", "walk-in"],
    imageUrl: fallbackImage,
    beforeImageUrl: null,
    afterImageUrl: fallbackImage,
    featured: true,
    showInHero: true,
    heroOrder: 1,
    priority: 1,
    isPlaceholder: true
  },
  {
    id: "sample-sink",
    titleSq: "Lavaman me pllaka sipas masës",
    titleSr: "Lavabo od pločica po meri",
    descriptionSq: "Lavaman i punuar sipas masës për pamje unike dhe elegante.",
    descriptionSr: "Lavabo izrađen po meri za unikatan i elegantan izgled.",
    location: "Bujanoc",
    projectDate: null,
    category: "TILED_SINK",
    tags: ["lavaman", "pllaka", "sipas masës"],
    imageUrl: fallbackImage,
    beforeImageUrl: null,
    afterImageUrl: fallbackImage,
    featured: true,
    showInHero: true,
    heroOrder: 2,
    priority: 2,
    isPlaceholder: true
  },
  {
    id: "sample-terrace",
    titleSq: "Terasë dhe hyrje shtëpie",
    titleSr: "Terasa i ulaz u kuću",
    descriptionSq: "Pllaka të jashtme për hyrje, shkallë dhe terasë me përfundim të pastër.",
    descriptionSr: "Spoljašnje ploče za ulaz, stepenice i terasu sa čistom završnom obradom.",
    location: "Raincë",
    projectDate: null,
    category: "TERRACE",
    tags: ["terasë", "hyrje", "shkallë"],
    imageUrl: fallbackImage,
    beforeImageUrl: null,
    afterImageUrl: fallbackImage,
    featured: true,
    showInHero: true,
    heroOrder: 3,
    priority: 3,
    isPlaceholder: true
  },
  {
    id: "sample-yard",
    titleSq: "Oborr me gurë dekorativë",
    titleSr: "Dvorište sa dekorativnim kamenom",
    descriptionSq: "Kombinim pllakash të jashtme dhe guri dekorativ për oborr familjar.",
    descriptionSr: "Kombinacija spoljašnjih ploča i dekorativnog kamena za porodično dvorište.",
    location: null,
    projectDate: null,
    category: "YARD",
    tags: ["oborr", "gurë dekorativë"],
    imageUrl: fallbackImage,
    beforeImageUrl: null,
    afterImageUrl: fallbackImage,
    featured: true,
    showInHero: false,
    heroOrder: 4,
    priority: 4,
    isPlaceholder: true
  },
  {
    id: "sample-technical",
    titleSq: "Instalime teknike industriale",
    titleSr: "Industrijske tehničke instalacije",
    descriptionSq: "Linja uji dhe ajri të kompresuar për objekte teknike dhe industriale.",
    descriptionSr: "Vodovodne linije i komprimovani vazduh za tehničke i industrijske objekte.",
    location: null,
    projectDate: null,
    category: "TECHNICAL",
    tags: ["ujë", "ajër i kompresuar", "teknike"],
    imageUrl: fallbackImage,
    beforeImageUrl: null,
    afterImageUrl: fallbackImage,
    featured: true,
    showInHero: false,
    heroOrder: 5,
    priority: 5,
    isPlaceholder: true
  }
];

export function normalizeProject(project: any): GalleryProjectView {
  return {
    id: project.id,
    titleSq: project.titleSq,
    titleSr: project.titleSr,
    descriptionSq: project.descriptionSq,
    descriptionSr: project.descriptionSr,
    location: project.location ?? null,
    projectDate: project.projectDate ? new Date(project.projectDate).toISOString() : null,
    category: editableCategoryKeys.includes(project.category) ? project.category : "OTHER",
    tags: Array.isArray(project.tags) ? project.tags : [],
    imageUrl: project.imageUrl,
    beforeImageUrl: project.beforeImageUrl ?? null,
    afterImageUrl: project.afterImageUrl ?? null,
    featured: Boolean(project.featured),
    showInHero: Boolean(project.showInHero),
    heroOrder: Number(project.heroOrder ?? 100),
    priority: Number(project.priority ?? 100),
    createdAt: project.createdAt ? new Date(project.createdAt).toISOString() : undefined,
    updatedAt: project.updatedAt ? new Date(project.updatedAt).toISOString() : undefined
  };
}

export function heroProjects(projects: GalleryProjectView[]) {
  const hero = projects.filter((project) => project.showInHero).sort((a, b) => a.heroOrder - b.heroOrder);
  return hero.length ? hero : sampleProjects.filter((project) => project.showInHero);
}

export function featuredProjects(projects: GalleryProjectView[]) {
  const featured = projects.filter((project) => project.featured).sort((a, b) => a.priority - b.priority);
  return featured.length ? featured : sampleProjects;
}
