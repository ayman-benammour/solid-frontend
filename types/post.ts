import { z } from "zod";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

// Schéma Zod pour valider un Post
export const postSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  content: z.string().min(10, "Le contenu doit contenir au moins 10 caractères"),
  author: z.string().min(3, "L'auteur doit contenir au moins 3 caractères"),
  createdAt: z.date(),
});

// Type TypeScript basé sur le schéma Zod
export type PostValidated = z.infer<typeof postSchema>;
