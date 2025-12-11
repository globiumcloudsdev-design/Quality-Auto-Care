// // app/api/booking/route.ts
// "use server";

// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import mongoose from "mongoose";
// import connectDB from "@/lib/mongodb";
// import PromoCode from "@/Models/PromoCode";

// // --- Mongoose Schema & Model Definitions ---

// // Booking Status Enum
// const BookingStatus = {
//     PENDING: "pending",
//     CONFIRMED: "confirmed",
//     IN_PROGRESS: "in-progress",
//     COMPLETED: "completed",
//     CANCELLED: "cancelled",
//     RESCHEDULED: "rescheduled",
// };

// // Booking Types Enum
// const BookingType = {
//     VEHICLE: "vehicle",
//     CHIMNEY: "chimney",
//     DUCK_CLEANING: "duck-cleaning",
//     // Add more types as needed
// };

// // Package Schema
// const PackageSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     name: { type: String, required: true },
//     price: { type: mongoose.Schema.Types.Mixed, required: true },
//     pricingType: { type: String },
// });

// // Additional Service Schema
// const AdditionalServiceSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     name: { type: String, required: true },
//     price: { type: mongoose.Schema.Types.Mixed, required: true },
// });

// // Variant Schema
// const VariantSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     name: { type: String, required: true },
//     packages: [PackageSchema],
//     additionalServices: [AdditionalServiceSchema],
// });

// // Service Schema
// const ServiceSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     name: { type: String, required: true },
//     packages: [PackageSchema],
//     variants: [VariantSchema],
//     additionalServices: [AdditionalServiceSchema],
// });

// // Main Service Schema
// const MainServiceSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     name: { type: String, required: true },
//     packages: [PackageSchema],
// });

// // Vehicle Booking Schema (Specific to vehicle bookings)
// const VehicleBookingSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     serviceType: { type: String, required: true },
//     variant: { type: String },
//     mainService: { type: String, required: true },
//     package: { type: String, required: true },
//     additionalServices: [{ type: String }],
//     vehicleType: { type: String },
//     vehicleMake: { type: String, required: true },
//     vehicleModel: { type: String, required: true },
//     vehicleYear: { type: String, required: true },
//     vehicleColor: { type: String, required: true },
//     vehicleLength: { type: String },
// });

// // Chimney Cleaning Schema
// const ChimneyBookingSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     serviceType: { type: String, required: true },
//     chimneyType: { type: String, required: true },
//     package: { type: String, required: true },
//     additionalServices: [{ type: String }],
//     chimneySize: { type: String },
//     location: { type: String },
//     specialRequirements: { type: String },
// });

// // Duck Cleaning Schema
// const DuckCleaningBookingSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     serviceType: { type: String, required: true },
//     package: { type: String, required: true },
//     additionalServices: [{ type: String }],
//     duckCount: { type: Number },
//     areaSize: { type: String },
//     specialRequirements: { type: String },
// });

// // Generic Booking Details Schema (for any booking type)
// const GenericBookingDetailsSchema = new mongoose.Schema({
//     serviceType: { type: String, required: true },
//     package: { type: String, required: true },
//     additionalServices: [{ type: String }],
//     // Add any common fields that might be needed across all booking types
//     specialRequirements: { type: String },
// });

// // Form Data Schema (Now supports multiple booking types)
// const FormDataSchema = new mongoose.Schema({
//     // Keep vehicleBookings for backward compatibility
//     vehicleBookings: [VehicleBookingSchema],

//     // New flexible booking details - can hold any type of booking
//     bookingDetails: {
//         type: mongoose.Schema.Types.Mixed,
//         default: null
//     },

//     // Common customer information
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zip: { type: String, required: true },
//     date: { type: String, required: true },
//     timeSlot: { type: String, required: true },
//     notes: { type: String },
// });

// // Main Booking Schema
// const BookingSchema = new mongoose.Schema(
//     {
//         bookingId: { type: String, required: true, unique: true },
//         webName: { type: String, required: true },

//         // Vendor information for each booking
//         vendorName: { type: String },

//         // Booking type to distinguish between different services
//         bookingType: {
//             type: String,
//             enum: Object.values(BookingType),
//             default: BookingType.VEHICLE,
//             required: true
//         },

//         formData: { type: FormDataSchema, required: true },
//         totalPrice: { type: Number, required: true },

//         // ✅ FIXED: discountedPrice made optional with default
//         discountedPrice: {
//             type: Number,
//             default: function () {
//                 return this.totalPrice; // If no discount, default to totalPrice
//             }
//         },

//         discountApplied: { type: Boolean, default: false },
//         discountPercent: { type: Number, default: 0 },

//         // Human-readable promo code string (kept for backward compatibility)
//         promoCode: { type: String },

//         // Reference to PromoCode document
//         promoCodeId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'PromoCode',
//             default: null,
//             index: true,
//         },

//         submittedAt: { type: String, required: true },
//         vehicleCount: { type: Number, default: 0 }, // Made optional with default
//         serviceCount: { type: Number, default: 1 }, // Generic count for any service

//         status: {
//             type: String,
//             enum: Object.values(BookingStatus),
//             default: BookingStatus.PENDING,
//         },

//         cancellationReason: {
//             type: String,
//             default: null,
//         },
//     },
//     { timestamps: true }
// );

// // Index for better query performance
// BookingSchema.index({ bookingType: 1, vendorName: 1 });
// BookingSchema.index({ vendorName: 1, status: 1 });

// // Retrieve the model if it exists, or create it.
// // IMPORTANT: We use mongoose.models to prevent model overwrite errors in dev mode.
// const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

// // --- Email Logic ---
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_APP_PASSWORD,
//     },
// });

