import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "smartfin",
  name: "SmartFin",
  retryFunctions: async (attempt) => ({
    delay: math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2, // Maximum number of retry attempts
  }),
});
