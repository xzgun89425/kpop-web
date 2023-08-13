import mongoose from 'mongoose';
const { Schema } = mongoose;

const memberSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

const member = mongoose.model("member", memberSchema, 'member');

// people model
export default member;