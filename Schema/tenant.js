import { Schema } from "mongoose";

const tenantSchema = new Schema(
  {
    dbUri: { type: String, required: true },
    name: { type: String, unique: true, required: true },
  }
);

export default tenantSchema;