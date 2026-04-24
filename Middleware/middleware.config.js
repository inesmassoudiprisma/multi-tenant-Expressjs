//middleware.config.js
import { databaseResolver } from "../middleware/databaseResolver.js";

export default function(app) {
  app.use(databaseResolver);
}