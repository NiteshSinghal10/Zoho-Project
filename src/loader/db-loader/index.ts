import mongoose from 'mongoose';

export const dbLoader = async () => {
  try {
    await mongoose.connect(String(process.env.MONGO_URL));
    console.log('DataBase connected');
  }catch(error) {
    console.log(error);
  }
}