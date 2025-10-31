import OpenAI from 'openai';
import { InferenceClient } from '@huggingface/inference';
import summarizePrompt from '../prompts/summarize-reviews.txt';
import { Ollama } from 'ollama';

const opneAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

const ollamaClient = new Ollama();

type GenerateTextOptions = {
  model?: string;
  prompt: string;
  instructions?: string;
  temperature?: number;
  maxTokens?: number;
  previousReponseId?: string;
};
type GenerateTextResult = {
  id: string;
  text: string;
};

export const llmClient = {
  async generateText({
    model = 'gpt-4.1',
    prompt,
    instructions,
    temperature = 0.2,
    maxTokens = 300,
    previousReponseId,
  }: GenerateTextOptions): Promise<GenerateTextResult> {
    const response = await opneAIClient.responses.create({
      model,
      input: prompt,
      instructions,
      temperature,
      max_output_tokens: maxTokens,
      previous_response_id: previousReponseId,
    });
    return {
      id: response.id,
      text: response.output_text,
    };
  },

  async sumarizeReviews(reviews: string) {
    // const chatCompletion = await inferenceClient.chatCompletion({
    //   provider: 'novita',
    //   model: 'meta-llama/Llama-3.1-8B-Instruct',
    //   messages: [
    //     {
    //       role: 'system',
    //       content: summarizePrompt,
    //     },
    //     {
    //       role: 'user',
    //       content: reviews,
    //     },
    //   ],
    // });
    const response = await ollamaClient.chat({
      model: 'tinyllama',
      messages: [
        {
          role: 'system',
          content: summarizePrompt,
        },
        {
          role: 'user',
          content: reviews,
        },
      ],
    });
    return response.message.content;
  },
};
