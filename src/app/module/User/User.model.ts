import { Schema, model } from "mongoose";
import dotenv from "dotenv";
import Bcrypt from "bcrypt";
import { TUser } from "./User.interface";

dotenv.config();

const UserSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, "User ID is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      min: 8,
      max: 20,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
   passwordChangeAt: {
      type: Date,
      optional:true
    },
    status: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: {
        values: ["student", "faculty", "admin"],
        message: 'Role must be either "student", "faculty", or "admin".',
      },
      required: [true, "User role is required."],
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// using middleware pre hook by save data   === Before
UserSchema.pre("save", async function (next) {
  const userData = this;
  userData.password = await Bcrypt.hash(
    this.password,
    Number(process.env.BCRYPT_NUMBER)
  );
  next();
});

// after save data  middle ware
UserSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

const UserModel = model<TUser>("User", UserSchema);

export default UserModel;
