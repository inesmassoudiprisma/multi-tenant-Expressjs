import { Schema } from "mongoose";

const usersSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
});

export default usersSchema;