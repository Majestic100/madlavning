import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Content-model jf. madsite-spec §2.
 * Valideres ved build: en opskrift uden billede, alt-tekst eller tider fejler buildet.
 */

/** Kontrolleret enhedsliste — fritekst-enheder ødelægger skalering (spec §2). */
export const ENHEDER = [
  "g", "kg", "dl", "ml", "l",
  "tsk", "spsk", "stk", "fed", "knivspids", "bundt", "dåse", "kvist",
] as const;

export const KATEGORIER = ["bagvaerk", "desserter", "kager", "snacks", "pizza"] as const;
export const DIAETER = ["vegetarisk", "vegansk", "glutenfri"] as const;
export const SAESONER = ["foraar", "sommer", "efteraar", "vinter"] as const;
export const ANLEDNINGER = ["hverdag", "gaester", "foedselsdag", "jul", "paaske", "weekend"] as const;

const ingrediens = z.object({
  amount: z.number().positive().nullable().default(null), // null = "efter smag" (fx flagesalt)
  unit: z.enum(ENHEDER).nullable().default(null),
  name: z.string().min(1),
  note: z.string().nullable().default(null),
});

const ingrediensGruppe = z.object({
  group: z.string().nullable().default(null),
  items: z.array(ingrediens).min(1),
});

const trin = z.object({
  text: z.string().min(1),
  image: z.string().nullable().default(null), // sti til trinbillede, valgfrit
});

const trinGruppe = z.object({
  group: z.string().nullable().default(null),
  steps: z.array(trin).min(1),
});

const opskrifter = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/opskrifter" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(3),
      seoTitle: z.string().max(70).optional(),
      metaDescription: z.string().min(50).max(155),
      excerpt: z.string().min(20).max(220),
      publishedAt: z.date(),
      updatedAt: z.date().optional(),
      author: z.string().default("merve"),

      image: z.object({
        src: image(), // valideres og optimeres af Astro (AVIF/WebP + srcset)
        alt: z.string().min(5), // build fejler uden alt-tekst (spec §10)
        credit: z.string().nullable().default(null),
      }),
      video: z.string().regex(/^[A-Za-z0-9_-]{11}$/, "video skal være et YouTube-ID på 11 tegn").nullable().default(null),
      instagram: z.string().url().nullable().default(null),

      // Tid i minutter, aldrig fritekst (spec §2). totalTime udregnes — gemmes ikke.
      prepTime: z.number().int().positive(),
      cookTime: z.number().int().nonnegative(),
      waitTime: z.number().int().nonnegative().default(0), // hæve-/hvile-/køletid

      servings: z.number().int().positive(),
      servingsUnit: z.string().default("stk"),
      scalable: z.boolean().default(true),

      difficulty: z.enum(["nem", "mellem", "avanceret"]),
      cuisine: z.string().default("Dansk"),
      category: z.enum(KATEGORIER),
      diet: z.array(z.enum(DIAETER)).default([]),
      season: z.array(z.enum(SAESONER)).default([]),
      occasion: z.array(z.enum(ANLEDNINGER)).default([]),
      keywords: z.array(z.string()).min(1),

      storage: z.string().nullable().default(null),
      freezable: z.boolean().default(false),

      ingredients: z.array(ingrediensGruppe).min(1),
      instructions: z.array(trinGruppe).min(1),
      tips: z.array(z.string()).default([]),

      nutrition: z
        .object({
          calories: z.number(),
          protein: z.number(),
          carbohydrates: z.number(),
          fat: z.number(),
          fiber: z.number().optional(),
        })
        .nullable()
        .default(null),

      related: z.array(z.string()).default([]),
      seasonal: z.boolean().default(false), // vises i "lige nu"-sektionen på forsiden (styres manuelt)
    }),
});

/** Bagetips er artikler, ikke opskrifter — egen, enklere model. */
const bagetips = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/bagetips" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(3),
      seoTitle: z.string().max(70).optional(),
      metaDescription: z.string().min(50).max(155),
      excerpt: z.string().min(20).max(220),
      publishedAt: z.date(),
      updatedAt: z.date().optional(),
      author: z.string().default("merve"),
      image: z.object({
        src: image(),
        alt: z.string().min(5),
        credit: z.string().nullable().default(null),
      }),
      keywords: z.array(z.string()).min(1),
      readingTime: z.number().int().positive(), // minutter
    }),
});

export const collections = { opskrifter, bagetips };
