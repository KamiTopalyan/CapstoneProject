import { InferSchemaType, model, Schema } from "mongoose";

const styleSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    backgroundColor: { type: String, default: "#ffd000" },
    navbarColor: { type: String, default: "#a900d3" },
    passwordColor: {type: String, default: "#00e09d" }
});

type Password = InferSchemaType<typeof styleSchema>;

export default model<Password>("Style", styleSchema);