import mongoose from 'mongoose';

const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect('mongodb+srv://haack79:' + process.env.MONGO_ATLAS_PW + '@cluster0.4qubeli.mongodb.net/');
        console.log('Connected to database');
    } catch (error) {
        console.log('Error while trying to connect to db' + error);
        process.exit(1);
    }
}

export default connectToDatabase;