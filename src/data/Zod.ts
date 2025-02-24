// import { z } from "zod";

// const fileSchema = z
//   .instanceof(File, { message: "File must be a valid upload" })
//   .nullable()
//   .refine((file) => file !== null, {
//     message: "File is required",
//   });

// const playerSchema = z.object({
//   name: z.string().min(1, { message: "Name is required" }),
//   enrollment: z.string().min(1, { message: "Enrollment number is required" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   mobile: z
//     .string()
//     .regex(/^\d{10}$/, { message: "Please enter valid mobile number!" }),
//   // playerIdCard: fileSchema, // Ensures file is not null and valid
//   gender: z.string().min(1, { message: "Gender is required" }),
// });

// // Registration Schema
// const registrationSchema = z.object({
//   event: z.string().min(1, { message: "Please select an event" }),
//   collegeName: z.string().min(1, { message: "College name is required" }),
//   players: z
//     .array(playerSchema)
//     .min(1, { message: "At least one player is required" }),
//   captain: z.string().min(1, { message: "Please select a captain" }),
//   transactionId: z
//     .string()
//     .min(5, { message: "Transaction ID must be at least 5 characters" }),
//   transactionImage: fileSchema,
// });

// export { playerSchema, registrationSchema };
import { z } from "zod";

const fileSchema = z
  .instanceof(File, { message: "File must be a valid upload" })
  .nullable()
  .refine((file) => file !== null, {
    message: "File is required",
  });

const playerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  enrollment: z.string().min(1, { message: "Enrollment number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z
    .string()
    .regex(/^\d{10}$/, { message: "Please enter a valid mobile number!" }),
  playerIdCard: fileSchema, // Ensures file is not null and valid
  gender: z.string().min(1, { message: "Gender is required" }),
});

const registrationSchema = z
  .object({
    event: z.string().min(1, { message: "Please select an event" }),
    collegeName: z.string().min(1, { message: "College name is required" }),
    players: z
      .array(playerSchema)
      .min(1, { message: "At least one player is required" })
      .refine(
        (players) => new Set(players.map((p) => p.enrollment)).size === players.length,
        { message: "Enrollment number must be unique for each player" }
      )
      .refine(
        (players) => new Set(players.map((p) => p.email)).size === players.length,
        { message: "Email must be unique for each player" }
      )
      .refine(
        (players) => new Set(players.map((p) => p.mobile)).size === players.length,
        { message: "Mobile number must be unique for each player" }
      ),
    captain: z.string().min(1, { message: "Please select a captain" }),
    transactionId: z
      .string()
      .min(5, { message: "Transaction ID must be at least 5 characters" }),
    transactionImage: fileSchema,
  });

export { playerSchema, registrationSchema };
