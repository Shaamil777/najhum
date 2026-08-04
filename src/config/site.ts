export const siteConfig = {
  name: "Najhum Technologies LLC",
  shortName: "Najhum",
  description: "Next Generation Digital Excellence and Sustainable Progress",
  url: "https://najhumgroup.com",
  ogImage: "https://najhumgroup.com/og.jpg",
  contact: {
    email: "info@najhumgroup.com",
    phone: "+971 55 767 5883",
    address: {
      company: "Najhum Technologies LLC",
      location: "in5 Design",
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
    { title: "Products", href: "/products" },
    { title: "Solutions", href: "/solutions" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  footerNav: {
    platforms: [
      { title: "IoTRICS", href: "/platforms/iotrics" },
      { title: "EVOLTICS", href: "/platforms/evoltics" },
      { title: "CropifAI", href: "/platforms/cropifai" },
    ],
    company: [
      { title: "About Us", href: "/about" },
      { title: "Portfolio", href: "/portfolio" },
      { title: "Contact", href: "/contact" },
    ]
  }
};

export type SiteConfig = typeof siteConfig;
