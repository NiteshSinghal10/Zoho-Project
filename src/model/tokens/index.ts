import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: String,
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 3600 }
}, { timestamps: true });

const TOKEN = mongoose.model('Token', tokenSchema);
export { TOKEN };