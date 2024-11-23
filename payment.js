import mongoose from "mongoose"; 
import userModel from './usermodel.js';

const schema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: userModel },
    products: {
        type: Map,
        of: Number,
    }
});
const paymentModel = mongoose.model ("payment", schema)

export default paymentModel;