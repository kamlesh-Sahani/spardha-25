import mongoose, { Schema, Document, Model } from "mongoose";

// Define TypeScript Interface for Player
export interface IPlayer {
  email?: string;
  name: string;
  gender: "Male" | "Female" | "Other";
  mobile: string;
  playerIdCard: string;
  isCaptain?: boolean;
}

// Define TypeScript Interface for Team
export interface ITeam extends Document {
  teamID: number;
  event: string;
  college: string;
  players: IPlayer[];
    transactionSs: string;
  transactionId:string;
  password: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  reason:string;
  createdAt: Date;
  updatedAt: Date;
}

// Player Schema
const PlayerSchema = new Schema<IPlayer>({
  name: { type: String, required: true, trim: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  mobile: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/, // Indian mobile number validation
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
  },
  playerIdCard: { type: String, required: true },
  isCaptain: { type: Boolean, default: false },
});

// Team Schema
const TeamSchema = new Schema<ITeam>(
  {
    teamID: { type: Number, required: true, unique: true },
    event: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
   
    players: {
      type: [PlayerSchema],
      validate: [(val: IPlayer[]) => val.length > 0, "At least one player required."],
    },
    transactionId: { type: String, required: true, trim: true },
    transactionSs: { type: String, default: null },
    password: { type: String, required: true, minlength: 6 },
    amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reason:{
      type:String,
    },
  },
  { timestamps: true }
);

// Team Model
const TeamModel: Model<ITeam> = mongoose.models?.Team || mongoose.model<ITeam>("Team", TeamSchema);

export default TeamModel;
