import mongoose from "mongoose"; 
const schema = mongoose.Schema ({
    name: String,
    price: Number
})
const productModel = mongoose.model ("products", schema)
export default productModel