export const siteConfig = {
  name: "Najhum Technologies LLC",
  shortName: "Najhum",
  description: "Next Generation Digital Excellence and Sustainable Progress",
  url: "https://najhumgroup.com",
  ogImage: "https://najhumgroup.com/og.jpg",
  contact: {
    email: "info@najhumgroup.com",
    phone: "+971 55 617 7234",
    secondaryPhone: "+971 52 569 9979",
    phones: ["+971 55 617 7234", "+971 52 569 9979"],
    address: {
      company: "Najhum Technologies LLC",
      location: "in5 Innovation Centre",
      district: "Dubai Design District",
      city: "Dubai",
      country: "United Arab Emirates"
    }
  },
  links: {
    linkedin: "https://www.linkedin.com/company/najhum-technologies-llc",
    facebook: "https://www.facebook.com/najhumtechnologiesllc",
    instagram: "https://www.instagram.com/najhumtechnologies",
  },
  mainNav: [
    { title: "Platforms", href: "/platforms" },
    { title: "Solutions", href: "/solutions" },
    { title: "Products", href: "/products" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  footerNav: {
    platforms: [
      { title: "IoTRICS", href: "/platforms/iotrics", description: "Industrial IoT, Smart Building Digital Twin & Telemetry" },
      { title: "EVOLTICS", href: "/platforms/evoltics", description: "EV Charging Infrastructure & Smart CSMP Management" },
      { title: "CropifAI", href: "/platforms/cropifai", description: "Precision Agriculture & Automated Climate Intelligence" },
    ],
    solutions: [
      { title: "Facilities Management", href: "/solutions/facilities-management" },
      { title: "Hospitality & Hotels", href: "/solutions/hospitality" },
      { title: "Cold Storage", href: "/solutions/cold-storage" },
      { title: "Industrial & Manufacturing", href: "/solutions/industrial" },
      { title: "Energy Monitoring", href: "/solutions/energy-monitoring" },
    ],
    company: [
      { title: "About Us", href: "/about" },
      { title: "Products", href: "/products" },
      { title: "Contact", href: "/contact" },
    ]
  }
};

export type SiteConfig = typeof siteConfig;
