import { Schema, model } from "mongoose";
import dotenv from "dotenv";
import { TUser } from "./User.interface";
dotenv.config();

const UserSchema = new Schema<TUser>(
  {
    id: { 
      type: String, 
      required: [true, 'User ID is required.'] ,
      unique:true
    },
    password: { 
      type: String, 
      required: [true, 'Password is required.'] 
    },
    needsPasswordChange: { 
      type: Boolean, 
      default: false 
    },
    status: { 
      type: Number, 
      default: 0 
    },
    role: {
      type: String,
      enum: {
        values: ["student", "faculty", "admin"],
        message: 'Role must be either "student", "faculty", or "admin".'
      },
      required: [true, 'User role is required.']
    },
    isDeleted:{type:Boolean, default:false}
  },
  {
    timestamps: true,
  }
);

const UserModel = model<TUser>("User", UserSchema);

export default UserModel;
