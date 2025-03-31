import { postService } from '@/services/postService';
import { postSchema, PostValidated } from '@/types/post';

describe('FakePostService', () => {
  test('devrait retourner un tableau de posts valides', async () => {
    const posts = await postService.getPosts();

    // Vérifier que c'est un tableau et qu'il contient 5 éléments
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBe(5);

    // Vérifier que chaque post est bien validé par Zod
    posts.forEach((post) => {
      const result = postSchema.safeParse(post);
      expect(result.success).toBe(true);
    });
  });

  test('devrait gérer correctement les erreurs de validation', async () => {
    // On mock une mauvaise structure de post pour forcer une erreur
    const invalidPost = {
      id: 123, // Mauvais type (devrait être une string)
      title: null, // Mauvais type (devrait être une string)
      content: "", // Devrait être un paragraphe valide
      author: "John Doe",
      createdAt: new Date(),
    };

    const result = postSchema.safeParse(invalidPost);

    // Vérifier que la validation échoue
    expect(result.success).toBe(false);
    
    if (!result.success) {
      console.log("🛑 Erreur de validation capturée :", result.error.format());
    }
  });
});
