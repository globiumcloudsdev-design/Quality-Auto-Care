// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image, { StaticImageData } from "next/image";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// import servicesData from "@/Data/Service_page_data/services-page-data";
// import { ServiceData, ServicesRecord } from "@/Types/Service_Page_types/service-page-type";

// interface ServiceProps {
//   serviceId: string;
// }

// const StarRow: React.FC<{ rating: number }> = ({ rating }) => (
//   <div className="flex items-center gap-1">
//     {[...Array(5)].map((_, i) => (
//       <svg
//         key={i}
//         className={`w-5 h-5 ${i < rating ? "text-amber-400" : "text-gray-300"}`}
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         aria-hidden
//       >
//         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//       </svg>
//     ))}
//     <span className="ml-2 text-sm font-med
// ium text-gray-600">{rating}/5</span>
//   </div>
// );

// const Service: React.FC<ServiceProps> = ({ serviceId }) => {
//   const services: ServicesRecord = servicesData;
//   const service: ServiceData | undefined = services[serviceId];

//   const [lightbox, setLightbox] = useState<{ open: boolean; src?: string; alt?: string }>({ open: false });

//   useEffect(() => {
//     if (typeof window !== "undefined") window.scrollTo(0, 0);
//   }, [serviceId]);

//   if (!service) {
//     return (
//       <div className="min-h-screen flex flex-col bg-gray-50">
//         <Navbar />
//         <main className="container mx-auto px-6 py-32 flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <div className="w-24 h-24 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
//               <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//               </svg>
//             </div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
//             <p className="text-xl text-gray-600 mb-8">Jo service aap dhoond rahe the wo maujood nahi hai.</p>
//             <Link href="/" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               Return to Home
//             </Link>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   const avgRating = Math.round(
//     service.testimonials.reduce((s, t) => s + t.rating, 0) / Math.max(1, service.testimonials.length)
//   );

//   const openLightbox = (src?: string, alt?: string) => setLightbox({ open: true, src, alt });
//   const closeLightbox = () => setLightbox({ open: false });

//   const getHeroImageSrc = () => {
//     if (typeof service.heroImage === "string") {
//       return service.heroImage;
//     }
//     return (service.heroImage as StaticImageData).src;
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />

//       {/* Enhanced Hero Section */}
//       <header className="relative min-h-[500px] lg:min-h-[70vh] overflow-hidden flex items-center">
//         <div className="absolute inset-0">
//           <Image
//             src={getHeroImageSrc()}
//             alt={service.title}
//             fill
//             className="object-cover scale-105 transform"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
//         </div>

//         <div className="relative container mx-auto px-6 py-16 lg:py-24 flex flex-col justify-center">
//           <div className="max-w-4xl">
//             <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
//               <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               Professional Service
//             </div>

//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//               <span className="text-blue-400">{service.shortTitle ?? service.title.split(" ")[0]}</span>{" "}
//               <span className="block md:inline">{service.title.split(" ").slice(1).join(" ")}</span>
//             </h1>

//             <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
//               {service.description}
//             </p>

//             <div className="flex flex-wrap items-center gap-6 mb-8">
//               <div className="flex items-center text-white/80">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <span className="font-medium">{service.duration}</span>
//               </div>
//               <div className="text-2xl font-bold text-blue-400">{service.price}</div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link href="/booking" className="inline-flex items-center justify-center px-8 py-4 theme-button-accent font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
//                 </svg>
//                 Book Now
//               </Link>
//               <a href="#details" className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//                 </svg>
//                 Learn More
//               </a>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Enhanced Main Content */}
//       <main className="container mx-auto px-6 py-16" id="details">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
//           <div className="lg:col-span-3">
//             {/* Service Details Card */}
//             <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 mb-12">
//               <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
//                 <div>
//                   <h2 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h2>
//                   <div className="flex items-center gap-4 text-gray-600">
//                     <span className="text-2xl font-bold text-[#3182ce]">{service.price}</span>
//                     <span className="text-lg">•</span>
//                     <span className="text-lg">{service.duration}</span>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 rounded-xl p-4 min-w-[200px]">
//                   <div className="text-sm text-gray-500 mb-2">Customer Rating</div>
//                   <StarRow rating={avgRating} />
//                   <div className="text-sm text-gray-500 mt-2">
//                     Based on {service.testimonials.length} reviews
//                   </div>
//                 </div>
//               </div>

