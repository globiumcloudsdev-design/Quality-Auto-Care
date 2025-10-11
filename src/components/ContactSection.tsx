// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { Phone, Mail, Clock, Facebook, Instagram, LucideIcon } from "lucide-react";
// import Link from "next/link";
// import { getContactData } from "@/Data/contact-data";
// import { ContactData } from "@/Types/contact-types";
// import { toast } from "react-toastify";

// const contactIcons: { [key: string]: LucideIcon } = {
//   Phone: Phone,
//   Mail: Mail,
//   Clock: Clock,
// };

// const socialIcons: { [key: string]: LucideIcon } = {
//   Facebook: Facebook,
//   Instagram: Instagram,
//   Phone: Phone, // Assuming you want a phone icon for WhatsApp
// };

// const ContactSection = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   const data: ContactData = getContactData();
//   const { title, subtitle, contactInfo, socialLinks, formTitle, formButtonText } = data;

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("visible");
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const elements = sectionRef.current?.querySelectorAll(".fade-in");
//     elements?.forEach((el) => observer.observe(el));

//     return () => {
//       elements?.forEach((el) => observer.unobserve(el));
//     };
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/contact-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         toast.success("Message sent successfully!");
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           message: "",
//         });
//       } else {
//         toast.error("Failed to send message");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Network error");
//     }
//     setIsSubmitting(false);
//   };

//   // Title ko split karke render karne ka behtar tareeqa
//   const words = title.split(' ');
//   const firstWords = words.slice(0, words.length - 1).join(' ');
//   const lastWord = words[words.length - 1];

//   return (
//     <section className="py-20 bg-background text-foreground" id="contact" ref={sectionRef}>
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* Left Side */}
//           <div className="lg:w-1/2">
//             <h2 className="text-3xl lg:text-4xl font-bold mb-6 fade-in theme-text-primary">
//               {firstWords}{" "}
//               <span className="text-[var(--theme-accent)]">
//                 {lastWord}
//               </span>
//             </h2>
//             <p className="theme-text-secondary mb-8 fade-in">
//               {subtitle}
//             </p>

//             <div className="space-y-6 fade-in">
//               {contactInfo.map((info, index) => {
//                 const IconComponent = contactIcons[info.iconName as keyof typeof contactIcons];
//                 if (!IconComponent) return null;
//                 return (
//                   <div key={index} className="flex items-start gap-4">
//                     <div className="bg-[var(--theme-accent)] rounded-full p-2 mt-1">
//                       <IconComponent className="h-5 w-5 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold theme-text-primary">
//                         {info.title}
//                       </h3>
//                       <p className="theme-text-secondary whitespace-pre-line">
//                         {info.description}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="pt-4 fade-in">
//               <h3 className="font-semibold mb-2 theme-text-primary">
//                 Follow Us
//               </h3>
//               <div className="flex gap-4">
//                 {socialLinks.map((social, index) => {
//                   const IconComponent = socialIcons[social.iconName as keyof typeof socialIcons];
//                   if (!IconComponent) return null;
//                   return (
//                     <Link
//                       key={index}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={`${social.colorClass} text-white p-2 rounded-full hover:opacity-80 transition-colors`}
//                     >
//                       <IconComponent className="h-5 w-5" />
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Right Side Form */}
//           <div className="lg:w-1/2">
//             <div className="bg-card rounded-xl shadow-lg p-8 fade-in border theme-border">
//               <h3 className="text-xl font-semibold mb-6 theme-text-primary">
//                 {formTitle}
//               </h3>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Form fields... */}
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm mb-2 theme-text-secondary"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-md border theme-border bg-background theme-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm mb-2 theme-text-secondary"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-md border theme-border bg-background theme-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="block text-sm mb-2 theme-text-secondary"
//                   >
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-md border theme-border bg-background theme-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="message"
//                     className="block text-sm mb-2 theme-text-secondary"
//                   >
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     rows={4}
//                     className="w-full px-4 py-2 rounded-md border theme-border bg-background theme-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="theme-button-accent px-6 py-3 rounded-md font-medium transition-colors w-full flex items-center justify-center"
//                 >
//                   {isSubmitting ? (
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                   ) : null}
//                   {isSubmitting ? "Sending..." : formButtonText}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;





"use client";
import React, { useState, useRef, useEffect } from "react";
import { Phone, Mail, Clock, Facebook, Instagram, LucideIcon } from "lucide-react";
import Link from "next/link";
import { getContactData } from "@/Data/contact-data";
import { ContactData } from "@/Types/contact-types";
import { toast } from "react-toastify";

const contactIcons: { [key: string]: LucideIcon } = {
  Phone: Phone,
  Mail: Mail,
  Clock: Clock,
};

const socialIcons: { [key: string]: LucideIcon } = {
  Facebook: Facebook,
  Instagram: Instagram,
  Phone: Phone,
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    webName: "Quality Auto Care Detailing" // Default value set kiya hai
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const data: ContactData = getContactData();
  const { title, subtitle, contactInfo, socialLinks, formTitle, formButtonText } = data;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-in");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API call with webName included
      const res = await fetch("https://car-detailling-dashboard.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          webName: "Quality Auto Care Detailing" // Hard coded as required
        }),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          webName: "Quality Auto Care Detailing"
        });
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Network error - please try again later");
    }
    setIsSubmitting(false);
  };

  const words = title.split(' ');
  const firstWords = words.slice(0, words.length - 1).join(' ');
  const lastWord = words[words.length - 1];

  return (
    <section className="py-20 bg-background text-foreground" id="contact" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 fade-in theme-text-primary">
              {firstWords}{" "}
              <span className="text-[var(--theme-accent)]">
                {lastWord}
              </span>
            </h2>
            <p className="theme-text-secondary mb-8 fade-in">
              {subtitle}
            </p>

            <div className="space-y-6 fade-in">
              {contactInfo.map((info, index) => {
                const IconComponent = contactIcons[info.iconName as keyof typeof contactIcons];
                if (!IconComponent) return null;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-[var(--theme-accent)] rounded-full p-2 mt-1">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold theme-text-primary">
                        {info.title}
                      </h3>
                      <p className="theme-text-secondary whitespace-pre-line">
                        {info.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 fade-in">
              <h3 className="font-semibold mb-2 theme-text-primary">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = socialIcons[social.iconName as keyof typeof socialIcons];
                  if (!IconComponent) return null;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.colorClass} text-white p-2 rounded-full hover:opacity-80 transition-colors`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="lg:w-1/2">
            <div className="bg-card rounded-xl shadow-lg p-8 fade-in border theme-border">
              <h3 className="text-xl font-semibold mb-6 theme-text-primary">
                {formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm mb-2 theme-text-secondary"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border theme-border bg-background theme-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 theme-text-secondary"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border theme-border bg-background theme-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm mb-2 theme-text-secondary"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border theme-border bg-background theme-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm mb-2 theme-text-secondary"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border theme-border bg-background theme-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                    required
                  />
                </div>

                {/* Hidden field for webName */}
                <input
                  type="hidden"
                  name="webName"
                  value="Quality Auto Care Detailing"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="theme-button-accent px-6 py-3 rounded-md font-medium transition-colors w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  {isSubmitting ? "Sending..." : formButtonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;