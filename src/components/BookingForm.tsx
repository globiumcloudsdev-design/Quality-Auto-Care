// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { format, isSunday, isBefore, startOfDay } from "date-fns";
// import { CalendarIcon, Check, Plus, Trash2 } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Card, CardContent } from "@/components/ui/card";
// import { motion } from "framer-motion";
// import {
//     serviceTypes,
//     vehicleTypes,
//     timeSlots,
//     promoCodes,
//     mainServices
// } from "@/Data/booking-service";
// import { cityStateMapping } from "@/utils/usStates";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { Label } from "@/components/ui/label";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogDescription,
// } from "@/components/ui/dialog";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Define TypeScript interfaces
// interface ServicePackage {
//     id: string;
//     name: string;
//     price: number | string;
//     description: string;
//     pricingType?: string;
//     includes: string[];
// }

// interface AdditionalService {
//     id: string;
//     name: string;
//     price: number | string;
//     description: string;
// }

// interface ServiceVariant {
//     id: string;
//     name: string;
//     vehicleTypes: string[];
//     packages: ServicePackage[];
//     additionalServices: AdditionalService[];
// }

// interface ServiceType {
//     id: string;
//     name: string;
//     vehicleTypes: string[];
//     packages?: ServicePackage[];
//     variants?: ServiceVariant[];
//     additionalServices?: AdditionalService[];
// }

// interface MainService {
//     id: string;
//     name: string;
//     description: string;
// }

// // Single Vehicle Booking Interface
// interface VehicleBooking {
//     id: string;
//     serviceType: string;
//     variant?: string;
//     package: string;
//     additionalServices: string[];
//     vehicleType: string;
//     vehicleMake: string;
//     vehicleModel: string;
//     vehicleYear: string;
//     vehicleColor: string;
//     vehicleLength?: string;
// }

// // Main Form Data Interface
// interface FormData {
//     vehicleBookings: VehicleBooking[];
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     address: string;
//     city: string;
//     state: string;
//     zip: string;
//     date: string;
//     timeSlot: string;
//     notes: string;
// }

// interface OrderSummaryProps {
//     formData: FormData;
//     totalPrice: number;
//     discountedPrice: number;
//     isPromoValid: boolean;
//     discountPercent: number;
//     bookingId?: string;
// }

// interface ConfirmationModalProps {
//     open: boolean;
//     onClose: () => void;
//     formData: FormData;
//     total: number;
//     bookingId: string;
// }

// // Generate unique booking ID
// const generateBookingId = (): string => {
//     const randomNum = Math.floor(10000 + Math.random() * 90000);
//     return `QAC-${randomNum}`;
// };

// /* ---------------------- PROGRESS BAR ---------------------- */
// const ProgressBar = ({ currentStep }: { currentStep: number }) => {
//     const steps = [
//         { number: 1, label: "Service Selection" },
//         { number: 2, label: "Vehicle Info" },
//         { number: 3, label: "Booking Details" }
//     ];

//     return (
//         <div className="mb-8">
//             <div className="flex justify-between items-center relative">
//                 {/* Progress Line */}
//                 <div
//                     className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0"
//                     style={{
//                         transform: 'translateY(-50%)',
//                         margin: '0 40px'
//                     }}
//                 >
//                     <div
//                         className="h-full theme-button-accent transition-all duration-500 ease-in-out"
//                         style={{
//                             width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
//                         }}
//                     ></div>
//                 </div>

//                 {/* Steps */}
//                 {steps.map((step) => (
//                     <div key={step.number} className="flex flex-col items-center z-10">
//                         <div
//                             className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold transition-all duration-300 ${step.number === currentStep
//                                 ? "theme-button-accent border-[#3182ce] text-white scale-110"
//                                 : step.number < currentStep
//                                     ? "theme-button-accent border-[#3182ce] text-white"
//                                     : "bg-white border-gray-300 text-gray-500"
//                                 }`}
//                         >
//                             {step.number < currentStep ? (
//                                 <Check size={16} />
//                             ) : (
//                                 step.number
//                             )}
//                         </div>
//                         <span
//                             className={`text-xs mt-2 font-medium text-center max-w-[100px] ${step.number === currentStep
//                                 ? "text-[#3182ce] font-bold"
//                                 : step.number < currentStep
//                                     ? "text-[#3182ce]"
//                                     : "text-gray-500"
//                                 }`}
//                         >
//                             {step.label}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // Helper function to get service and package names
// const getServiceName = (serviceTypeId: string): string => {
//     const service = serviceTypes.find(s => s.id === serviceTypeId);
//     return service?.name || "Unknown Service";
// };

// const getPackageName = (serviceTypeId: string, packageId: string, variantId?: string): string => {
//     const service = serviceTypes.find(s => s.id === serviceTypeId);

//     if (service?.variants && variantId) {
//         const variant = service.variants.find(v => v.id === variantId);
//         const pkg = variant?.packages.find(p => p.id === packageId);
//         return pkg?.name || "Unknown Package";
//     } else {
//         const pkg = service?.packages?.find(p => p.id === packageId);
//         return pkg?.name || "Unknown Package";
//     }
// };

// /* ---------------------- ORDER SUMMARY ---------------------- */
// const OrderSummary = ({
//     formData,
//     totalPrice,
//     discountedPrice,
//     isPromoValid,
//     discountPercent,
//     bookingId,
// }: OrderSummaryProps) => {
//     const getServiceTypeDetails = (id: string) =>
//         serviceTypes.find((s) => s.id === id);

//     const getPackageDetails = (serviceTypeId: string, packageId: string, variantId?: string) => {
//         const service = getServiceTypeDetails(serviceTypeId);

//         if (service?.variants && variantId) {
//             const variant = service.variants.find(v => v.id === variantId);
//             return variant?.packages.find((p) => p.id === packageId);
//         } else {
//             return service?.packages?.find((p) => p.id === packageId);
//         }
//     };

//     const isPerFootPricing = (pkg: ServicePackage | undefined): boolean => {
//         return pkg?.pricingType === "perFoot";
//     };

//     const parsePrice = (price: number | string): number => {
//         return typeof price === 'string' ? Number(price) || 0 : price;
//     };

//     return (
//         <Card className="mt-6 border-0 shadow-lg bg-gray-50">
//             <CardContent className="p-6">
//                 <h2 className="text-xl font-bold mb-4 text-center">Order Summary</h2>

//                 {/* Booking ID */}
//                 {bookingId && (
//                     <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                         <div className="flex justify-between items-center">
//                             <span className="font-medium text-blue-800">Booking ID:</span>
//                             <span className="font-bold text-blue-900">{bookingId}</span>
//                         </div>
//                     </div>
//                 )}

//                 {/* Vehicle Bookings */}
//                 <div className="mb-4">
//                     <h3 className="font-medium mb-2">Vehicle Services ({formData.vehicleBookings.length})</h3>
//                     {formData.vehicleBookings.length > 0 ? (
//                         <div className="space-y-4">
//                             {formData.vehicleBookings.map((vehicle, index) => {
//                                 const service = getServiceTypeDetails(vehicle.serviceType);
//                                 const pkg = getPackageDetails(vehicle.serviceType, vehicle.package, vehicle.variant);
//                                 const showLength = isPerFootPricing(pkg) && vehicle.vehicleLength;

//                                 return (
//                                     <div key={vehicle.id} className="border-b pb-3 last:border-b-0">
//                                         <div className="flex justify-between items-start mb-2">
//                                             <div>
//                                                 <span className="font-medium text-gray-700">
//                                                     Vehicle {index + 1}: {vehicle.vehicleYear} {vehicle.vehicleMake} {vehicle.vehicleModel}
//                                                 </span>
//                                                 <div className="text-sm text-gray-600">
//                                                     {service?.name} – {pkg?.name}
//                                                 </div>
//                                                 {showLength && (
//                                                     <div className="text-sm text-gray-500">
//                                                         Length: {vehicle.vehicleLength} ft
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             <span className="text-right font-bold">
//                                                 ${pkg?.price}
//                                                 {showLength && ` × ${vehicle.vehicleLength}ft`}
//                                             </span>
//                                         </div>

//                                         {/* Additional Services for this vehicle */}
//                                         {vehicle.additionalServices.length > 0 && (
//                                             <div className="ml-4 mt-2">
//                                                 <div className="text-sm font-medium text-gray-600">Add-ons:</div>
//                                                 <ul className="text-sm text-gray-500">
//                                                     {vehicle.additionalServices.map((addId, i) => {
//                                                         let addService;
//                                                         const service = getServiceTypeDetails(vehicle.serviceType);
                                                        
//                                                         if (service?.variants && vehicle.variant) {
//                                                             const variant = service.variants.find(v => v.id === vehicle.variant);
//                                                             addService = variant?.additionalServices.find(a => a.id === addId);
//                                                         } else {
//                                                             addService = service?.additionalServices?.find(a => a.id === addId);
//                                                         }

//                                                         return (
//                                                             <li key={i} className="flex justify-between">
//                                                                 <span>{addService?.name}</span>
//                                                                 <span>${addService?.price}</span>
//                                                             </li>
//                                                         );
//                                                     })}
//                                                 </ul>
//                                             </div>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     ) : (
//                         <p className="text-gray-500">No vehicles added</p>
//                     )}
//                 </div>

//                 {/* Pricing */}
//                 <div className="pt-4 border-t">
//                     {isPromoValid && (
//                         <div className="flex justify-between text-green-600 text-sm mb-2">
//                             <span>Discount Applied ({discountPercent}% Off)</span>
//                             <span className="font-bold">
//                                 - ${(totalPrice - discountedPrice).toFixed(2)}
//                             </span>
//                         </div>
//                     )}
//                     <div className="flex justify-between text-lg font-bold">
//                         <span>Total</span>
//                         <span>${discountedPrice.toFixed(2)}</span>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

