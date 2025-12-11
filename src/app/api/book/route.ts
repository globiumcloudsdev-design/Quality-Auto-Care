// src/app/api/book/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Incoming body:", JSON.stringify(body, null, 2));

    // ---------------- CONTACT FORM ----------------
    if (body.type === "contact") {

      // Send to external dashboard API
      try {
        const fullName = `${body.firstName || ''} ${body.lastName || ''}`.trim() || body.name || 'Unknown';
        const dashboardResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email: body.email,
            message: body.message.trim(),
            webName: "Decent Detailers",
          }),
        });

        if (!dashboardResponse.ok) {
          console.error("Failed to send to dashboard:", await dashboardResponse.text());
          // Continue anyway, don't fail the request
        }
      } catch (error) {
        console.error("Error sending to dashboard:", error);
        // Continue anyway
      }

      return NextResponse.json({ message: "✅ Contact form received" }, { status: 200 });
    }

    // ---------------- BOOKING FORM ----------------
    if (
      body.type === "booking" &&
      body.firstName &&
      body.lastName &&
      body.date &&
      body.timeSlot &&
      body.email &&
      body.vehicles &&
      body.vehicles.length > 0
    ) {

      // Send to external dashboard API
      try {
        const vehicleBookings = body.vehicles.map((vehicle: any, index: number) => ({
          id: `${Date.now()}-${index}`,
          serviceType: vehicle.selectedPackages?.[0]?.category || 'detailing',
          variant: vehicle.vehicleType || 'unknown',
          mainService: vehicle.selectedPackages?.[0]?.package || 'standard',
          package: vehicle.selectedPackages?.[0]?.package || 'standard',
          additionalServices: vehicle.additionalServices || [],
          vehicleType: vehicle.vehicleType || 'unknown',
          vehicleMake: vehicle.vehicleMake || 'N/A',
          vehicleModel: vehicle.vehicleModel || 'N/A',
          vehicleYear: vehicle.vehicleYear || 'N/A',
          vehicleColor: vehicle.vehicleColor || 'N/A',
          vehicleLength: vehicle.vehicleSize || null,
        }));

        const bookingData = {
          bookingId: `QAC-${Date.now()}`,
          webName: "Quality Auto Care",
          vendorName: "Quality Auto Care",
          bookingType: "vehicle",
          formData: {
            vehicleBookings,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone || '',
            address: body.address || '',
            city: body.city || '',
            state: body.state || '',
            zip: body.zip || '',
            date: body.date,
            timeSlot: body.timeSlot,
            notes: body.notes || '',
          },
          totalPrice: body.totalPrice || 0,
          discountedPrice: body.discountedPrice || body.totalPrice || 0,
          discountApplied: body.discountApplied || false,
          discountPercent: body.discountPercent || 0,
          promoCode: body.promoCode || null,
          submittedAt: new Date().toISOString(),
          vehicleCount: body.vehicles.length,
          serviceCount: 1,
          status: "pending",
        };

        // console.log("Sending booking data to dashboard:", JSON.stringify(bookingData, null, 2));

        const dashboardResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/booking`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        const dashboardText = await dashboardResponse.text();
        
        if (!dashboardResponse.ok) {
          console.error("Failed to send booking to dashboard:", dashboardResponse.status, dashboardText);
          // Continue anyway, don't fail the request
        } else {
          console.log("Successfully sent booking to dashboard");
        }
      } catch (error) {
        console.error("Error sending booking to dashboard:", error);
        // Continue anyway
      }

      return NextResponse.json({ message: "✅ Booking received" }, { status: 200 });
    }

    // ---------------- INVALID REQUEST ----------------
    return NextResponse.json(
      { message: "❌ Invalid request data" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { message: "Failed to process request", error: error.message },
      { status: 500 }
    );
  }
}