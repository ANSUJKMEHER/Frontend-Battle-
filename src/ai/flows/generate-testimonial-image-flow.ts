
'use server';
/**
 * @fileOverview Generates an image for a testimonial avatar based on a hint.
 *
 * - generateTestimonialImage - A function that generates an image.
 * - GenerateTestimonialImageInput - The input type for the function.
 * - GenerateTestimonialImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTestimonialImageInputSchema = z.object({
  hint: z.string().describe('A short description or keywords to guide image generation, e.g., "female executive" or "male professional".'),
});
export type GenerateTestimonialImageInput = z.infer<typeof GenerateTestimonialImageInputSchema>;

const GenerateTestimonialImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI. Format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateTestimonialImageOutput = z.infer<typeof GenerateTestimonialImageOutputSchema>;

export async function generateTestimonialImage(input: GenerateTestimonialImageInput): Promise<GenerateTestimonialImageOutput> {
  return generateTestimonialImageFlow(input);
}

const generateTestimonialImageFlow = ai.defineFlow(
  {
    name: 'generateTestimonialImageFlow',
    inputSchema: GenerateTestimonialImageInputSchema,
    outputSchema: GenerateTestimonialImageOutputSchema,
  },
  async (input) => {
    try {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use this model for image generation
        prompt: `Generate a professional headshot style avatar for a testimonial. The person should match the hint: "${input.hint}". The image should be a clear portrait, suitable for a corporate website. Focus on the person's face and shoulders. The background should be simple and non-distracting.`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
        },
      });

      if (media && media.url) {
        return { imageDataUri: media.url };
      } else {
        console.error('Image generation did not return a media URL for hint:', input.hint);
        return { imageDataUri: 'https://placehold.co/80x80.png' }; // Fallback
      }
    } catch (error) {
      console.error('Error during image generation for hint:', input.hint, error);
      return { imageDataUri: 'https://placehold.co/80x80.png' }; // Fallback
    }
  }
);