// /* ---------------------- CONFIRMATION MODAL ---------------------- */
// const ConfirmationModal = ({ open, onClose, formData, total, bookingId }: ConfirmationModalProps) => {
//     const getServiceDisplayName = (vehicle: VehicleBooking) => {
//         return `${getServiceName(vehicle.serviceType)} - ${getPackageName(vehicle.serviceType, vehicle.package, vehicle.variant)}`;
//     };

//     const formatDisplayDate = (dateString: string) => {
//         if (!dateString) return "N/A";
//         try {
//             return new Date(dateString).toLocaleDateString('en-US', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             });
//         } catch {
//             return "Invalid Date";
//         }
//     };

//     return (
//         <Dialog open={open} onOpenChange={(isOpen) => {
//             if (!isOpen) {
//                 onClose();
//             }
//         }}>
//             <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto">
//                 <DialogHeader className="text-center">
//                     <DialogTitle className="text-2xl font-bold text-green-600">
//                         Booking Confirmed 🎉
//                     </DialogTitle>
//                     <DialogDescription className="text-base mt-2">
//                         Thank you <span className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</span>!{" "}
//                         Your booking has been successfully scheduled.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <div className="mt-6 border rounded-lg bg-gray-50 p-4 md:p-6">
//                     <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
//                         Appointment Details
//                     </h3>
//                     <div className="space-y-4">
//                         <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//                             <span className="font-medium text-gray-600">Booking ID:</span>
//                             <span className="text-blue-900 font-bold text-right">
//                                 {bookingId}
//                             </span>
//                         </div>

//                         {/* Vehicle Services */}
//                         <div>
//                             <h4 className="font-medium text-gray-600 mb-2">Vehicle Services:</h4>
//                             <div className="space-y-3">
//                                 {formData.vehicleBookings.map((vehicle, index) => (
//                                     <div key={vehicle.id} className="border rounded-lg p-3 bg-white">
//                                         <div className="font-medium text-gray-900">
//                                             Vehicle {index + 1}: {vehicle.vehicleYear} {vehicle.vehicleMake} {vehicle.vehicleModel}
//                                         </div>
//                                         <div className="text-sm text-gray-700">
//                                             Service: {getServiceDisplayName(vehicle)}
//                                         </div>
//                                         <div className="text-sm text-gray-600">
//                                             Color: {vehicle.vehicleColor}
//                                             {vehicle.vehicleLength && ` • Length: ${vehicle.vehicleLength}ft`}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//                             <span className="font-medium text-gray-600">Date:</span>
//                             <span className="text-gray-900 text-right">
//                                 {formatDisplayDate(formData.date)}
//                             </span>
//                         </div>

//                         <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//                             <span className="font-medium text-gray-600">Time:</span>
//                             <span className="text-gray-900 text-right">
//                                 {formData.timeSlot || "N/A"}
//                             </span>
//                         </div>

//                         <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//                             <span className="font-medium text-gray-600">Customer:</span>
//                             <span className="text-gray-900 text-right">
//                                 {formData.firstName} {formData.lastName}
//                             </span>
//                         </div>

//                         <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//                             <span className="font-medium text-gray-600">Contact:</span>
//                             <span className="text-gray-900 text-right">
//                                 {formData.phone} | {formData.email}
//                             </span>
//                         </div>

//                         <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//                             <span className="font-medium text-gray-600">Address:</span>
//                             <span className="text-gray-900 text-right max-w-[200px] md:max-w-none">
//                                 {formData.address}, {formData.city}, {formData.state} {formData.zip}
//                             </span>
//                         </div>

//                         {formData.notes && (
//                             <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//                                 <span className="font-medium text-gray-600">Notes:</span>
//                                 <span className="text-gray-900 text-right max-w-[200px] md:max-w-none">
//                                     {formData.notes}
//                                 </span>
//                             </div>
//                         )}

//                         <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-t pt-3 mt-2">
//                             <span className="font-medium text-gray-600 text-lg">Total Amount:</span>
//                             <span className="font-bold text-green-600 text-lg">
//                                 ${total.toFixed(2)}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-6 flex flex-col sm:flex-row gap-3">
//                     <Button
//                         onClick={onClose}
//                         className="theme-button-accent flex-1"
//                     >
//                         Close & Book Another Service
//                     </Button>
//                     <Button
//                         onClick={() => window.print()}
//                         variant="outline"
//                         className="flex-1"
//                     >
//                         Print Receipt
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// // Phone number formatting function with +1
// const formatPhoneNumber = (value: string): string => {
//     const cleaned = value.replace(/[^\d+]/g, '');

//     let withCountryCode = cleaned;
//     if (!cleaned.startsWith('+1')) {
//         const withoutCountryCode = cleaned.replace(/^\+1/, '');
//         const digits = withoutCountryCode.replace(/\D/g, '').slice(0, 10);
//         withCountryCode = '+1' + digits;
//     } else {
//         const digits = cleaned.slice(2).replace(/\D/g, '').slice(0, 10);
//         withCountryCode = '+1' + digits;
//     }

//     const digitsOnly = withCountryCode.slice(2);
//     if (digitsOnly.length <= 3) {
//         return withCountryCode;
//     } else if (digitsOnly.length <= 6) {
//         return `+1 (${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
//     } else {
//         return `+1 (${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
//     }
// };

// /* ---------------------- VEHICLE BOOKING CARD ---------------------- */
// interface VehicleBookingCardProps {
//     vehicle: VehicleBooking;
//     index: number;
//     onUpdate: (vehicle: VehicleBooking) => void;
//     onRemove: () => void;
//     isLast: boolean;
// }

// const VehicleBookingCard = ({ vehicle, index, onUpdate, onRemove, isLast }: VehicleBookingCardProps) => {
//     const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);
//     const [selectedVariant, setSelectedVariant] = useState<ServiceVariant | null>(null);

//     // Initialize service type and variant
//     useEffect(() => {
//         if (vehicle.serviceType) {
//             const service = serviceTypes.find(s => s.id === vehicle.serviceType);
//             setSelectedServiceType(service || null);
            
//             if (vehicle.variant && service?.variants) {
//                 const variant = service.variants.find(v => v.id === vehicle.variant);
//                 setSelectedVariant(variant || null);
//             }
//         }
//     }, [vehicle.serviceType, vehicle.variant]);

//     const handleServiceTypeSelect = (serviceTypeId: string) => {
//         const service = serviceTypes.find(s => s.id === serviceTypeId);
//         setSelectedServiceType(service || null);
//         setSelectedVariant(null);
        
//         onUpdate({
//             ...vehicle,
//             serviceType: serviceTypeId,
//             mainService: serviceTypeId, // ✅ Add this line
//             variant: undefined,
//             package: "",
//             additionalServices: [],
//             vehicleType: service?.vehicleTypes[0] || ""
//         });
//     };

//     const handleVariantSelect = (variantId: string) => {
//         if (!selectedServiceType?.variants) return;

//         const variant = selectedServiceType.variants.find(v => v.id === variantId);
//         setSelectedVariant(variant || null);
        
//         onUpdate({
//             ...vehicle,
//             variant: variantId,
//             mainService: selectedServiceType.id, // ✅ Add this line
//             package: "",
//             additionalServices: [],
//             vehicleType: variant?.vehicleTypes[0] || ""
//         });
//     };


//     const handlePackageSelect = (packageId: string) => {
//         onUpdate({
//             ...vehicle,
//             package: packageId
//         });
//     };

//     const handleAdditionalServiceChange = (serviceId: string) => {
//         const updatedServices = vehicle.additionalServices.includes(serviceId)
//             ? vehicle.additionalServices.filter(id => id !== serviceId)
//             : [...vehicle.additionalServices, serviceId];
        
//         onUpdate({
//             ...vehicle,
//             additionalServices: updatedServices
//         });
//     };

//     const handleVehicleInfoChange = (field: string, value: string) => {
//         onUpdate({
//             ...vehicle,
//             [field]: value
//         });
//     };

//     // Get packages and additional services based on selection
//     const getPackagesToDisplay = () => {
//         if (selectedServiceType?.variants && selectedVariant) {
//             return selectedVariant.packages;
//         } else if (selectedServiceType?.packages) {
//             return selectedServiceType.packages;
//         }
//         return [];
//     };

//     const getAdditionalServicesToDisplay = () => {
//         if (selectedServiceType?.variants && selectedVariant) {
//             return selectedVariant.additionalServices;
//         } else if (selectedServiceType?.additionalServices) {
//             return selectedServiceType.additionalServices;
//         }
//         return [];
//     };

//     return (
//         <Card className="border-2 border-gray-200 bg-white">
//             <CardContent className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold text-gray-900">
//                         Vehicle {index + 1}
//                     </h3>
//                     {!isLast && (
//                         <Button
//                             type="button"
//                             onClick={onRemove}
//                             variant="outline"
//                             size="sm"
//                             className="text-red-600 border-red-200 hover:bg-red-50"
//                         >
//                             <Trash2 size={16} className="mr-1" />
//                             Remove
//                         </Button>
//                     )}
//                 </div>