//               <div className="prose prose-lg max-w-none">
//                 {service.content.map((item, idx) => {
//                   if (item.type === "paragraph") {
//                     return <p key={idx} className="text-gray-700 leading-relaxed mb-6">{item.text}</p>;
//                   }
//                   if (item.type === "heading") {
//                     return <h3 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{item.text}</h3>;
//                   }
//                   if (item.type === "list") {
//                     return (
//                       <div key={idx} className="grid gap-6 md:grid-cols-2 my-8">
//                         {item.items.map((li, i) => (
//                           <div key={i} className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
//                             <div className="theme-button-accent rounded-full p-3 flex-shrink-0 items-center shadow-lg">
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                               </svg>
//                             </div>
//                             <div>
//                               <h4 className="font-bold text-gray-900 text-lg mb-2">{li.title}</h4>
//                               <p className="text-gray-600 leading-relaxed">{li.description}</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     );
//                   }
//                   if (item.type === "numbered-list") {
//                     return (
//                       <div key={idx} className="bg-gray-50 rounded-xl p-6 my-8">
//                         <ol className="space-y-4">
//                           {item.items.map((step, i) => (
//                             <li key={i} className="flex gap-4 items-start">
//                               <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
//                                 {i + 1}
//                               </span>
//                               <span className="text-gray-700 leading-relaxed pt-1">{step}</span>
//                             </li>
//                           ))}
//                         </ol>
//                       </div>
//                     );
//                   }
//                   return null;
//                 })}
//               </div>
//             </div>