// function createOwnerBookingEmailHTML(data: any) {
//     const {
//         bookingId,
//         formData,
//         totalPrice,
//         discountedPrice,
//         discountApplied,
//         discountPercent,
//         promoCode,
//         submittedAt,
//         vehicleCount,
//     } = data;

//     const vehicleDetails = formData.vehicleBookings
//         .map(
//             (vehicle: any, index: number) => `
//         <div class="vehicle-card">
//           <h4>Vehicle ${index + 1}</h4>
//           <p><strong>Service:</strong> ${vehicle.serviceType}</p>
//           <p><strong>Package:</strong> ${vehicle.package}</p>
//           <p><strong>Vehicle:</strong> ${vehicle.vehicleYear} ${vehicle.vehicleMake} ${vehicle.vehicleModel
//                 }</p>
//           ${vehicle.vehicleLength
//                     ? `<p><strong>Length:</strong> ${vehicle.vehicleLength}ft</p>`
//                     : ""
//                 }
//         </div>
//       `
//         )
//         .join("");

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; color: #333; }
//           .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; }
//           .header { background-color: #3b82f6; color: white; padding: 10px; text-align: center; }
//           .vehicle-card { border: 1px solid #eee; padding: 10px; margin-bottom: 10px; background: #f9f9f9; }
//           .label { font-weight: bold; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header"><h1>New Booking: ${bookingId}</h1></div>
//           <h2>Customer Details</h2>
//           <p><span class="label">Name:</span> ${formData.firstName} ${formData.lastName
//         }</p>
//           <p><span class="label">Email:</span> ${formData.email}</p>
//           <p><span class="label">Phone:</span> ${formData.phone}</p>
//           <p><span class="label">Address:</span> ${formData.address}, ${formData.city
//         }, ${formData.state} ${formData.zip}</p>
//           <h2>Booking Details</h2>
//           <p><span class="label">Date:</span> ${new Date(
//             formData.date
//         ).toLocaleDateString()}</p>
//           <p><span class="label">Time:</span> ${formData.timeSlot}</p>
//           <p><span class="label">Vehicles:</span> ${vehicleCount}</p>
//           ${vehicleDetails}
//           <h2>Payment</h2>
//           <p><span class="label">Total:</span> $${totalPrice.toFixed(2)}</p>
//           ${discountApplied
//             ? `<p><span class="label">Discount:</span> ${discountPercent}% (${promoCode})</p>
//                  <p><span class="label">Final Price:</span> $${discountedPrice.toFixed(
//                 2
//             )}</p>`
//             : ""
//         }
//           <p><span class="label">Submitted:</span> ${new Date(
//             submittedAt
//         ).toLocaleString()}</p>
//         </div>
//       </body>
//       </html>
//       `;
// }

// function createCustomerConfirmationEmailHTML(data: any) {
//     const {
//         bookingId,
//         formData,
//         discountedPrice,
//     } = data;

//     return `
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <style>
//       body { font-family: Arial, sans-serif; color: #333; }
//       .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; }
//       .header { background-color: #3b82f6; color: white; padding: 10px; text-align: center; }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <div class="header"><h1>Booking Confirmed!</h1></div>
//       <h2>Thank You, ${formData.firstName}!</h2>
//       <p>Your booking with Quality Auto Care Detailing is confirmed.</p>
//       <p><strong>Booking ID:</strong> ${bookingId}</p>
//       <p><strong>Date:</strong> ${new Date(formData.date).toLocaleDateString()}</p>
//       <p><strong>Time:</strong> ${formData.timeSlot}</p>
//       <p><strong>Total:</strong> $${discountedPrice.toFixed(2)}</p>
//       <p>We look forward to servicing your vehicle(s).</p>
//     </div>
//   </body>
//   </html>
//   `;
// }

// // --- API Route ---
// export async function POST(req: Request) {
//     try {
//         const body = await req.json();

//         // Basic validation
//         if (!body.bookingId || !body.formData) {
//             return NextResponse.json(
//                 { success: false, message: "Missing required fields" },
//                 { status: 400 }
//             );
//         }

//         // 1. Save to MongoDB
//         await connectDB();

//         // Create new booking document
//         const newBooking = new Booking({
//             ...body,
//         });

//         await newBooking.save();
//         console.log("Booking saved to MongoDB:", newBooking._id);

//         // 2. Send Emails
//         const ownerMailOptions = {
//             from: `Quality Auto Care Booking <${process.env.GMAIL_USER}>`,
//             to: process.env.OWNER_EMAIL,
//             subject: `New Vehicle Booking: ${body.bookingId}`,
//             html: createOwnerBookingEmailHTML(body),
//         };

//         const customerMailOptions = {
//             from: `Quality Auto Care Detailing <${process.env.GMAIL_USER}>`,
//             to: body.formData.email,
//             subject: `Your Booking is Confirmed! (ID: ${body.bookingId})`,
//             html: createCustomerConfirmationEmailHTML(body),
//         };

//         await Promise.all([
//             transporter.sendMail(ownerMailOptions),
//             transporter.sendMail(customerMailOptions),
//         ]);

//         return NextResponse.json({
//             success: true,
//             message: "Booking successful, saved to DB, and emails sent",
//             bookingId: newBooking.bookingId
//         });
//     } catch (error: any) {
//         console.error("Booking API failed:", error);

//         // Return a more descriptive error if it's a validation error
//         if (error.name === 'ValidationError') {
//             return NextResponse.json(
//                 { success: false, message: `Validation Error: ${error.message}` },
//                 { status: 400 }
//             );
//         }

//         return NextResponse.json(
//             { success: false, message: "Failed to process booking" },
//             { status: 500 }
//         );
//     }
// }
