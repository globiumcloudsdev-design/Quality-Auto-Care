import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Define TypeScript interfaces matching your frontend
interface ServicePackage {
  id: string;
  name: string;
  price: number | string;
  description: string;
  pricingType?: string;
  includes: string[];
}

interface AdditionalService {
  id: string;
  name: string;
  price: number | string;
  description: string;
}

interface ServiceVariant {
  id: string;
  name: string;
  vehicleTypes: string[];
  packages: ServicePackage[];
  additionalServices: AdditionalService[];
}

interface ServiceType {
  id: string;
  name: string;
  vehicleTypes: string[];
  packages?: ServicePackage[];
  variants?: ServiceVariant[];
  additionalServices?: AdditionalService[];
}

interface MainService {
  id: string;
  name: string;
  // price: number | string; // Commented out in frontend
  description: string;
  // pricingType: string; // Commented out in frontend
}

interface FormData {
  selectedServices: { serviceType: string; package: string; variant?: string }[];
  additionalServices: string[];
  mainServices: string[];
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  vehicleLength?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  date: string;
  timeSlot: string;
  notes: string;
}

interface BookingSubmission {
  bookingId: string;
  formData: FormData;
  totalPrice: number;
  discountedPrice: number;
  discountApplied: boolean;
  discountPercent: number;
  promoCode: string | null;
  submittedAt: string;
  mainServicesDetails: MainService[];
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const bookingData: BookingSubmission = await request.json();

    // Helper function to get service names
    const getServiceDisplayNames = () => {
      return bookingData.formData.selectedServices.map(sel => {
        // In a real scenario, you would have access to your service types data
        return `Service ${sel.serviceType} - Package ${sel.package}`;
      }).join(", ");
    };

    // Get main services names
    const getMainServiceNames = () => {
      return bookingData.mainServicesDetails.map(service => service.name).join(", ");
    };

