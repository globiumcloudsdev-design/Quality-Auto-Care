import { NextResponse } from 'next/server';
import { z, ZodIssue } from 'zod';

// Define the schema for booking validation
const vehicleSchema = z.object({
  vehicleType: z.string().min(1, "Vehicle type is required"),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleYear: z.string().optional(),
  vehicleColor: z.string().optional(),
  vehicleSize: z.string().optional(),
  serviceType: z.string().min(1, "Service type is required"),
  selectedPackages: z.array(z.object({
    category: z.string(),
    package: z.string(),
  })).min(1, "At least one package must be selected"),
  additionalServices: z.array(z.string()),
});

const bookingSchema = z.object({
  vehicles: z.array(vehicleSchema).min(1, "At least one vehicle is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  notes: z.string().optional(),
  extraService: z.string().optional(),
  extraPackageId: z.string().optional(),
  extraServiceLabel: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the booking data against the schema
    const validationResult = bookingSchema.safeParse(body);

    if (!validationResult.success) {
      // Return validation errors
      const errors = validationResult.error.issues.map((err: ZodIssue) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json({
        success: false,
        valid: false,
        message: 'Validation failed',
        errors,
      }, { status: 400 });
    }

    // If validation passes, return success
    return NextResponse.json({
      success: true,
      valid: true,
      message: 'Booking data is valid',
    });
  } catch (error) {
    console.error('POST /api/booking/validate error:', error);
    return NextResponse.json({
      success: false,
      valid: false,
      message: 'Error validating booking data',
    }, { status: 500 });
  }
}