//             {/* Enhanced Before & After Section */}
//             <section className="mb-16">
//               <div className="text-center mb-12">
//                 <h3 className="text-4xl font-bold text-gray-900 mb-4">Before & After</h3>
//                 <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//                   See the amazing transformations we've achieved for our clients
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//                 {service.beforeAfter.map((pair, i) => (
//                   <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
//                     <div className="grid grid-cols-2">
//                       <div className="relative aspect-square group cursor-pointer" onClick={() => openLightbox(typeof pair.before === "string" ? pair.before : (pair.before as StaticImageData).src, `${pair.caption} before`)}>
//                         <Image src={typeof pair.before === "string" ? pair.before : (pair.before as StaticImageData).src} alt={`Before ${pair.caption}`} fill className="object-cover transition-transform group-hover:scale-110" />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                         <div className="absolute bottom-4 left-4 right-4">
//                           <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Before</span>
//                         </div>
//                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
//                           <div className="bg-white/90 rounded-full p-3">
//                             <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="relative aspect-square group cursor-pointer" onClick={() => openLightbox(typeof pair.after === "string" ? pair.after : (pair.after as StaticImageData).src, `${pair.caption} after`)}>
//                         <Image src={typeof pair.after === "string" ? pair.after : (pair.after as StaticImageData).src} alt={`After ${pair.caption}`} fill className="object-cover transition-transform group-hover:scale-110" />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                         <div className="absolute bottom-4 left-4 right-4">
//                           <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">After</span>
//                         </div>
//                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
//                           <div className="bg-white/90 rounded-full p-3">
//                             <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <h4 className="font-semibold text-gray-900 text-lg">{pair.caption}</h4>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Enhanced Testimonials Section */}
//             <section>
//               <div className="text-center mb-12">
//                 <h3 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
//                 <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//                   Real feedback from satisfied clients who trusted us with their needs
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {service.testimonials.map((t, i) => (
//                   <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
//                     <div className="flex items-center justify-between mb-6">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 theme-button-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
//                           {t.name.charAt(0)}
//                         </div>
//                         <div>
//                           <div className="font-bold text-gray-900 text-lg">{t.name}</div>
//                           <div className="text-gray-500 text-sm">Verified Customer</div>
//                         </div>
//                       </div>
//                       <StarRow rating={t.rating} />
//                     </div>
//                     <blockquote className="text-gray-700 text-lg leading-relaxed italic">
//                       "{t.quote}"
//                     </blockquote>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>

//           {/* Enhanced Sidebar */}
//           <aside className="space-y-8">
//             <div className="sticky top-8 space-y-6">
//               {/* Booking Card */}
//               <div className="theme-button-accent text-white rounded-2xl shadow-2xl overflow-hidden">
//                 <div className="p-8">
//                   <h4 className="text-2xl font-bold mb-4">Book {service.title}</h4>
//                   <div className="flex items-center gap-4 mb-6">
//                     <span className="text-3xl font-bold">{service.price}</span>
//                     <span className="text-blue-200">•</span>
//                     <span className="text-blue-200">{service.duration}</span>
//                   </div>
//                   <Link href="/booking" className="block text-center theme-button-secondary py-2 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
//                     Book Now
//                   </Link>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm p-6">
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between text-blue-100">
//                       <span className="flex items-center gap-2">
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         Onsite Service
//                       </span>
//                       <span className="font-semibold text-white">Yes</span>
//                     </div>
//                     <div className="flex items-center justify-between text-blue-100">
//                       <span className="flex items-center gap-2">
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         Warranty
//                       </span>
//                       <span className="font-semibold text-white">30 days*</span>
//                     </div>
//                   </div>
//                   <p className="text-xs text-blue-200 mt-4">*Terms apply — contact for details.</p>
//                 </div>
//               </div>

//               {/* Contact Card */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//                 <h5 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
//                   <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                   Contact Us
//                 </h5>
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <div className="bg-green-100 rounded-full p-2">
//                       <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-500">Call / WhatsApp</div>
//                       <Link href="tel:+923001234567" className="text-blue-600 font-semibold hover:text-blue-800">
//                         +1 (123) 456-7890
//                       </Link>
//                     </div>
//                   </div>
//                   {/* <div className="flex items-center gap-3">
//                     <div className="bg-blue-100 rounded-full p-2">
//                       <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-500">Address</div>
//                       <span className="text-gray-700 font-medium">Gulberg III, Lahore</span>
//                     </div>
//                   </div> */}
//                 </div>
//               </div>

//               {/* Trust Badges */}
//               <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
//                 <h5 className="font-bold text-lg text-gray-900 mb-4">Why Choose Us?</h5>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <div className="bg-green-500 rounded-full p-1">
//                       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <span className="text-gray-700 font-medium">100% Satisfaction Guaranteed</span>
//                   </div>
//                   {/* <div className="flex items-center gap-3">
//                     <div className="bg-blue-500 rounded-full p-1">
//                       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <span className="text-gray-700 font-medium">Licensed & Insured</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="bg-purple-500 rounded-full p-1">
//                       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <span className="text-gray-700 font-medium">5+ Years Experience</span>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>

//       <Footer />

//       {/* Enhanced Lightbox */}
//       {lightbox.open && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fadeIn"
//           role="dialog"
//           aria-modal="true"
//           onClick={closeLightbox}
//         >
//           <div className="max-w-6xl w-full max-h-[90vh] relative animate-scaleIn" onClick={(e) => e.stopPropagation()}>
//             <button
//               className="absolute -top-12 right-0 z-50 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all backdrop-blur-sm"
//               onClick={closeLightbox}
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
//               <Image
//                 src={lightbox.src ?? ""}
//                 alt={lightbox.alt ?? ""}
//                 fill
//                 className="object-contain"
//               />
//             </div>
//             <div className="mt-4 text-center">
//               <p className="text-white text-lg font-medium">{lightbox.alt}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes scaleIn {
//           from { 
//             opacity: 0; 
//             transform: scale(0.9) translateY(20px); 
//           }
//           to { 
//             opacity: 1; 
//             transform: scale(1) translateY(0); 
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
        
//         .animate-scaleIn {
//           animation: scaleIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Service;


"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import servicesData from "@/Data/Service_page_data/services-page-data";
import { ServiceData, ServicesRecord } from "@/Types/Service_Page_types/service-page-type";

interface ServiceProps {
  serviceId: string;
}

const StarRow: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-amber-400" : "text-gray-300"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="ml-2 text-sm font-medium text-gray-600">{rating}/5</span>
  </div>
);

const Service: React.FC<ServiceProps> = ({ serviceId }) => {
  const services: ServicesRecord = servicesData;
  const service: ServiceData | undefined = services[serviceId];

  const [lightbox, setLightbox] = useState<{ open: boolean; src?: string; alt?: string }>({ open: false });

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-6 py-32 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">Jo service aap dhoond rahe the wo maujood nahi hai.</p>
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const avgRating = Math.round(
    service.testimonials.reduce((s, t) => s + t.rating, 0) / Math.max(1, service.testimonials.length)
  );

  const openLightbox = (src?: string, alt?: string) => setLightbox({ open: true, src, alt });
  const closeLightbox = () => setLightbox({ open: false });

  const getHeroImageSrc = () => {
    if (typeof service.heroImage === "string") {
      return service.heroImage;
    }
    return (service.heroImage as StaticImageData).src;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Enhanced Hero Section */}
      <header className="relative min-h-[500px] lg:min-h-[70vh] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <Image
            src={getHeroImageSrc()}
            alt={service.title}
            fill
            className="object-cover scale-105 transform"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative container mx-auto px-6 py-16 lg:py-24 flex flex-col justify-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Professional Service
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="text-blue-400">{service.shortTitle ?? service.title.split(" ")[0]}</span>{" "}
              <span className="block md:inline">{service.title.split(" ").slice(1).join(" ")}</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              {service.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center text-white/80">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{service.duration}</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{service.price}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" className="inline-flex items-center justify-center px-8 py-4 theme-button-accent font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 01-1-1h3z" />
                </svg>
                Book Now
              </Link>
              <a href="#details" className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-6 py-16" id="details">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            {/* Service Details Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 mb-12">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h2>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="text-2xl font-bold text-[#3182ce]">{service.price}</span>
                    <span className="text-lg">•</span>
                    <span className="text-lg">{service.duration}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 min-w-[200px]">
                  <div className="text-sm text-gray-500 mb-2">Customer Rating</div>
                  <StarRow rating={avgRating} />
                  <div className="text-sm text-gray-500 mt-2">
                    Based on {service.testimonials.length} reviews
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                {service.content.map((item, idx) => {
                  if (item.type === "paragraph") {
                    return <p key={idx} className="text-gray-700 leading-relaxed mb-6">{item.text}</p>;
                  }
                  if (item.type === "heading") {
                    return <h3 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{item.text}</h3>;
                  }
                  if (item.type === "list") {
                    return (
                      <div key={idx} className="grid gap-6 md:grid-cols-2 my-8">
                        {item.items.map((li, i) => (
                          <div key={i} className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                            {/* <div className="theme-button-accent rounded-full p-3 flex-shrink-0 items-center shadow-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div> */}
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg mb-2">{li.title}</h4>
                              <p className="text-gray-600 leading-relaxed">{li.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (item.type === "numbered-list") {
                    return (
                      <div key={idx} className="bg-gray-50 rounded-xl p-6 my-8">
                        <ol className="space-y-4">
                          {item.items.map((step, i) => (
                            <li key={i} className="flex gap-4 items-start">
                              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                {i + 1}
                              </span>
                              <span className="text-gray-700 leading-relaxed pt-1">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Enhanced Before & After Section */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-gray-900 mb-4">Before & After</h3>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  See the amazing transformations we&apos;ve achieved for our clients
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {service.beforeAfter.map((pair, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-2">
                      <div className="relative aspect-square group cursor-pointer" onClick={() => openLightbox(typeof pair.before === "string" ? pair.before : (pair.before as StaticImageData).src, `${pair.caption} before`)}>
                        <Image src={typeof pair.before === "string" ? pair.before : (pair.before as StaticImageData).src} alt={`Before ${pair.caption}`} fill className="object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Before</span>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="bg-white/90 rounded-full p-3">
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="relative aspect-square group cursor-pointer" onClick={() => openLightbox(typeof pair.after === "string" ? pair.after : (pair.after as StaticImageData).src, `${pair.caption} after`)}>
                        <Image src={typeof pair.after === "string" ? pair.after : (pair.after as StaticImageData).src} alt={`After ${pair.caption}`} fill className="object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">After</span>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="bg-white/90 rounded-full p-3">
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-900 text-lg">{pair.caption}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Enhanced Testimonials Section */}
            <section>
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Real feedback from satisfied clients who trusted us with their needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.testimonials.map((t, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 theme-button-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-lg">{t.name}</div>
                          <div className="text-gray-500 text-sm">Verified Customer</div>
                        </div>
                      </div>
                      <StarRow rating={t.rating} />
                    </div>
                    <blockquote className="text-gray-700 text-lg leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Enhanced Sidebar */}
          <aside className="space-y-8">
            <div className="sticky top-8 space-y-6">
              {/* Booking Card */}
              <div className="theme-button-accent text-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8">
                  <h4 className="text-2xl font-bold mb-4">Book {service.title}</h4>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold">{service.price}</span>
                    <span className="text-blue-200">•</span>
                    <span className="text-blue-200">{service.duration}</span>
                  </div>
                  <Link href="/booking" className="block text-center theme-button-secondary py-2 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
                    Book Now
                  </Link>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-blue-100">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Onsite Service
                      </span>
                      <span className="font-semibold text-white">Yes</span>
                    </div>
                    <div className="flex items-center justify-between text-blue-100">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Warranty
                      </span>
                      <span className="font-semibold text-white">30 days*</span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-200 mt-4">*Terms apply — contact for details.</p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h5 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Us
                </h5>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 rounded-full p-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Call / WhatsApp</div>
                      <Link href="tel:+923001234567" className="text-blue-600 font-semibold hover:text-blue-800">
                        +1233-242-4232
                      </Link>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Address</div>
                      <span className="text-gray-700 font-medium">Ohio USA</span>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                <h5 className="font-bold text-lg text-gray-900 mb-4">Why Choose Us?</h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 rounded-full p-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">100% Satisfaction Guaranteed</span>
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <div className="bg-blue-500 rounded-full p-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500 rounded-full p-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">5+ Years Experience</span>
                  </div> */}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      {/* Enhanced Lightbox */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div className="max-w-6xl w-full max-h-[90vh] relative animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 z-50 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all backdrop-blur-sm"
              onClick={closeLightbox}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={lightbox.src ?? ""}
                alt={lightbox.alt ?? ""}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-medium">{lightbox.alt}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Service;