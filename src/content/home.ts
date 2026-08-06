/**
 * Home Page Content
 *
 * This file acts as the Single Source of Truth for the homepage text.
 * Replace the placeholder strings below with the final copy provided by ChatGPT.
 */

export const homeContent = {
  hero: {
    titlePart1: "THE",
    titlePart2: "FUTURE OF",
    titlePart3: "ENTERPRISE",
    subheadline: "Designed for seamless integration and refined operational intelligence, letting your infrastructure adapt instantly.",
    primaryCta: { 
      label: "EXPLORE COLLECTION", 
      href: "/platforms" 
    },
    cardText: "ENGINEERED TO\nDELIVER CLARITY,\nSCALE, AND\nCONTROL.",
    cardCta: { 
      label: "DISCOVER", 
      href: "/products" 
    },
    kpis: [
      { value: "5K+", label: "Active Deployments" },
      { value: "24/7", label: "Real-Time Monitoring" },
      { value: "99%", label: "Operational Precision" }
    ]
  },
  analytics: {
    badge: "Enterprise Platform",
    headline: "Intelligent",
    headlineItalic: "Operations Grid",
    description: "\"An integrated ecosystem connecting Industrial IoT, EV infrastructure, smart energy, and operational intelligence through a unified enterprise platform.\"",
    cards: {
      core: {
        label: "Core Platform",
        title: "IoTRICs",
        description: "Centralized Industrial IoT platform for monitoring assets, collecting operational data, and delivering predictive insights.",
        kpiValue: "24/7",
        kpiLabel: "Real-Time Operations"
      },
      connectivity: {
        label: "Connectivity",
        title: "Hardware Agnostic",
        description: "Connect industrial equipment, sensors, EV chargers, and enterprise systems through open communication protocols.",
        progressText: "MQTT • OCPP • Modbus",
        kpiValue: "100%",
        kpiLabel: "Open Integration"
      },
      deployment: {
        label: "Deployment",
        title: "Cloud • Edge • Hybrid",
        description: "Flexible deployment options for enterprise infrastructure and mission-critical operations.",
        kpiValue: "03",
        kpiLabel: "Deployment Models"
      },
      analytics: {
        label: "Analytics",
        title: "Operational Intelligence",
        description: "Transform live operational data into actionable insights through dashboards, automated alerts, and predictive analytics.",
        kpiValue: "LIVE",
        kpiLabel: "Executive Dashboards",
        chartLabels: ["Assets", "Energy", "Alerts", "Devices", "Reports", "Insights"]
      }
    }
  },
  platforms: {
    label: "Our Platform Ecosystem",
    title: "Enterprise Software Platforms",
    description: "Powering Industrial IoT, EV infrastructure, and smart energy through enterprise-grade software platforms built for real-time operations.",
    items: [
      {
        id: "iotrics",
        title: "IoTRICS",
        description: "The complete operating system for industrial IoT with military-grade security.",
        accent: "#06B6D4",
        cta: "Learn More →"
      },
      {
        id: "evoltics",
        title: "EVOLTICS",
        description: "Advanced EV charger management with smart load balancing.",
        accent: "#0EA5FF",
        cta: "Learn More →"
      },
      {
        id: "cropifai",
        title: "CropifAI",
        description: "AI-driven agricultural insights for food security and yield optimization.",
        accent: "#22C55E",
        cta: "Learn More →"
      },
      {
        id: "solaas",
        title: "SOLAAS",
        description: "Cloud-based managed service platform for scalable enterprise deployment.",
        accent: "#F59E0B",
        cta: "Learn More →"
      }
    ]
  },
  about: {
    badge: "+ WHO WE ARE",
    leftContent: "We build enterprise platforms that transform industrial infrastructure into intelligent, connected ecosystems. By combining Industrial IoT, smart energy, EV mobility, and cloud technologies, we help organizations improve visibility, optimize operations, and accelerate digital transformation.",
    headline: "Engineering the Future of\nConnected Infrastructure",
    description: "Our solutions are designed to integrate seamlessly with existing infrastructure, enabling real-time monitoring, predictive insights, and scalable automation across mission-critical operations.",
    buttonLabel: "Inside the studio",
    trustStrip: [
      "Industrial IoT", "EV Infrastructure", "Smart Energy", "Enterprise Software", "Cloud Platforms", "Hardware Agnostic", "Real-Time Intelligence", "Predictive Analytics"
    ],
    stats: [
      { id: "established", title: "ESTABLISHED", value: "2017", label: "Building enterprise platforms for Industrial IoT, smart energy, and intelligent infrastructure." },
      { id: "core", title: "CORE PLATFORMS", value: "04", label: "IoTRICs, EVOLTICS, IEMS, and SOLAAS working together as one connected ecosystem." },
      { id: "support", title: "ENTERPRISE SUPPORT", value: "24/7", label: "Continuous monitoring, operational visibility, and technical support for mission-critical deployments." },
      { id: "deployment", title: "DEPLOYMENT OPTIONS", value: "Cloud • Edge • Hybrid", label: "Flexible deployment models designed to integrate with enterprise infrastructure at any scale." }
    ]
  },
  cta: {
    headline: "Ready to Transform Your Enterprise?",
    subheadline: "Join industry leaders who trust Najhum to power their next-generation digital platforms.",
    primaryCta: { label: "Get Started", href: "/contact" },
    secondaryCta: { label: "Learn More", href: "/about" }
  }
};