//                 {/* Service Selection */}
//                 <div className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-2">
//                             Service Type
//                         </label>
//                         <Select
//                             value={vehicle.serviceType}
//                             onValueChange={handleServiceTypeSelect}
//                         >
//                             <SelectTrigger className="w-full bg-white">
//                                 <SelectValue placeholder="Select a service type" />
//                             </SelectTrigger>
//                             <SelectContent className="bg-white">
//                                 {serviceTypes.map((s) => (
//                                     <SelectItem key={s.id} value={s.id}>
//                                         {s.name}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     {/* Variant Selection */}
//                     {selectedServiceType?.variants && (
//                         <div>
//                             <label className="block text-sm font-medium mb-2">
//                                 Vehicle Type
//                             </label>
//                             <Select
//                                 value={vehicle.variant || ""}
//                                 onValueChange={handleVariantSelect}
//                             >
//                                 <SelectTrigger className="w-full bg-white">
//                                     <SelectValue placeholder="Select vehicle type" />
//                                 </SelectTrigger>
//                                 <SelectContent className="bg-white">
//                                     {selectedServiceType.variants.map((variant) => (
//                                         <SelectItem key={variant.id} value={variant.id}>
//                                             {variant.name}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     )}

//                     {/* Package Selection */}
//                     {selectedServiceType && (
//                         <div>
//                             <label className="block text-sm font-medium mb-2">
//                                 Select Package
//                             </label>
//                             <div className="grid md:grid-cols-2 gap-3">
//                                 {getPackagesToDisplay().map((pkg) => {
//                                     const isSelected = vehicle.package === pkg.id;
//                                     return (
//                                         <div
//                                             key={pkg.id}
//                                             onClick={() => handlePackageSelect(pkg.id)}
//                                             className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
//                                                 isSelected
//                                                     ? "border-blue-500 bg-blue-50 shadow-md"
//                                                     : "border-gray-300 hover:border-blue-300 hover:shadow-sm"
//                                             }`}
//                                         >
//                                             <div className="flex justify-between items-start mb-1">
//                                                 <span className="font-medium text-gray-900 text-sm">{pkg.name}</span>
//                                                 <span className="font-bold text-blue-600 text-sm">
//                                                     ${pkg.price}
//                                                     {pkg.pricingType === "perFoot" && "/ft"}
//                                                 </span>
//                                             </div>
//                                             <p className="text-xs text-gray-600">{pkg.description}</p>
//                                             {isSelected && (
//                                                 <div className="mt-1 text-blue-600 flex items-center text-xs">
//                                                     <Check size={14} className="mr-1" /> Selected
//                                                 </div>
//                                             )}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     )}

//                     {/* Vehicle Information */}
//                     {vehicle.serviceType && (
//                         <>
//                             <div className="grid md:grid-cols-2 gap-3">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Make</label>
//                                     <Input
//                                         value={vehicle.vehicleMake}
//                                         onChange={(e) => handleVehicleInfoChange("vehicleMake", e.target.value)}
//                                         placeholder="e.g., Toyota"
//                                         className="bg-white text-sm"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Model</label>
//                                     <Input
//                                         value={vehicle.vehicleModel}
//                                         onChange={(e) => handleVehicleInfoChange("vehicleModel", e.target.value)}
//                                         placeholder="e.g., Camry"
//                                         className="bg-white text-sm"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-3">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Year</label>
//                                     <Input
//                                         value={vehicle.vehicleYear}
//                                         onChange={(e) => handleVehicleInfoChange("vehicleYear", e.target.value)}
//                                         placeholder="e.g., 2023"
//                                         className="bg-white text-sm"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Color</label>
//                                     <Input
//                                         value={vehicle.vehicleColor}
//                                         onChange={(e) => handleVehicleInfoChange("vehicleColor", e.target.value)}
//                                         placeholder="e.g., Red"
//                                         className="bg-white text-sm"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Vehicle Length for boats/RVs */}
//                             {(vehicle.vehicleType === 'boat' || vehicle.vehicleType === 'rv' || vehicle.vehicleType === 'jet-ski') && (
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">
//                                         Vehicle Length (feet)
//                                     </label>
//                                     <Input
//                                         value={vehicle.vehicleLength || ""}
//                                         onChange={(e) => handleVehicleInfoChange("vehicleLength", e.target.value)}
//                                         placeholder="e.g., 24"
//                                         type="number"
//                                         className="bg-white text-sm"
//                                     />
//                                 </div>
//                             )}

//                             {/* Additional Services */}
//                             {vehicle.package && getAdditionalServicesToDisplay().length > 0 && (
//                                 <div>
//                                     <label className="block text-sm font-medium mb-2">
//                                         Add-on Services
//                                     </label>
//                                     <div className="grid md:grid-cols-2 gap-2">
//                                         {getAdditionalServicesToDisplay().map((svc) => (
//                                             <div key={svc.id} className="flex items-start space-x-2 p-2 border rounded-lg">
//                                                 <Checkbox
//                                                     id={`${vehicle.id}-${svc.id}`}
//                                                     checked={vehicle.additionalServices.includes(svc.id)}
//                                                     onCheckedChange={() => handleAdditionalServiceChange(svc.id)}
//                                                     className="mt-0.5"
//                                                 />
//                                                 <div className="flex-1">
//                                                     <Label htmlFor={`${vehicle.id}-${svc.id}`} className="text-xs font-medium text-gray-900">
//                                                         {svc.name}
//                                                     </Label>
//                                                     <p className="text-xs text-gray-600">{svc.description}</p>
//                                                     <p className="text-xs font-semibold text-blue-600 mt-0.5">${svc.price}</p>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

// /* ---------------------- MAIN BOOKING ---------------------- */
// const Booking = () => {
//     const [step, setStep] = useState(1);
//     const [date, setDate] = useState<Date | undefined>();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [promoCode, setPromoCode] = useState("");
//     const [isPromoValid, setIsPromoValid] = useState(false);
//     const [discountPercent, setDiscountPercent] = useState(0);
//     const [openCalendar, setOpenCalendar] = useState(false);
//     const [showConfirmation, setShowConfirmation] = useState(false);
//     const [bookingId, setBookingId] = useState("");
//     const [isManualState, setIsManualState] = useState(false);

//     const [formData, setFormData] = useState<FormData>({
//         vehicleBookings: [{
//             id: `vehicle-${Date.now()}`,
//             serviceType: "",
//             variant: undefined,
//             package: "",
//             additionalServices: [],
//             vehicleType: "",
//             vehicleMake: "",
//             vehicleModel: "",
//             vehicleYear: "",
//             vehicleColor: "",
//             vehicleLength: ""
//         }],
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         address: "",
//         city: "",
//         state: "",
//         zip: "",
//         date: "",
//         timeSlot: "",
//         notes: "",
//     });

//     // Disable past dates and Sundays
//     const isDateDisabled = (date: Date) => {
//         const today = startOfDay(new Date());
//         return isBefore(date, today) || isSunday(date);
//     };

//     // Reset form function
//     const resetForm = () => {
//         setFormData({
//             vehicleBookings: [{
//                 id: `vehicle-${Date.now()}`,
//                 serviceType: "",
//                 variant: undefined,
//                 package: "",
//                 additionalServices: [],
//                 vehicleType: "",
//                 vehicleMake: "",
//                 vehicleModel: "",
//                 vehicleYear: "",
//                 vehicleColor: "",
//                 vehicleLength: ""
//             }],
//             firstName: "",
//             lastName: "",
//             email: "",
//             phone: "",
//             address: "",
//             city: "",
//             state: "",
//             zip: "",
//             date: "",
//             timeSlot: "",
//             notes: "",
//         });
//         setDate(undefined);
//         setPromoCode("");
//         setIsPromoValid(false);
//         setDiscountPercent(0);
//         setStep(1);
//         setBookingId("");
//         setIsManualState(false);
//     };

//     // Automatically set state when city is entered (only if not in manual mode)
//     useEffect(() => {
//         if (formData.city.trim() && !isManualState) {
//             const detectedState = cityStateMapping(formData.city);
//             if (detectedState && detectedState !== formData.state) {
//                 updateForm({ state: detectedState });
//             }
//         }
//     }, [formData.city, formData.state, isManualState]);

//     // Validation
//     const isStep1Valid = formData.vehicleBookings.length > 0 && 
//         formData.vehicleBookings.every(vehicle => 
//             vehicle.serviceType && vehicle.package && vehicle.vehicleMake && vehicle.vehicleModel
//         );

//     const isStep2Valid = formData.vehicleBookings.length > 0;

//     const isStep3Valid =
//         formData.firstName &&
//         formData.email &&
//         formData.phone &&
//         formData.address &&
//         formData.city &&
//         formData.state &&
//         formData.zip &&
//         formData.date &&
//         formData.timeSlot;

//     // Pricing calculation
//     const parsePrice = (price: number | string) => typeof price === 'string' ? Number(price) || 0 : price;

//     const calculateTotalPrice = () => {
//         let total = 0;

//         formData.vehicleBookings.forEach((vehicle) => {
//             let pkg;

//             // Find the package price
//             const service = serviceTypes.find(s => s.id === vehicle.serviceType);
//             if (service?.variants && vehicle.variant) {
//                 const variant = service.variants.find(v => v.id === vehicle.variant);
//                 pkg = variant?.packages.find(p => p.id === vehicle.package);
//             } else {
//                 pkg = service?.packages?.find(p => p.id === vehicle.package);
//             }

//             // Add package price
//             if (pkg) {
//                 let packagePrice = parsePrice(pkg.price);
//                 const pricingType = pkg.pricingType || "fixed";

//                 if (pricingType === "perFoot" && vehicle.vehicleLength) {
//                     packagePrice *= parseFloat(vehicle.vehicleLength);
//                 }
//                 total += packagePrice;
//             }

