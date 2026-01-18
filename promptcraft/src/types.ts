export enum ModelOption {
  GPT4o = 'GPT-4o',
  Claude35Sonnet = 'Claude 3.5 Sonnet',
  Claude3Opus = 'Claude 3 Opus',
  Gemini15Pro = 'Gemini 1.5 Pro',
  Gemini20Flash = 'Gemini 2.0 Flash',
  Llama31 = 'Llama 3.1 405B',
  MistralLarge = 'Mistral Large 2',
  GrokBeta = 'Grok Beta'
}

export const ModelDisplayNames: Record<ModelOption, string> = {
  [ModelOption.GPT4o]: 'GPT-4o',
  [ModelOption.Claude35Sonnet]: 'Claude 3.5 Sonnet',
  [ModelOption.Claude3Opus]: 'Claude 3 Opus',
  [ModelOption.Gemini15Pro]: 'Gemini 1.5 Pro',
  [ModelOption.Gemini20Flash]: 'Gemini 2.0 Flash',
  [ModelOption.Llama31]: 'Llama 3.1 405B',
  [ModelOption.MistralLarge]: 'Mistral Large 2',
  [ModelOption.GrokBeta]: 'Grok Beta'
};

export interface PromptResponse {
  text: string;
  tokenCount?: number;
}
