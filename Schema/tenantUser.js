import { Schema, Types } from "mongoose";

const tenantUserSchema = new Schema({
  email: String,
  tenantId: {
    type: Types.ObjectId,
    ref: "tenants",
  }
});

export default tenantUserSchema;