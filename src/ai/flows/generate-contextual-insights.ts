// src/ai/flows/generate-contextual-insights.ts
'use server';

/**
 * @fileOverview Generates contextual insights for a given keyword based on a provided text.
 *
 * - generateContextualInsights - A function that generates contextual insights for a given keyword.
 * - GenerateContextualInsightsInput - The input type for the generateContextualInsights function.
 * - GenerateContextualInsightsOutput - The return type for the generateContextualInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContextualInsightsInputSchema = z.object({
  text: z.string().describe('The main text content.'),
  keyword: z.string().describe('The keyword to generate insights for.'),
});
export type GenerateContextualInsightsInput = z.infer<
  typeof GenerateContextualInsightsInputSchema
>;

const GenerateContextualInsightsOutputSchema = z.object({
  insights: z.string().describe('The AI-generated contextual insights for the keyword.'),
});
export type GenerateContextualInsightsOutput = z.infer<
  typeof GenerateContextualInsightsOutputSchema
>;

export async function generateContextualInsights(
  input: GenerateContextualInsightsInput
): Promise<GenerateContextualInsightsOutput> {
  return generateContextualInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContextualInsightsPrompt',
  input: {schema: GenerateContextualInsightsInputSchema},
  output: {schema: GenerateContextualInsightsOutputSchema},
  prompt: `Given the text: """{{{text}}}""", provide insightful and relevant statistics and explanations for the keyword: """{{{keyword}}}""" Include information to explain and provide context to the term.`,
});

const generateContextualInsightsFlow = ai.defineFlow(
  {
    name: 'generateContextualInsightsFlow',
    inputSchema: GenerateContextualInsightsInputSchema,
    outputSchema: GenerateContextualInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
