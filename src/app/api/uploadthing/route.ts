import { createNextRoute } from "uploadthing/server";
import { ourFileRouter } from "./core";

// Export routes for Next.js App Router
export const { GET, POST } = createNextRoute({
  router: ourFileRouter,
});
