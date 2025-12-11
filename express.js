import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import express from "express";

const app = express();
const router = express.Router();

router.get("/", statsCard);
router.get("/pin", repoCard);
router.get("/top-langs", langCard);
router.get("/wakatime", wakatimeCard);
router.get("/gist", gistCard);

app.use("/api", router);

// Start Express server on a port
const port = 3000;
app.listen(port);

// For Cloudflare Workers - use httpServerHandler
let httpServerHandler;
try {
  // Try to import httpServerHandler for Cloudflare Workers
  const cloudflareNode = await import("cloudflare:node");
  httpServerHandler = cloudflareNode.httpServerHandler;
} catch {
  // Fallback for local development
  httpServerHandler = null;
}

// Export for Cloudflare Workers
export default httpServerHandler
  ? httpServerHandler({ port })
  : {
      fetch() {
        return new Response("Not running in Cloudflare Workers environment", {
          status: 500,
        });
      },
    };
