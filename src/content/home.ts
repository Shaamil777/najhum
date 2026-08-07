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
    trustSignals: [
      {
        kpiValue: "7+",
        title: "YEARS OF EXPERIENCE",
        description: "Delivering Industrial IoT and enterprise technology solutions since 2017."
      },
      {
        kpiValue: "Dubai, UAE",
        title: "HEADQUARTERS",
        description: "Serving organizations across the UAE and GCC region."
      },
      {
        kpiValue: "4",
        title: "CORE PLATFORMS",
        description: "IoTRICS, EVOLTICS, IEMS & SOLAAS enterprise platforms."
      },
      {
        kpiValue: "12+",
        title: "INDUSTRIES SERVED",
        description: "Supporting manufacturing, utilities, mobility, energy, and smart infrastructure."
      },
      {
        kpiValue: "24/7",
        title: "ENTERPRISE SUPPORT",
        description: "Continuous technical assistance and platform monitoring for mission-critical operations."
      },
      {
        kpiValue: "AI • IoT • Cloud",
        title: "TECHNOLOGY STACK",
        description: "Intelligent enterprise platforms built for automation, analytics, and operational excellence."
      },
      {
        kpiValue: "Hardware Agnostic",
        title: "PLATFORM COMPATIBILITY",
        description: "Compatible with open industrial communication protocols and multi-vendor infrastructure."
      }
    ],
    operationalIntelligence: [
      {
        kpiValue: "24/7",
        title: "Platform Monitoring",
        description: "Continuous monitoring and real-time operational visibility across connected assets."
      },
      {
        kpiValue: "4",
        title: "Enterprise Platforms",
        description: "Integrated solutions covering Industrial IoT, EV Charging, Energy Management, and Managed Services."
      },
      {
        kpiValue: "12+",
        title: "Industries Served",
        description: "Supporting manufacturing, utilities, logistics, commercial facilities, and smart infrastructure."
      },
      {
        kpiValue: "100%",
        title: "Open Integration",
        description: "Hardware-agnostic architecture supporting industry-standard communication protocols."
      },
      {
        kpiValue: "AI",
        title: "Operational Intelligence",
        description: "Predictive analytics, automated alerts, anomaly detection, and intelligent decision support."
      },
      {
        kpiValue: "UAE",
        title: "Regional Presence",
        description: "Headquartered in Dubai and delivering enterprise technology solutions across the GCC."
      }
    ]
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
    headline: "Ready to Transform Your Operations?",
    subheadline: "Connect industrial assets, optimize energy, and unlock real-time operational intelligence with Najhum's enterprise platforms.",
    primaryCta: { label: "Get Started", href: "/contact" },
    secondaryCta: { label: "Learn More", href: "/about" }
  },
  impact: {
    card1: {
      label1: "Challenge 01",
      label2: "Industrial Operations",
      title: "Disconnected Infrastructure",
      description: "Industrial assets, sensors, energy systems, and enterprise platforms often operate in silos, limiting visibility, efficiency, and operational control.",
      outcomeLabel: "Outcome:",
      outcome: "Unified Operational Visibility"
    },

    card2: {
      items: [
        { id: "1", title: "Industrial", subtitle: "IoT" },
        { id: "2", title: "EV", subtitle: "Charging" },
        { id: "3", title: "Smart", subtitle: "Energy" },
        { id: "4", title: "Managed", subtitle: "Services" }
      ],
      featureTitle: "Integrated Solutions"
    },

    card3: {
      title1: "Operational",
      title2: "Intelligence",
      description: "Transform real-time industrial data into actionable insights through centralized dashboards, predictive analytics, and intelligent automation."
    },

    card4: {
      title1: "Energy",
      title2: "Optimization",
      description: "Monitor energy consumption, identify inefficiencies, and improve operational performance through intelligent energy management.",
      outcomeLabel: "Outcome:",
      outcome: "Lower Energy Costs"
    },

    card5: {
      label: "PREDICTIVE INSIGHTS",
      title1: "Predictive",
      title2: "Maintenance",
      description: "Detect equipment anomalies before failures occur using AI-powered monitoring, automated alerts, and predictive maintenance analytics.",
      button: "DISCOVER MORE"
    },

    card6: {
      label: "GET STARTED",
      title1: "Ready to Build",
      title2: "Smarter Operations?",
      description: "Partner with Najhum to modernize your infrastructure through Industrial IoT, smart energy, EV charging, and enterprise software solutions designed for long-term operational success.",

      button: "BOOK A DEMO"
    }
  },

  whyChoose: {
    label: "THE NAJHUM ADVANTAGE",
    title: "Why Choose Us",
    subtitle: "Enterprise-grade architecture meets intelligent automation.",
    competitorLabel: "Traditional Systems",
    najhumLabel: "Najhum Platform",
    features: [
      { name: "Infrastructure Monitoring", competitor: "Manual inspections and delayed reporting across disconnected assets.", najhum: "Real-time monitoring with live dashboards, alerts, and predictive insights." },
      { name: "Operational Visibility", competitor: "Multiple software platforms with fragmented operational data.", najhum: "One unified dashboard for Industrial IoT, Energy, and EV infrastructure." },
      { name: "Maintenance Strategy", competitor: "Reactive maintenance after equipment failures occur.", najhum: "Predictive maintenance powered by AI-driven analytics and automated alerts." },
      { name: "System Integration", competitor: "Vendor-specific hardware with limited interoperability.", najhum: "Hardware-agnostic platform supporting open industrial communication protocols." },
      { name: "Energy Management", competitor: "Manual energy tracking with limited visibility into consumption.", najhum: "Smart energy optimization through real-time monitoring and performance analytics." },
      { name: "Decision Making", competitor: "Historical reports and manual operational analysis.", najhum: "Real-time operational intelligence with AI-powered recommendations and insights." }
    ]
  },
  faq: {
    label: "FAQ",
    headline: "Frequently Asked Questions",
    items: [
      {
        question: "What industries can benefit from Najhum's solutions?",
        answer: "Najhum's platforms are designed for manufacturing, utilities, commercial facilities, logistics, smart infrastructure, agriculture, and energy sectors. Our solutions help organizations improve operational visibility, optimize energy consumption, automate processes, and make data-driven decisions."
      },
      {
        question: "Can Najhum's platform integrate with our existing infrastructure?",
        answer: "Yes. Najhum's platforms are hardware-agnostic and support open industrial communication protocols, allowing seamless integration with existing equipment, sensors, EV chargers, and enterprise software without requiring complete infrastructure replacement."
      },
      {
        question: "What is IoTRICS, and how does it help my business?",
        answer: "IoTRICS is Najhum's Industrial IoT platform that connects industrial assets, collects real-time operational data, and transforms it into actionable insights through centralized dashboards, intelligent alerts, and predictive analytics, enabling smarter and more efficient operations."
      },
      {
        question: "Does Najhum provide support after deployment?",
        answer: "Absolutely. We offer end-to-end implementation, platform configuration, technical support, system maintenance, and continuous monitoring to ensure your operations remain secure, reliable, and optimized throughout the platform lifecycle."
      },
      {
        question: "How can I get started with Najhum?",
        answer: "Getting started is simple. Contact our team to schedule a consultation or product demonstration. We'll assess your operational requirements, recommend the most suitable platform, and develop a tailored implementation roadmap for your organization."
      }
    ]
  }
};