    // Format date properly
    const formatDisplayDate = (dateString: string) => {
      if (!dateString) return "N/A";
      try {
        return new Date(dateString).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch {
        return "Invalid Date";
      }
    };

    // User email template
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Confirmation - Quality Auto Care</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #2563eb, #1e40af); padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { border: 1px solid #ddd; border-top: none; padding: 20px; border-radius: 0 0 10px 10px; }
          .section { background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .total-section { background-color: #d1fae5; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .discount { color: #059669; }
          .free { color: #059669; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="color: white; margin: 0;">Quality Auto Care</h1>
          <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Professional Auto Detailing Services</p>
        </div>
        
        <div class="content">
          <h2 style="color: #2563eb;">Booking Confirmation 🎉</h2>
          <p>Dear <strong>${bookingData.formData.firstName} ${bookingData.formData.lastName}</strong>,</p>
          <p>Thank you for choosing Quality Auto Care! Your booking has been confirmed successfully.</p>
          
          <div class="section">
            <h3 style="margin-top: 0; color: #2563eb;">Appointment Details</h3>
            <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
            <p><strong>Date:</strong> ${formatDisplayDate(bookingData.formData.date)}</p>
            <p><strong>Time:</strong> ${bookingData.formData.timeSlot}</p>
            <p><strong>Location:</strong> ${bookingData.formData.address}, ${bookingData.formData.city}, ${bookingData.formData.state} ${bookingData.formData.zip}</p>
          </div>

          <div class="section">
            <h3 style="margin-top: 0; color: #2563eb;">Service Details</h3>
            <p><strong>Main Services:</strong> ${getServiceDisplayNames()}</p>
            ${bookingData.formData.mainServices.length > 0 ? 
              `<p><strong>Premium Add-ons:</strong> ${getMainServiceNames()} <span class="free">(FREE)</span></p>` : ''}
            ${bookingData.formData.additionalServices.length > 0 ? 
              `<p><strong>Additional Services:</strong> ${bookingData.formData.additionalServices.length} selected</p>` : ''}
          </div>

          <div class="section">
            <h3 style="margin-top: 0; color: #2563eb;">Vehicle Information</h3>
            <p><strong>Vehicle:</strong> ${bookingData.formData.vehicleYear} ${bookingData.formData.vehicleMake} ${bookingData.formData.vehicleModel}</p>
            <p><strong>Color:</strong> ${bookingData.formData.vehicleColor}</p>
            <p><strong>Type:</strong> ${bookingData.formData.vehicleType}</p>
            ${bookingData.formData.vehicleLength ? 
              `<p><strong>Length:</strong> ${bookingData.formData.vehicleLength} ft</p>` : ''}
          </div>

          <div class="total-section">
            <h3 style="margin-top: 0; color: #059669;">Payment Summary</h3>
            <p><strong>Total Amount:</strong> $${bookingData.discountedPrice.toFixed(2)}</p>
            ${bookingData.discountApplied ? 
              `<p class="discount"><strong>Discount Applied:</strong> ${bookingData.discountPercent}% off</p>
               <p><strong>Original Price:</strong> <span style="text-decoration: line-through;">$${bookingData.totalPrice.toFixed(2)}</span></p>` : ''}
            ${bookingData.promoCode ? 
              `<p><strong>Promo Code:</strong> ${bookingData.promoCode}</p>` : ''}
          </div>

          <div style="margin-top: 25px; padding: 15px; background-color: #fffbeb; border-radius: 5px;">
            <h4 style="margin-top: 0; color: #d97706;">Important Notes</h4>
            <p>📍 <strong>Address:</strong> ${bookingData.formData.address}, ${bookingData.formData.city}, ${bookingData.formData.state} ${bookingData.formData.zip}</p>
            <p>⏰ <strong>Please be ready</strong> 10 minutes before your scheduled time</p>
            <p>🚗 <strong>Vehicle should be accessible</strong> at the appointment location</p>
            ${bookingData.formData.notes ? 
              `<p>📝 <strong>Your Notes:</strong> ${bookingData.formData.notes}</p>` : ''}
          </div>
          
          <p>If you need to reschedule or have any questions, please contact us at <strong>+92-XXX-XXXXXXX</strong>.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p>Best regards,<br><strong>Quality Auto Care Team</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Company email template - FIXED THE ERROR
    const companyEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Booking - Quality Auto Care</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #dc2626, #b91c1c); padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { border: 1px solid #ddd; border-top: none; padding: 25px; border-radius: 0 0 10px 10px; }
          .section { background-color: #fef2f2; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .service-section { background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .payment-section { background-color: #d1fae5; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .urgent { background-color: #fef3c7; padding: 10px; border-radius: 5px; margin: 10px 0; }
          .free { color: #059669; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="color: white; margin: 0;">🚨 NEW BOOKING ALERT</h1>
          <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Quality Auto Care - Booking System</p>
        </div>
        
        <div class="content">
          <div class="urgent">
            <h2 style="color: #d97706; margin: 0;">Action Required: New Booking Received</h2>
          </div>

          <div class="section">
            <h3 style="margin-top: 0; color: #dc2626;">Customer Information</h3>
            <p><strong>Name:</strong> ${bookingData.formData.firstName} ${bookingData.formData.lastName}</p>
            <p><strong>Email:</strong> ${bookingData.formData.email}</p>
            <p><strong>Phone:</strong> ${bookingData.formData.phone}</p>
            <p><strong>Address:</strong> ${bookingData.formData.address}, ${bookingData.formData.city}, ${bookingData.formData.state} ${bookingData.formData.zip}</p>
          </div>
          
          <div class="service-section">
            <h3 style="margin-top: 0; color: #2563eb;">Service Details</h3>
            <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
            <p><strong>Date & Time:</strong> ${formatDisplayDate(bookingData.formData.date)} at ${bookingData.formData.timeSlot}</p>
            
            <h4 style="color: #374151;">Selected Services:</h4>
            <ul>
              ${bookingData.formData.selectedServices.map(service => 
                `<li>Service Type: ${service.serviceType} | Package: ${service.package} ${service.variant ? `| Variant: ${service.variant}` : ''}</li>`
              ).join('')}
            </ul>

            ${bookingData.formData.mainServices.length > 0 ? `
              <h4 style="color: #374151;">Premium Add-ons (${bookingData.mainServicesDetails.length}):</h4>
              <ul>
                ${bookingData.mainServicesDetails.map(service => 
                  `<li>${service.name}` // REMOVED PRICE REFERENCE
                ).join('')}
              </ul>
            ` : ''}

            ${bookingData.formData.additionalServices.length > 0 ? `
              <h4 style="color: #374151;">Additional Services (${bookingData.formData.additionalServices.length}):</h4>
              <p>Services IDs: ${bookingData.formData.additionalServices.join(', ')}</p>
            ` : ''}
          </div>

          <div class="service-section">
            <h3 style="margin-top: 0; color: #2563eb;">Vehicle Information</h3>
            <p><strong>Vehicle Type:</strong> ${bookingData.formData.vehicleType}</p>
            <p><strong>Vehicle:</strong> ${bookingData.formData.vehicleYear} ${bookingData.formData.vehicleMake} ${bookingData.formData.vehicleModel}</p>
            <p><strong>Color:</strong> ${bookingData.formData.vehicleColor}</p>
            ${bookingData.formData.vehicleLength ? 
              `<p><strong>Length:</strong> ${bookingData.formData.vehicleLength} ft</p>` : ''}
          </div>

          <div class="payment-section">
            <h3 style="margin-top: 0; color: #059669;">Pricing Details</h3>
            <p><strong>Total Price:</strong> $${bookingData.totalPrice.toFixed(2)}</p>
            <p><strong>Discounted Price:</strong> $${bookingData.discountedPrice.toFixed(2)}</p>
            ${bookingData.discountApplied ? 
              `<p><strong>Discount:</strong> ${bookingData.discountPercent}% off</p>
               <p><strong>Amount Saved:</strong> $${(bookingData.totalPrice - bookingData.discountedPrice).toFixed(2)}</p>` : ''}
            ${bookingData.promoCode ? 
              `<p><strong>Promo Code Used:</strong> ${bookingData.promoCode}</p>` : ''}
          </div>

          ${bookingData.formData.notes ? `
            <div class="section">
              <h3 style="margin-top: 0; color: #dc2626;">Customer Notes</h3>
              <p>${bookingData.formData.notes}</p>
            </div>
          ` : ''}

          <div style="margin-top: 25px; padding: 15px; background-color: #dbeafe; border-radius: 5px;">
            <h4 style="margin-top: 0; color: #1e40af;">Next Steps</h4>
            <p>✅ <strong>Contact customer</strong> to confirm appointment</p>
            <p>✅ <strong>Prepare equipment</strong> based on services booked</p>
            <p>✅ <strong>Check vehicle accessibility</strong> at location</p>
            <p>✅ <strong>Arrive 15 minutes early</strong> for setup</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send emails
    const userEmailPromise = resend.emails.send({
      from: 'Quality Auto Care <onboarding@resend.dev>',
      to: bookingData.formData.email,
      subject: `Booking Confirmation #${bookingData.bookingId} - Quality Auto Care`,
      html: userEmailHtml,
    });

    const companyEmailPromise = resend.emails.send({
      from: 'Booking System <onboarding@resend.dev>',
      to: 'hafizshoaibraza190@gmail.com', // Replace with your company email
      subject: `NEW BOOKING: ${bookingData.formData.firstName} ${bookingData.formData.lastName} - ${bookingData.bookingId}`,
      html: companyEmailHtml,
    });

    // Wait for both emails to be sent
    await Promise.all([userEmailPromise, companyEmailPromise]);

    console.log('Emails sent successfully for booking:', bookingData.bookingId);

    return NextResponse.json({ 
      success: true, 
      message: 'Booking confirmed and emails sent successfully',
      bookingId: bookingData.bookingId
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process booking and send emails' },
      { status: 500 }
    );
  }
}