//             // Add additional services prices
//             if (service?.variants && vehicle.variant) {
//                 const variant = service.variants.find(v => v.id === vehicle.variant);
//                 vehicle.additionalServices.forEach((addId) => {
//                     const addService = variant?.additionalServices.find((a) => a.id === addId);
//                     if (addService) total += parsePrice(addService.price);
//                 });
//             } else if (service?.additionalServices) {
//                 vehicle.additionalServices.forEach((addId) => {
//                     const addService = service.additionalServices?.find((a) => a.id === addId);
//                     if (addService) total += parsePrice(addService.price);
//                 });
//             }
//         });

//         return total;
//     };

//     const totalPrice = calculateTotalPrice();
//     const discountedPrice = isPromoValid
//         ? totalPrice * (1 - discountPercent / 100)
//         : totalPrice;

//     // Helpers
//     const updateForm = (updates: Partial<FormData>) =>
//         setFormData((prev) => ({ ...prev, ...updates }));

//     const handleInputChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         const { name, value } = e.target;

//         if (name === 'phone') {
//             const formatted = formatPhoneNumber(value);
//             updateForm({ [name]: formatted } as Partial<FormData>);
//         }
//         else if (name === 'zip') {
//             const cleaned = value.replace(/\D/g, '').slice(0, 5);
//             updateForm({ [name]: cleaned } as Partial<FormData>);
//         }
//         else if (name === 'state') {
//             setIsManualState(true);
//             updateForm({ [name]: value } as Partial<FormData>);
//         }
//         else if (name === 'city') {
//             updateForm({ [name]: value } as Partial<FormData>);
//             if (!value.trim() && !isManualState) {
//                 updateForm({ state: "" });
//             }
//         }
//         else {
//             updateForm({ [name]: value } as Partial<FormData>);
//         }
//     };

//     // Vehicle booking management
//     const addVehicleBooking = () => {
//         const newVehicle: VehicleBooking = {
//             id: `vehicle-${Date.now()}`,
//             serviceType: "",
//             variant: undefined,
//             package: "",
//             additionalServices: [],
//             vehicleType: "",
//             vehicleMake: "",
//             vehicleModel: "",
//             vehicleYear: "",
//             vehicleColor: "",
//             vehicleLength: ""
//         };

//         setFormData(prev => ({
//             ...prev,
//             vehicleBookings: [...prev.vehicleBookings, newVehicle]
//         }));
//     };

//     const updateVehicleBooking = (index: number, updatedVehicle: VehicleBooking) => {
//         setFormData(prev => ({
//             ...prev,
//             vehicleBookings: prev.vehicleBookings.map((vehicle, i) => 
//                 i === index ? updatedVehicle : vehicle
//             )
//         }));
//     };

//     const removeVehicleBooking = (index: number) => {
//         setFormData(prev => ({
//             ...prev,
//             vehicleBookings: prev.vehicleBookings.filter((_, i) => i !== index)
//         }));
//     };

//     const handleDateChange = (date: Date | undefined) => {
//         setDate(date);
//         updateForm({ date: date ? date.toISOString() : "" });
//     };

//     const handleApplyPromo = () => {
//         const cleanedPromoCode = promoCode.replace(/\s/g, '');
//         setPromoCode(cleanedPromoCode);

//         const promo = promoCodes.find(
//             (p) => p.code.toUpperCase() === cleanedPromoCode.toUpperCase()
//         );

//         if (promo) {
//             setIsPromoValid(true);
//             setDiscountPercent(promo.discount);
//             toast.success(`Promo Applied! You got ${promo.discount}% off!`);
//         } else {
//             setIsPromoValid(false);
//             setDiscountPercent(0);
//             toast.error("Invalid Promo Code");
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!isStep3Valid) {
//             toast.error("Please complete all required fields.");
//             return;
//         }

//         if (date && isDateDisabled(date)) {
//             toast.error("Please select a valid future date (Sundays are closed)");
//             return;
//         }

//         const newBookingId = generateBookingId();
//         setBookingId(newBookingId);

//         setIsSubmitting(true);
//         try {
//             let finalPhone = formData.phone;
//             if (!formData.phone.startsWith('+1')) {
//                 const digits = formData.phone.replace(/\D/g, '').slice(0, 10);
//                 finalPhone = '+1' + digits;
//             }

//             // Prepare data for API submission
//             const submissionData = {
//                 bookingId: newBookingId,
//                 webName: "Quality Auto Care Detailing", // Hardcoded as requested
//                 formData: {
//                     ...formData,
//                     phone: finalPhone,
//                 },
//                 totalPrice: totalPrice,
//                 discountedPrice: discountedPrice,
//                 discountApplied: isPromoValid,
//                 discountPercent: discountPercent,
//                 promoCode: isPromoValid ? promoCode : null,
//                 submittedAt: new Date().toISOString(),
//                 vehicleCount: formData.vehicleBookings.length,
//                 status: "pending"
//             };

//             console.log("Booking Submission Data:", submissionData);

//             // API Call
//             const response = await fetch('https://car-detailling-dashboard.vercel.app/api/booking', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(submissionData),
//             });

//             const result = await response.json();

//             if (result.success) {
//                 setShowConfirmation(true);
//                 toast.success("Booking Successful! Confirmation emails sent.");
//             } else {
//                 throw new Error(result.message || 'Failed to submit booking');
//             }

//         } catch (error) {
//             console.error('Booking submission error:', error);
//             toast.error("Submission Error. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const fadeIn = {
//         hidden: { opacity: 0, y: 10 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     };

//     return (
//         <div className="min-h-screen text-gray-800 bg-gray-50">
//             <div className="pt-4 pb-16 flex justify-center">
//                 <div className="w-full max-w-6xl px-4">
//                     {/* Progress Bar */}
//                     <ProgressBar currentStep={step} />

//                     <Card className="border-0 shadow-xl rounded-xl bg-white">
//                         <CardContent className="p-6 md:p-8">
//                             <form onSubmit={handleSubmit} className="space-y-6">
//                                 {/* STEP 1 - Vehicle Services */}
//                                 {step === 1 && (
//                                     <motion.div
//                                         initial="hidden"
//                                         animate="visible"
//                                         variants={fadeIn}
//                                         className="space-y-6"
//                                     >
//                                         <div className="flex justify-between items-center">
//                                             <h2 className="text-xl font-bold text-gray-900">
//                                                 Vehicle Services
//                                             </h2>
//                                             <Button
//                                                 type="button"
//                                                 onClick={addVehicleBooking}
//                                                 className="theme-button-accent"
//                                             >
//                                                 <Plus size={16} className="mr-1" />
//                                                 Add Another Vehicle
//                                             </Button>
//                                         </div>

//                                         <p className="text-gray-600">
//                                             Add one or more vehicles to book services. Each vehicle can have different services and packages.
//                                         </p>

//                                         {/* Vehicle Booking Cards */}
//                                         <div className="space-y-6">
//                                             {formData.vehicleBookings.map((vehicle, index) => (
//                                                 <VehicleBookingCard
//                                                     key={vehicle.id}
//                                                     vehicle={vehicle}
//                                                     index={index}
//                                                     onUpdate={(updatedVehicle) => updateVehicleBooking(index, updatedVehicle)}
//                                                     onRemove={() => removeVehicleBooking(index)}
//                                                     isLast={formData.vehicleBookings.length === 1}
//                                                 />
//                                             ))}
//                                         </div>

//                                         <div className="flex justify-end pt-4">
//                                             <Button
//                                                 type="button"
//                                                 onClick={() => setStep(2)}
//                                                 disabled={!isStep1Valid}
//                                                 className={`theme-button-accent ${!isStep1Valid && "opacity-50 cursor-not-allowed"}`}
//                                             >
//                                                 Next Step
//                                             </Button>
//                                         </div>
//                                     </motion.div>
//                                 )}

//                                 {/* STEP 2 - Customer Information */}
//                                 {step === 2 && (
//                                     <motion.div
//                                         initial="hidden"
//                                         animate="visible"
//                                         variants={fadeIn}
//                                         className="space-y-6"
//                                     >
//                                         <h2 className="text-xl font-bold text-gray-900">
//                                             Customer Information
//                                         </h2>

//                                         <div className="grid md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium mb-2">First Name</label>
//                                                 <Input
//                                                     name="firstName"
//                                                     value={formData.firstName}
//                                                     onChange={handleInputChange}
//                                                     placeholder="First Name"
//                                                     className="bg-white w-full"
//                                                     required
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium mb-2">Last Name</label>
//                                                 <Input
//                                                     name="lastName"
//                                                     value={formData.lastName}
//                                                     onChange={handleInputChange}
//                                                     placeholder="Last Name"
//                                                     className="bg-white w-full"
//                                                     required
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div className="grid md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium mb-2">Email</label>
//                                                 <Input
//                                                     name="email"
//                                                     type="email"
//                                                     value={formData.email}
//                                                     onChange={handleInputChange}
//                                                     placeholder="Email"
//                                                     className="bg-white w-full"
//                                                     required
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium mb-2">Phone</label>
//                                                 <Input
//                                                     name="phone"
//                                                     value={formData.phone}
//                                                     onChange={handleInputChange}
//                                                     placeholder="(555) 123-4567"
//                                                     className="bg-white w-full"
//                                                     required
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-medium mb-2">Address</label>
//                                             <Input
//                                                 name="address"
//                                                 value={formData.address}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Address"
//                                                 className="bg-white w-full"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="grid md:grid-cols-3 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium mb-2">City</label>
//                                                 <Input
//                                                     name="city"
//                                                     value={formData.city}
//                                                     onChange={handleInputChange}
//                                                     placeholder="City"
//                                                     className="bg-white w-full"
//                                                     required
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium mb-2">State</label>
//                                                 <Input
//                                                     name="state"
//                                                     value={formData.state}
//                                                     onChange={handleInputChange}
//                                                     placeholder="State"
//                                                     className="bg-white w-full"
//                                                     required
//                                                 />
//                                                 {!isManualState && formData.city && (
//                                                     <p className="text-xs text-gray-500 mt-1">
//                                                         Auto-detected from city
//                                                     </p>
//                                                 )}
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium mb-2">ZIP Code</label>
//                                                 <Input
//                                                     name="zip"
//                                                     value={formData.zip}
//                                                     onChange={handleInputChange}
//                                                     placeholder="12345"
//                                                     maxLength={5}
//                                                     className="bg-white w-full"
//                                                     required
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div className="flex justify-between pt-4">
//                                             <Button
//                                                 type="button"
//                                                 onClick={() => setStep(1)}
//                                                 className="theme-button-secondary"
//                                             >
//                                                 Back
//                                             </Button>
//                                             <Button
//                                                 type="button"
//                                                 onClick={() => setStep(3)}
//                                                 disabled={!isStep2Valid}
//                                                 className={`theme-button-accent ${!isStep2Valid && "opacity-50 cursor-not-allowed"}`}
//                                             >
//                                                 Next Step
//                                             </Button>
//                                         </div>
//                                     </motion.div>
//                                 )}

//                                 {/* STEP 3 - Booking Details */}
//                                 {step === 3 && (
//                                     <motion.div
//                                         initial="hidden"
//                                         animate="visible"
//                                         variants={fadeIn}
//                                         className="space-y-6"
//                                     >
//                                         <h2 className="text-xl font-bold text-gray-900">
//                                             Booking Details
//                                         </h2>

//                                         <div className="grid md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium mb-2">Date</label>
//                                                 <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
//                                                     <PopoverTrigger asChild>
//                                                         <Button
//                                                             variant="outline"
//                                                             className={cn(
//                                                                 "justify-start text-left font-normal bg-white w-full",
//                                                                 !date && "text-muted-foreground"
//                                                             )}
//                                                         >
//                                                             <CalendarIcon className="mr-2 h-4 w-4" />
//                                                             {date ? format(date, "PPP") : "Select a date"}
//                                                         </Button>
//                                                     </PopoverTrigger>
//                                                     <PopoverContent className="w-auto p-0 bg-white">
//                                                         <Calendar
//                                                             mode="single"
//                                                             selected={date}
//                                                             onSelect={handleDateChange}
//                                                             initialFocus
//                                                             disabled={isDateDisabled}
//                                                             fromDate={new Date()}
//                                                         />
//                                                     </PopoverContent>
//                                                 </Popover>
//                                                 <p className="text-xs text-gray-500 mt-1">
//                                                     * Past dates and Sundays are not available
//                                                 </p>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium mb-2">Time Slot</label>
//                                                 <Select
//                                                     value={formData.timeSlot}
//                                                     onValueChange={(val) => updateForm({ timeSlot: val })}
//                                                 >
//                                                     <SelectTrigger className="bg-white w-full">
//                                                         <SelectValue placeholder="Select time slot" />
//                                                     </SelectTrigger>
//                                                     <SelectContent className="bg-white">
//                                                         {timeSlots.map((slot, idx) => (
//                                                             <SelectItem key={idx} value={slot}>
//                                                                 {slot}
//                                                             </SelectItem>
//                                                         ))}
//                                                     </SelectContent>
//                                                 </Select>
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-medium mb-2">Additional Notes</label>
//                                             <Textarea
//                                                 name="notes"
//                                                 value={formData.notes}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Any special instructions or notes..."
//                                                 className="bg-white w-full min-h-[100px]"
//                                             />
//                                         </div>

//                                         <div className="flex gap-2">
//                                             <Input
//                                                 value={promoCode}
//                                                 onChange={(e) => setPromoCode(e.target.value)}
//                                                 placeholder="Promo Code"
//                                                 className="bg-white flex-1"
//                                             />
//                                             {promoCode.trim() && (
//                                                 <Button
//                                                     type="button"
//                                                     onClick={handleApplyPromo}
//                                                     className="theme-button-accent whitespace-nowrap"
//                                                 >
//                                                     Apply
//                                                 </Button>
//                                             )}
//                                         </div>

//                                         {/* Order Summary */}
//                                         <OrderSummary
//                                             formData={formData}
//                                             totalPrice={totalPrice}
//                                             discountedPrice={discountedPrice}
//                                             isPromoValid={isPromoValid}
//                                             discountPercent={discountPercent}
//                                             bookingId={bookingId}
//                                         />

//                                         {/* Submit */}
//                                         <div className="flex justify-between mt-6">
//                                             <Button
//                                                 type="button"
//                                                 onClick={() => setStep(2)}
//                                                 className="theme-button-secondary"
//                                             >
//                                                 Back
//                                             </Button>
//                                             <Button
//                                                 type="submit"
//                                                 disabled={!isStep3Valid || isSubmitting}
//                                                 className={`theme-button-accent ${(!isStep3Valid || isSubmitting) &&
//                                                     "opacity-50 cursor-not-allowed"
//                                                     }`}
//                                             >
//                                                 {isSubmitting ? "Submitting..." : "Submit Booking"}
//                                             </Button>
//                                         </div>
//                                     </motion.div>
//                                 )}
//                             </form>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>

//             {/* Confirmation Modal */}
//             <ConfirmationModal
//                 open={showConfirmation}
//                 onClose={() => {
//                     setShowConfirmation(false);
//                     resetForm();
//                 }}
//                 formData={formData}
//                 total={discountedPrice}
//                 bookingId={bookingId}
//             />
//         </div>
//     );
// };

// export default Booking;









"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format, isSunday, isBefore, startOfDay } from "date-fns";
import { CalendarIcon, Check, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    serviceTypes,
    vehicleTypes,
    timeSlots,
    promoCodes,
    mainServices
} from "@/Data/booking-service";
import { cityStateMapping } from "@/utils/usStates";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define TypeScript interfaces
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
    description: string;
}

