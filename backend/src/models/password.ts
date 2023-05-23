import { InferSchemaType, model, Schema } from "mongoose";

const passwordSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    password: { type: String, required: true },
    website: { type: String },
    username: {type: String}
}, { timestamps: true });

type Password = InferSchemaType<typeof passwordSchema>;

export default model<Password>("Password", passwordSchema);