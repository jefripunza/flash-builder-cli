// Third party
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env", quiet: true });

export const PWD = process.cwd();
export const ENV = process.env as Record<string, string>;
export const FROM_NODE_MODULE = ENV["_"]?.includes(".bin/fbi");

export const PROJECT_TARGET_URL = ENV.PROJECT_TARGET_URL;

export type LLMProvider =
  | "openai"
  | "anthropic"
  | "google"
  | "ollama"
  | "llama_cpp";

export const LLM_PROVIDER: LLMProvider = ENV.LLM_PROVIDER as LLMProvider;
export let LLM_MODEL = ENV.LLM_MODEL;
export let LLM_BASE_URL = ENV.LLM_BASE_URL;
export const LLM_API_KEY = ENV.LLM_API_KEY || "";

export const environmentValidate = () => {
  if (["openai", "anthropic", "google"].includes(LLM_PROVIDER)) {
    // api key
    if (!LLM_API_KEY) {
      throw new Error("LLM_API_KEY is not set");
    }
    // base url
    if (LLM_PROVIDER === "openai") {
      LLM_BASE_URL = "https://api.openai.com/v1";
    } else if (LLM_PROVIDER === "anthropic") {
      LLM_BASE_URL = "https://api.anthropic.com/v1";
    } else if (LLM_PROVIDER === "google") {
      LLM_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
    }
    // model
    if (!LLM_MODEL) {
      if (LLM_PROVIDER === "openai") {
        LLM_MODEL = "gpt-4o";
      } else if (LLM_PROVIDER === "anthropic") {
        LLM_MODEL = "claude-3-5-sonnet-20240620";
      } else if (LLM_PROVIDER === "google") {
        LLM_MODEL = "gemini-1.5-pro";
      }
    }
  } else if (["ollama", "llama_cpp"].includes(LLM_PROVIDER)) {
    // base url
    if (!LLM_BASE_URL) {
      if (LLM_PROVIDER === "ollama") {
        LLM_BASE_URL = "http://localhost:11434";
      } else if (LLM_PROVIDER === "llama_cpp") {
        LLM_BASE_URL = "http://localhost:11444";
      }
    }
    // model
    if (!LLM_MODEL) {
      if (LLM_PROVIDER === "ollama") {
        LLM_MODEL = "llama3.1";
      } else if (LLM_PROVIDER === "llama_cpp") {
        LLM_MODEL = "Qwen/Qwen3-8B-GGUF:Q8_0";
      }
    }
  } else {
    throw new Error("LLM_PROVIDER is not set");
  }
};