// Single Vehicle Booking Interface - UPDATED
interface VehicleBooking {
    id: string;
    serviceType: string;
    variant?: string;
    mainService: string; // ✅ ADDED mainService field
    package: string;
    additionalServices: string[];
    vehicleType: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: string;
    vehicleColor: string;
    vehicleLength?: string;
}

// Main Form Data Interface
interface FormData {
    vehicleBookings: VehicleBooking[];
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

interface OrderSummaryProps {
    formData: FormData;
    totalPrice: number;
    discountedPrice: number;
    isPromoValid: boolean;
    discountPercent: number;
    bookingId?: string;
}

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    formData: FormData;
    total: number;
    bookingId: string;
}

// Generate unique booking ID
const generateBookingId = (): string => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `QAC-${randomNum}`;
};

/* ---------------------- PROGRESS BAR ---------------------- */
const ProgressBar = ({ currentStep }: { currentStep: number }) => {
    const steps = [
        { number: 1, label: "Service Selection" },
        { number: 2, label: "Vehicle Info" },
        { number: 3, label: "Booking Details" }
    ];

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center relative">
                {/* Progress Line */}
                <div
                    className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0"
                    style={{
                        transform: 'translateY(-50%)',
                        margin: '0 40px'
                    }}
                >
                    <div
                        className="h-full theme-button-accent transition-all duration-500 ease-in-out"
                        style={{
                            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
                        }}
                    ></div>
                </div>

                {/* Steps */}
                {steps.map((step) => (
                    <div key={step.number} className="flex flex-col items-center z-10">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold transition-all duration-300 ${step.number === currentStep
                                ? "theme-button-accent border-[#3182ce] text-white scale-110"
                                : step.number < currentStep
                                    ? "theme-button-accent border-[#3182ce] text-white"
                                    : "bg-white border-gray-300 text-gray-500"
                                }`}
                        >
                            {step.number < currentStep ? (
                                <Check size={16} />
                            ) : (
                                step.number
                            )}
                        </div>
                        <span
                            className={`text-xs mt-2 font-medium text-center max-w-[100px] ${step.number === currentStep
                                ? "text-[#3182ce] font-bold"
                                : step.number < currentStep
                                    ? "text-[#3182ce]"
                                    : "text-gray-500"
                                }`}
                        >
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper function to get service and package names
const getServiceName = (serviceTypeId: string): string => {
    const service = serviceTypes.find(s => s.id === serviceTypeId);
    return service?.name || "Unknown Service";
};

const getPackageName = (serviceTypeId: string, packageId: string, variantId?: string): string => {
    const service = serviceTypes.find(s => s.id === serviceTypeId);

    if (service?.variants && variantId) {
        const variant = service.variants.find(v => v.id === variantId);
        const pkg = variant?.packages.find(p => p.id === packageId);
        return pkg?.name || "Unknown Package";
    } else {
        const pkg = service?.packages?.find(p => p.id === packageId);
        return pkg?.name || "Unknown Package";
    }
};

/* ---------------------- ORDER SUMMARY ---------------------- */
const OrderSummary = ({
    formData,
    totalPrice,
    discountedPrice,
    isPromoValid,
    discountPercent,
    bookingId,
}: OrderSummaryProps) => {
    const getServiceTypeDetails = (id: string) =>
        serviceTypes.find((s) => s.id === id);

    const getPackageDetails = (serviceTypeId: string, packageId: string, variantId?: string) => {
        const service = getServiceTypeDetails(serviceTypeId);

        if (service?.variants && variantId) {
            const variant = service.variants.find(v => v.id === variantId);
            return variant?.packages.find((p) => p.id === packageId);
        } else {
            return service?.packages?.find((p) => p.id === packageId);
        }
    };

    const isPerFootPricing = (pkg: ServicePackage | undefined): boolean => {
        return pkg?.pricingType === "perFoot";
    };

    const parsePrice = (price: number | string): number => {
        return typeof price === 'string' ? Number(price) || 0 : price;
    };

    return (
        <Card className="mt-6 border-0 shadow-lg bg-gray-50">
            <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 text-center">Order Summary</h2>

                {/* Booking ID */}
                {bookingId && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-blue-800">Booking ID:</span>
                            <span className="font-bold text-blue-900">{bookingId}</span>
                        </div>
                    </div>
                )}

                {/* Vehicle Bookings */}
                <div className="mb-4">
                    <h3 className="font-medium mb-2">Vehicle Services ({formData.vehicleBookings.length})</h3>
                    {formData.vehicleBookings.length > 0 ? (
                        <div className="space-y-4">
                            {formData.vehicleBookings.map((vehicle, index) => {
                                const service = getServiceTypeDetails(vehicle.serviceType);
                                const pkg = getPackageDetails(vehicle.serviceType, vehicle.package, vehicle.variant);
                                const showLength = isPerFootPricing(pkg) && vehicle.vehicleLength;

                                return (
                                    <div key={vehicle.id} className="border-b pb-3 last:border-b-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="font-medium text-gray-700">
                                                    Vehicle {index + 1}: {vehicle.vehicleYear} {vehicle.vehicleMake} {vehicle.vehicleModel}
                                                </span>
                                                <div className="text-sm text-gray-600">
                                                    {service?.name} – {pkg?.name}
                                                </div>
                                                {showLength && (
                                                    <div className="text-sm text-gray-500">
                                                        Length: {vehicle.vehicleLength} ft
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-right font-bold">
                                                ${pkg?.price}
                                                {showLength && ` × ${vehicle.vehicleLength}ft`}
                                            </span>
                                        </div>

                                        {/* Additional Services for this vehicle */}
                                        {vehicle.additionalServices.length > 0 && (
                                            <div className="ml-4 mt-2">
                                                <div className="text-sm font-medium text-gray-600">Add-ons:</div>
                                                <ul className="text-sm text-gray-500">
                                                    {vehicle.additionalServices.map((addId, i) => {
                                                        let addService;
                                                        const service = getServiceTypeDetails(vehicle.serviceType);
                                                        
                                                        if (service?.variants && vehicle.variant) {
                                                            const variant = service.variants.find(v => v.id === vehicle.variant);
                                                            addService = variant?.additionalServices.find(a => a.id === addId);
                                                        } else {
                                                            addService = service?.additionalServices?.find(a => a.id === addId);
                                                        }

                                                        return (
                                                            <li key={i} className="flex justify-between">
                                                                <span>{addService?.name}</span>
                                                                <span>${addService?.price}</span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500">No vehicles added</p>
                    )}
                </div>

                {/* Pricing */}
                <div className="pt-4 border-t">
                    {isPromoValid && (
                        <div className="flex justify-between text-green-600 text-sm mb-2">
                            <span>Discount Applied ({discountPercent}% Off)</span>
                            <span className="font-bold">
                                - ${(totalPrice - discountedPrice).toFixed(2)}
                            </span>
                        </div>
                    )}
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${discountedPrice.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

/* ---------------------- CONFIRMATION MODAL ---------------------- */
const ConfirmationModal = ({ open, onClose, formData, total, bookingId }: ConfirmationModalProps) => {
    const getServiceDisplayName = (vehicle: VehicleBooking) => {
        return `${getServiceName(vehicle.serviceType)} - ${getPackageName(vehicle.serviceType, vehicle.package, vehicle.variant)}`;
    };

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

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            if (!isOpen) {
                onClose();
            }
        }}>
            <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-2xl font-bold text-green-600">
                        Booking Confirmed 🎉
                    </DialogTitle>
                    <DialogDescription className="text-base mt-2">
                        Thank you <span className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</span>!{" "}
                        Your booking has been successfully scheduled.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-6 border rounded-lg bg-gray-50 p-4 md:p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
                        Appointment Details
                    </h3>
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                            <span className="font-medium text-gray-600">Booking ID:</span>
                            <span className="text-blue-900 font-bold text-right">
                                {bookingId}
                            </span>
                        </div>

                        {/* Vehicle Services */}
                        <div>
                            <h4 className="font-medium text-gray-600 mb-2">Vehicle Services:</h4>
                            <div className="space-y-3">
                                {formData.vehicleBookings.map((vehicle, index) => (
                                    <div key={vehicle.id} className="border rounded-lg p-3 bg-white">
                                        <div className="font-medium text-gray-900">
                                            Vehicle {index + 1}: {vehicle.vehicleYear} {vehicle.vehicleMake} {vehicle.vehicleModel}
                                        </div>
                                        <div className="text-sm text-gray-700">
                                            Service: {getServiceDisplayName(vehicle)}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Color: {vehicle.vehicleColor}
                                            {vehicle.vehicleLength && ` • Length: ${vehicle.vehicleLength}ft`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                            <span className="font-medium text-gray-600">Date:</span>
                            <span className="text-gray-900 text-right">
                                {formatDisplayDate(formData.date)}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                            <span className="font-medium text-gray-600">Time:</span>
                            <span className="text-gray-900 text-right">
                                {formData.timeSlot || "N/A"}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                            <span className="font-medium text-gray-600">Customer:</span>
                            <span className="text-gray-900 text-right">
                                {formData.firstName} {formData.lastName}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                            <span className="font-medium text-gray-600">Contact:</span>
                            <span className="text-gray-900 text-right">
                                {formData.phone} | {formData.email}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                            <span className="font-medium text-gray-600">Address:</span>
                            <span className="text-gray-900 text-right max-w-[200px] md:max-w-none">
                                {formData.address}, {formData.city}, {formData.state} {formData.zip}
                            </span>
                        </div>

                        {formData.notes && (
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                <span className="font-medium text-gray-600">Notes:</span>
                                <span className="text-gray-900 text-right max-w-[200px] md:max-w-none">
                                    {formData.notes}
                                </span>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-t pt-3 mt-2">
                            <span className="font-medium text-gray-600 text-lg">Total Amount:</span>
                            <span className="font-bold text-green-600 text-lg">
                                ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button
                        onClick={onClose}
                        className="theme-button-accent flex-1"
                    >
                        Close & Book Another Service
                    </Button>
                    <Button
                        onClick={() => window.print()}
                        variant="outline"
                        className="flex-1"
                    >
                        Print Receipt
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Phone number formatting function with +1
const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/[^\d+]/g, '');

    let withCountryCode = cleaned;
    if (!cleaned.startsWith('+1')) {
        const withoutCountryCode = cleaned.replace(/^\+1/, '');
        const digits = withoutCountryCode.replace(/\D/g, '').slice(0, 10);
        withCountryCode = '+1' + digits;
    } else {
        const digits = cleaned.slice(2).replace(/\D/g, '').slice(0, 10);
        withCountryCode = '+1' + digits;
    }

    const digitsOnly = withCountryCode.slice(2);
    if (digitsOnly.length <= 3) {
        return withCountryCode;
    } else if (digitsOnly.length <= 6) {
        return `+1 (${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    } else {
        return `+1 (${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    }
};

/* ---------------------- VEHICLE BOOKING CARD ---------------------- */
interface VehicleBookingCardProps {
    vehicle: VehicleBooking;
    index: number;
    onUpdate: (vehicle: VehicleBooking) => void;
    onRemove: () => void;
    isLast: boolean;
}

const VehicleBookingCard = ({ vehicle, index, onUpdate, onRemove, isLast }: VehicleBookingCardProps) => {
    const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<ServiceVariant | null>(null);

    // Initialize service type and variant
    useEffect(() => {
        if (vehicle.serviceType) {
            const service = serviceTypes.find(s => s.id === vehicle.serviceType);
            setSelectedServiceType(service || null);
            
            if (vehicle.variant && service?.variants) {
                const variant = service.variants.find(v => v.id === vehicle.variant);
                setSelectedVariant(variant || null);
            }
        }
    }, [vehicle.serviceType, vehicle.variant]);

    const handleServiceTypeSelect = (serviceTypeId: string) => {
        const service = serviceTypes.find(s => s.id === serviceTypeId);
        setSelectedServiceType(service || null);
        setSelectedVariant(null);
        
        onUpdate({
            ...vehicle,
            serviceType: serviceTypeId,
            mainService: serviceTypeId, // ✅ Now compatible with interface
            variant: undefined,
            package: "",
            additionalServices: [],
            vehicleType: service?.vehicleTypes[0] || ""
        });
    };

    const handleVariantSelect = (variantId: string) => {
        if (!selectedServiceType?.variants) return;

        const variant = selectedServiceType.variants.find(v => v.id === variantId);
        setSelectedVariant(variant || null);
        
        onUpdate({
            ...vehicle,
            variant: variantId,
            mainService: selectedServiceType.id, // ✅ Now compatible with interface
            package: "",
            additionalServices: [],
            vehicleType: variant?.vehicleTypes[0] || ""
        });
    };

    const handlePackageSelect = (packageId: string) => {
        onUpdate({
            ...vehicle,
            package: packageId
        });
    };

    const handleAdditionalServiceChange = (serviceId: string) => {
        const updatedServices = vehicle.additionalServices.includes(serviceId)
            ? vehicle.additionalServices.filter(id => id !== serviceId)
            : [...vehicle.additionalServices, serviceId];
        
        onUpdate({
            ...vehicle,
            additionalServices: updatedServices
        });
    };

    const handleVehicleInfoChange = (field: string, value: string) => {
        onUpdate({
            ...vehicle,
            [field]: value
        });
    };

    // Get packages and additional services based on selection
    const getPackagesToDisplay = () => {
        if (selectedServiceType?.variants && selectedVariant) {
            return selectedVariant.packages;
        } else if (selectedServiceType?.packages) {
            return selectedServiceType.packages;
        }
        return [];
    };

    const getAdditionalServicesToDisplay = () => {
        if (selectedServiceType?.variants && selectedVariant) {
            return selectedVariant.additionalServices;
        } else if (selectedServiceType?.additionalServices) {
            return selectedServiceType.additionalServices;
        }
        return [];
    };

    return (
        <Card className="border-2 border-gray-200 bg-white">
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Vehicle {index + 1}
                    </h3>
                    {!isLast && (
                        <Button
                            type="button"
                            onClick={onRemove}
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                        </Button>
                    )}
                </div>

                {/* Service Selection */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Service Type
                        </label>
                        <Select
                            value={vehicle.serviceType}
                            onValueChange={handleServiceTypeSelect}
                        >
                            <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Select a service type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {serviceTypes.map((s) => (
                                    <SelectItem key={s.id} value={s.id}>
                                        {s.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Variant Selection */}
                    {selectedServiceType?.variants && (
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Vehicle Type
                            </label>
                            <Select
                                value={vehicle.variant || ""}
                                onValueChange={handleVariantSelect}
                            >
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Select vehicle type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {selectedServiceType.variants.map((variant) => (
                                        <SelectItem key={variant.id} value={variant.id}>
                                            {variant.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Package Selection */}
                    {selectedServiceType && (
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Select Package
                            </label>
                            <div className="grid md:grid-cols-2 gap-3">
                                {getPackagesToDisplay().map((pkg) => {
                                    const isSelected = vehicle.package === pkg.id;
                                    return (
                                        <div
                                            key={pkg.id}
                                            onClick={() => handlePackageSelect(pkg.id)}
                                            className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                                                isSelected
                                                    ? "border-blue-500 bg-blue-50 shadow-md"
                                                    : "border-gray-300 hover:border-blue-300 hover:shadow-sm"
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-medium text-gray-900 text-sm">{pkg.name}</span>
                                                <span className="font-bold text-blue-600 text-sm">
                                                    ${pkg.price}
                                                    {pkg.pricingType === "perFoot" && "/ft"}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600">{pkg.description}</p>
                                            {isSelected && (
                                                <div className="mt-1 text-blue-600 flex items-center text-xs">
                                                    <Check size={14} className="mr-1" /> Selected
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Vehicle Information */}
                    {vehicle.serviceType && (
                        <>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Make</label>
                                    <Input
                                        value={vehicle.vehicleMake}
                                        onChange={(e) => handleVehicleInfoChange("vehicleMake", e.target.value)}
                                        placeholder="e.g., Toyota"
                                        className="bg-white text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Model</label>
                                    <Input
                                        value={vehicle.vehicleModel}
                                        onChange={(e) => handleVehicleInfoChange("vehicleModel", e.target.value)}
                                        placeholder="e.g., Camry"
                                        className="bg-white text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Year</label>
                                    <Input
                                        value={vehicle.vehicleYear}
                                        onChange={(e) => handleVehicleInfoChange("vehicleYear", e.target.value)}
                                        placeholder="e.g., 2023"
                                        className="bg-white text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Color</label>
                                    <Input
                                        value={vehicle.vehicleColor}
                                        onChange={(e) => handleVehicleInfoChange("vehicleColor", e.target.value)}
                                        placeholder="e.g., Red"
                                        className="bg-white text-sm"
                                    />
                                </div>
                            </div>

                            {/* Vehicle Length for boats/RVs */}
                            {(vehicle.vehicleType === 'boat' || vehicle.vehicleType === 'rv' || vehicle.vehicleType === 'jet-ski') && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Vehicle Length (feet)
                                    </label>
                                    <Input
                                        value={vehicle.vehicleLength || ""}
                                        onChange={(e) => handleVehicleInfoChange("vehicleLength", e.target.value)}
                                        placeholder="e.g., 24"
                                        type="number"
                                        className="bg-white text-sm"
                                    />
                                </div>
                            )}

                            {/* Additional Services */}
                            {vehicle.package && getAdditionalServicesToDisplay().length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Add-on Services
                                    </label>
                                    <div className="grid md:grid-cols-2 gap-2">
                                        {getAdditionalServicesToDisplay().map((svc) => (
                                            <div key={svc.id} className="flex items-start space-x-2 p-2 border rounded-lg">
                                                <Checkbox
                                                    id={`${vehicle.id}-${svc.id}`}
                                                    checked={vehicle.additionalServices.includes(svc.id)}
                                                    onCheckedChange={() => handleAdditionalServiceChange(svc.id)}
                                                    className="mt-0.5"
                                                />
                                                <div className="flex-1">
                                                    <Label htmlFor={`${vehicle.id}-${svc.id}`} className="text-xs font-medium text-gray-900">
                                                        {svc.name}
                                                    </Label>
                                                    <p className="text-xs text-gray-600">{svc.description}</p>
                                                    <p className="text-xs font-semibold text-blue-600 mt-0.5">${svc.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

/* ---------------------- MAIN BOOKING ---------------------- */
const Booking = () => {
    const [step, setStep] = useState(1);
    const [date, setDate] = useState<Date | undefined>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [isPromoValid, setIsPromoValid] = useState(false);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bookingId, setBookingId] = useState("");
    const [isManualState, setIsManualState] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        vehicleBookings: [{
            id: `vehicle-${Date.now()}`,
            serviceType: "",
            variant: undefined,
            mainService: "", // ✅ ADDED mainService field
            package: "",
            additionalServices: [],
            vehicleType: "",
            vehicleMake: "",
            vehicleModel: "",
            vehicleYear: "",
            vehicleColor: "",
            vehicleLength: ""
        }],
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        date: "",
        timeSlot: "",
        notes: "",
    });

    // Disable past dates and Sundays
    const isDateDisabled = (date: Date) => {
        const today = startOfDay(new Date());
        return isBefore(date, today) || isSunday(date);
    };

    // Reset form function
    const resetForm = () => {
        setFormData({
            vehicleBookings: [{
                id: `vehicle-${Date.now()}`,
                serviceType: "",
                variant: undefined,
                mainService: "", // ✅ ADDED mainService field
                package: "",
                additionalServices: [],
                vehicleType: "",
                vehicleMake: "",
                vehicleModel: "",
                vehicleYear: "",
                vehicleColor: "",
                vehicleLength: ""
            }],
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            date: "",
            timeSlot: "",
            notes: "",
        });
        setDate(undefined);
        setPromoCode("");
        setIsPromoValid(false);
        setDiscountPercent(0);
        setStep(1);
        setBookingId("");
        setIsManualState(false);
    };

    // Automatically set state when city is entered (only if not in manual mode)
    useEffect(() => {
        if (formData.city.trim() && !isManualState) {
            const detectedState = cityStateMapping(formData.city);
            if (detectedState && detectedState !== formData.state) {
                updateForm({ state: detectedState });
            }
        }
    }, [formData.city, formData.state, isManualState]);

    // Validation
    const isStep1Valid = formData.vehicleBookings.length > 0 && 
        formData.vehicleBookings.every(vehicle => 
            vehicle.serviceType && vehicle.package && vehicle.vehicleMake && vehicle.vehicleModel
        );

    const isStep2Valid = formData.vehicleBookings.length > 0;

    const isStep3Valid =
        formData.firstName &&
        formData.email &&
        formData.phone &&
        formData.address &&
        formData.city &&
        formData.state &&
        formData.zip &&
        formData.date &&
        formData.timeSlot;

    // Pricing calculation
    const parsePrice = (price: number | string) => typeof price === 'string' ? Number(price) || 0 : price;

    const calculateTotalPrice = () => {
        let total = 0;

        formData.vehicleBookings.forEach((vehicle) => {
            let pkg;

            // Find the package price
            const service = serviceTypes.find(s => s.id === vehicle.serviceType);
            if (service?.variants && vehicle.variant) {
                const variant = service.variants.find(v => v.id === vehicle.variant);
                pkg = variant?.packages.find(p => p.id === vehicle.package);
            } else {
                pkg = service?.packages?.find(p => p.id === vehicle.package);
            }

            // Add package price
            if (pkg) {
                let packagePrice = parsePrice(pkg.price);
                const pricingType = pkg.pricingType || "fixed";

                if (pricingType === "perFoot" && vehicle.vehicleLength) {
                    packagePrice *= parseFloat(vehicle.vehicleLength);
                }
                total += packagePrice;
            }

            // Add additional services prices
            if (service?.variants && vehicle.variant) {
                const variant = service.variants.find(v => v.id === vehicle.variant);
                vehicle.additionalServices.forEach((addId) => {
                    const addService = variant?.additionalServices.find((a) => a.id === addId);
                    if (addService) total += parsePrice(addService.price);
                });
            } else if (service?.additionalServices) {
                vehicle.additionalServices.forEach((addId) => {
                    const addService = service.additionalServices?.find((a) => a.id === addId);
                    if (addService) total += parsePrice(addService.price);
                });
            }
        });

        return total;
    };

    const totalPrice = calculateTotalPrice();
    const discountedPrice = isPromoValid
        ? totalPrice * (1 - discountPercent / 100)
        : totalPrice;

    // Helpers
    const updateForm = (updates: Partial<FormData>) =>
        setFormData((prev) => ({ ...prev, ...updates }));

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const formatted = formatPhoneNumber(value);
            updateForm({ [name]: formatted } as Partial<FormData>);
        }
        else if (name === 'zip') {
            const cleaned = value.replace(/\D/g, '').slice(0, 5);
            updateForm({ [name]: cleaned } as Partial<FormData>);
        }
        else if (name === 'state') {
            setIsManualState(true);
            updateForm({ [name]: value } as Partial<FormData>);
        }
        else if (name === 'city') {
            updateForm({ [name]: value } as Partial<FormData>);
            if (!value.trim() && !isManualState) {
                updateForm({ state: "" });
            }
        }
        else {
            updateForm({ [name]: value } as Partial<FormData>);
        }
    };

    // Vehicle booking management
    const addVehicleBooking = () => {
        const newVehicle: VehicleBooking = {
            id: `vehicle-${Date.now()}`,
            serviceType: "",
            variant: undefined,
            mainService: "", // ✅ ADDED mainService field
            package: "",
            additionalServices: [],
            vehicleType: "",
            vehicleMake: "",
            vehicleModel: "",
            vehicleYear: "",
            vehicleColor: "",
            vehicleLength: ""
        };

        setFormData(prev => ({
            ...prev,
            vehicleBookings: [...prev.vehicleBookings, newVehicle]
        }));
    };

    const updateVehicleBooking = (index: number, updatedVehicle: VehicleBooking) => {
        setFormData(prev => ({
            ...prev,
            vehicleBookings: prev.vehicleBookings.map((vehicle, i) => 
                i === index ? updatedVehicle : vehicle
            )
        }));
    };

    const removeVehicleBooking = (index: number) => {
        setFormData(prev => ({
            ...prev,
            vehicleBookings: prev.vehicleBookings.filter((_, i) => i !== index)
        }));
    };

    const handleDateChange = (date: Date | undefined) => {
        setDate(date);
        updateForm({ date: date ? date.toISOString() : "" });
    };

    const handleApplyPromo = () => {
        const cleanedPromoCode = promoCode.replace(/\s/g, '');
        setPromoCode(cleanedPromoCode);

        const promo = promoCodes.find(
            (p) => p.code.toUpperCase() === cleanedPromoCode.toUpperCase()
        );

        if (promo) {
            setIsPromoValid(true);
            setDiscountPercent(promo.discount);
            toast.success(`Promo Applied! You got ${promo.discount}% off!`);
        } else {
            setIsPromoValid(false);
            setDiscountPercent(0);
            toast.error("Invalid Promo Code");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isStep3Valid) {
            toast.error("Please complete all required fields.");
            return;
        }

        if (date && isDateDisabled(date)) {
            toast.error("Please select a valid future date (Sundays are closed)");
            return;
        }

        const newBookingId = generateBookingId();
        setBookingId(newBookingId);

        setIsSubmitting(true);
        try {
            let finalPhone = formData.phone;
            if (!formData.phone.startsWith('+1')) {
                const digits = formData.phone.replace(/\D/g, '').slice(0, 10);
                finalPhone = '+1' + digits;
            }

            // Prepare data for API submission
            const submissionData = {
                bookingId: newBookingId,
                webName: "Quality Auto Care Detailing", // Hardcoded as requested
                formData: {
                    ...formData,
                    phone: finalPhone,
                },
                totalPrice: totalPrice,
                discountedPrice: discountedPrice,
                discountApplied: isPromoValid,
                discountPercent: discountPercent,
                promoCode: isPromoValid ? promoCode : null,
                submittedAt: new Date().toISOString(),
                vehicleCount: formData.vehicleBookings.length,
                status: "pending"
            };

            console.log("Booking Submission Data:", submissionData);

            // API Call
            const response = await fetch('https://car-detailling-dashboard.vercel.app/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (result.success) {
                setShowConfirmation(true);
                toast.success("Booking Successful! Confirmation emails sent.");
            } else {
                throw new Error(result.message || 'Failed to submit booking');
            }

        } catch (error) {
            console.error('Booking submission error:', error);
            toast.error("Submission Error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="min-h-screen text-gray-800 bg-gray-50">
            <div className="pt-4 pb-16 flex justify-center">
                <div className="w-full max-w-6xl px-4">
                    {/* Progress Bar */}
                    <ProgressBar currentStep={step} />

                    <Card className="border-0 shadow-xl rounded-xl bg-white">
                        <CardContent className="p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* STEP 1 - Vehicle Services */}
                                {step === 1 && (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={fadeIn}
                                        className="space-y-6"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-bold text-gray-900">
                                                Vehicle Services
                                            </h2>
                                            <Button
                                                type="button"
                                                onClick={addVehicleBooking}
                                                className="theme-button-accent"
                                            >
                                                <Plus size={16} className="mr-1" />
                                                Add Another Vehicle
                                            </Button>
                                        </div>

                                        <p className="text-gray-600">
                                            Add one or more vehicles to book services. Each vehicle can have different services and packages.
                                        </p>

                                        {/* Vehicle Booking Cards */}
                                        <div className="space-y-6">
                                            {formData.vehicleBookings.map((vehicle, index) => (
                                                <VehicleBookingCard
                                                    key={vehicle.id}
                                                    vehicle={vehicle}
                                                    index={index}
                                                    onUpdate={(updatedVehicle) => updateVehicleBooking(index, updatedVehicle)}
                                                    onRemove={() => removeVehicleBooking(index)}
                                                    isLast={formData.vehicleBookings.length === 1}
                                                />
                                            ))}
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <Button
                                                type="button"
                                                onClick={() => setStep(2)}
                                                disabled={!isStep1Valid}
                                                className={`theme-button-accent ${!isStep1Valid && "opacity-50 cursor-not-allowed"}`}
                                            >
                                                Next Step
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2 - Customer Information */}
                                {step === 2 && (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={fadeIn}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Customer Information
                                        </h2>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">First Name</label>
                                                <Input
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    placeholder="First Name"
                                                    className="bg-white w-full"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Last Name</label>
                                                <Input
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    placeholder="Last Name"
                                                    className="bg-white w-full"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Email</label>
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Email"
                                                    className="bg-white w-full"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Phone</label>
                                                <Input
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="(555) 123-4567"
                                                    className="bg-white w-full"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Address</label>
                                            <Input
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder="Address"
                                                className="bg-white w-full"
                                                required
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">City</label>
                                                <Input
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    placeholder="City"
                                                    className="bg-white w-full"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">State</label>
                                                <Input
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    placeholder="State"
                                                    className="bg-white w-full"
                                                    required
                                                />
                                                {!isManualState && formData.city && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Auto-detected from city
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">ZIP Code</label>
                                                <Input
                                                    name="zip"
                                                    value={formData.zip}
                                                    onChange={handleInputChange}
                                                    placeholder="12345"
                                                    maxLength={5}
                                                    className="bg-white w-full"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <Button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="theme-button-secondary"
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={() => setStep(3)}
                                                disabled={!isStep2Valid}
                                                className={`theme-button-accent ${!isStep2Valid && "opacity-50 cursor-not-allowed"}`}
                                            >
                                                Next Step
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3 - Booking Details */}
                                {step === 3 && (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={fadeIn}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Booking Details
                                        </h2>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Date</label>
                                                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "justify-start text-left font-normal bg-white w-full",
                                                                !date && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {date ? format(date, "PPP") : "Select a date"}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 bg-white">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={handleDateChange}
                                                            initialFocus
                                                            disabled={isDateDisabled}
                                                            fromDate={new Date()}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    * Past dates and Sundays are not available
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Time Slot</label>
                                                <Select
                                                    value={formData.timeSlot}
                                                    onValueChange={(val) => updateForm({ timeSlot: val })}
                                                >
                                                    <SelectTrigger className="bg-white w-full">
                                                        <SelectValue placeholder="Select time slot" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {timeSlots.map((slot, idx) => (
                                                            <SelectItem key={idx} value={slot}>
                                                                {slot}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Additional Notes</label>
                                            <Textarea
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                placeholder="Any special instructions or notes..."
                                                className="bg-white w-full min-h-[100px]"
                                            />
                                        </div>

                                        <div className="flex gap-2">
                                            <Input
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                placeholder="Promo Code"
                                                className="bg-white flex-1"
                                            />
                                            {promoCode.trim() && (
                                                <Button
                                                    type="button"
                                                    onClick={handleApplyPromo}
                                                    className="theme-button-accent whitespace-nowrap"
                                                >
                                                    Apply
                                                </Button>
                                            )}
                                        </div>

                                        {/* Order Summary */}
                                        <OrderSummary
                                            formData={formData}
                                            totalPrice={totalPrice}
                                            discountedPrice={discountedPrice}
                                            isPromoValid={isPromoValid}
                                            discountPercent={discountPercent}
                                            bookingId={bookingId}
                                        />

                                        {/* Submit */}
                                        <div className="flex justify-between mt-6">
                                            <Button
                                                type="button"
                                                onClick={() => setStep(2)}
                                                className="theme-button-secondary"
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={!isStep3Valid || isSubmitting}
                                                className={`theme-button-accent ${(!isStep3Valid || isSubmitting) &&
                                                    "opacity-50 cursor-not-allowed"
                                                    }`}
                                            >
                                                {isSubmitting ? "Submitting..." : "Submit Booking"}
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                open={showConfirmation}
                onClose={() => {
                    setShowConfirmation(false);
                    resetForm();
                }}
                formData={formData}
                total={discountedPrice}
                bookingId={bookingId}
            />
        </div>
    );
};

export default Booking;