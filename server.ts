import express from 'express';
import next from 'next';
import { scheduler as scheduleJobs } from './jobs/scheduler';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Inicia el cron job automáticamente
  scheduleJobs();

  // Especificar los tipos de req y res
  server.all('*', (req: express.Request, res: express.Response) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});