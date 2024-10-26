import { Schema, model } from "mongoose";

const collection = "products"
const schema = new Schema({
    title: { type: String, required: true, index: true},
    category: { type: String, default: "default", enum: ["pc","tablet","phone","console", "tv"] },
    price: { type: Number, default: 1},
    stock: { type: Number, default: 1},
    photo: { type: String, default: "no-photo.png"}

})

const Product = model(collection, schema)
export default Product