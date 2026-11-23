import createClient from "openapi-fetch";
import type { paths } from "@/generated/sdk";

export const api = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
});
