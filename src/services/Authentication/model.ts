import mongoose from 'mongoose';

export interface Admin {
  username: string;
  password: string;
}

// JSON Schema for admins
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminModel = mongoose.model('Admin', AdminSchema, 'adminsJWT');

export default AdminModel;
