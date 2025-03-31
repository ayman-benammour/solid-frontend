import { faker } from "@faker-js/faker";
import { postSchema, PostValidated } from "@/types/post";

export interface PostRepository {
  getPosts(): Promise<PostValidated[]>;
}

export class FakePostService implements PostRepository {
  async getPosts(): Promise<PostValidated[]> {
    const rawPosts = Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(2),
      author: faker.person.fullName(),
      createdAt: faker.date.past(),
    }));

    // Validation avec Zod et gestion d'erreurs
    const validatedPosts = rawPosts.map((post) => {
      const result = postSchema.safeParse(post);
      
      if (!result.success) {
        // Log de l'erreur
        console.error("❌ Erreur de validation :", JSON.stringify(result.error.format(), null, 2));
        // Tu peux ici ajouter un throw ou retourner une valeur vide
        return null; // ou tu peux choisir de filter ce post plus tard
      }

      return result.data;
    });

    // Filtrer les résultats invalides (nulls)
    return validatedPosts.filter((post) => post !== null) as PostValidated[];
  }
}

export const postService: PostRepository = new FakePostService();
