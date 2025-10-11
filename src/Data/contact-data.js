export const getContactData = () => {
  return {
    title: "Get In Touch",
    subtitle: "Have questions about our services or want to schedule an appointment? Fill out the form and we'll get back to you as soon as possible.",
    contactInfo: [
      {
        iconName: "Phone",
        title: "Phone",
        description: "Available Monday-Saturday, 8am-6pm",
      },
      {
        iconName: "Mail",
        title: "Email",
        description: "qualityautocaremobile@gmail.com",
      },
      {
        iconName: "Clock",
        title: "Business Hours",
        description: "Mon-Sat: 8am-6pm\nSunday: Closed",
      },
    ],
    socialLinks: [
      {
        iconName: "Facebook",
        href: "https://www.facebook.com/qualityautocaremobile",
        colorClass: "bg-blue-600 hover:bg-blue-700",
      },
      {
        iconName: "Instagram",
        href: "https://www.instagram.com/qualityautocaremobile",
        colorClass: "bg-pink-600 hover:bg-pink-700",
      },
      {
        iconName: "Phone",
        href: "https://wa.me/1233-242-4232",
        colorClass: "bg-green-600 hover:bg-green-700",
      },
    ],
    formTitle: "Send us a message",
    formButtonText: "Send Message",
  };
};