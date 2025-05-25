import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer as createViteServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createServer() {
    const app = express();

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom',
    });

    app.use(vite.middlewares);

    // ✅ Use /* instead of * here
    app.use('/*', async (req, res) => {
        try {
            const url = req.originalUrl;

            const template = await vite.transformIndexHtml(
                url,
                `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Binary Bridges UI</title>
          </head>
          <body>
            <div id="app"></div>
            <script type="module" src="/src/main.js"></script>
          </body>
        </html>
      `
            );

            res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } catch (e) {
            vite.ssrFixStacktrace(e);
            console.error(e);
            res.status(500).end(e.message);
        }
    });

    const port = process.env.PORT || 3000;
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on http://0.0.0.0:${port}`);
    });
}

createServer();
