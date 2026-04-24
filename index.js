import dotenv from 'dotenv';
dotenv.config();

import ExpressConfig from "./Server/express.config.js";
import MiddlewareConfig from "./Middleware/middleware.config.js";
import RouteConfig from "./Server/route.config.js";
import { connectAllDb } from "./Utils/connectionManager.js";

const app = ExpressConfig();

MiddlewareConfig(app);
RouteConfig(app);

const PORT = process.env.PORT || 5000;

await connectAllDb();

app.listen(PORT, async () => {
  console.log(`Backend Multi-Tenant tournant sur le port ${PORT}`);
});