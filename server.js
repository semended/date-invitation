const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";
const indexPath = path.join(__dirname, "index.html");

const server = http.createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, {
      "allow": "GET, HEAD",
      "content-type": "text/plain; charset=utf-8"
    });
    response.end("Method Not Allowed");
    return;
  }

  try {
    const html = await fs.readFile(indexPath);
    response.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    response.end(html);
  } catch (error) {
    console.error(error);
    response.writeHead(500, {
      "content-type": "text/plain; charset=utf-8"
    });
    response.end("Server Error");
  }
});

server.listen(port, host, () => {
  console.log(`Date invitation is running at http://${host}:${port}`);
});
