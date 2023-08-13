import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema({
    account: {
        type: String,
    },
    password: {
        type: String,
    }
});

const admin = mongoose.model("admin", adminSchema, 'admin');

// people model
export default admin;