/**
 * Home Page Content
 *
 * This file acts as the Single Source of Truth for the homepage text.
 * Replace the placeholder strings below with the final copy provided by ChatGPT.
 */

export const homeContent = {
  hero: {
    badge: "",
    titlePart1: "THE FUTURE OF",
    titlePart2: "INTELLIGENT",
    titlePart3: "INFRASTRUCTURE",
    subheadline: "Unified enterprise IoT, smart EV mobility, and agricultural intelligence platforms engineered to transform mission-critical operations with real-time clarity.",
    primaryCta: {
      label: "Request a Demo",
      href: "/contact#contact-form"
    },
    secondaryCta: {
      label: "Contact Us",
      href: "/contact"
    },
    cardText: "ENGINEERED TO\nDELIVER CLARITY,\nSCALE, AND\nCONTROL.",
    cardCta: {
      label: "DISCOVER",
      href: "/products"
    },
    kpis: [
      { value: "5K+", label: "Active Deployments" },
      { value: "Live", label: "Real-Time Telemetry" },
      { value: "99%", label: "Operational Precision" }
    ]
  },
  analytics: {
    badge: "Enterprise Platform",
    headline: "Intelligent",
    headlineItalic: "Operations Grid",
    description: "An integrated ecosystem connecting Industrial IoT, EV infrastructure, smart energy, and operational intelligence through a unified enterprise platform.",
    row1Label: "The Company",
    row2Label: "The Platform",
    trustSignals: [
      {
        kpiValue: "2017",
        title: "ESTABLISHED",
        description: "Industrial IoT and EV infrastructure since 2017."
      },
      {
        kpiValue: "Dubai, UAE",
        title: "HEADQUARTERS",
        description: "in5 Innovation Centre, Dubai Design District."
      },
      {
        kpiValue: "3",
        title: "PLATFORMS",
        description: "IoTRICS, EVOLTICS and CropifAI."
      },
      {
        kpiValue: "2",
        title: "COMMERCIAL MODELS",
        description: "SolaaS and PaaS."
      },
      {
        kpiValue: "GCC",
        title: "COVERAGE",
        description: "Deployments across the UAE and wider GCC."
      },
      {
        kpiValue: "End-to-end",
        title: "DELIVERY",
        description: "Hardware, platform, deployment and support in-house."
      },
      {
        kpiValue: "AMC",
        title: "MAINTENANCE",
        description: "Annual maintenance contracts and on-site service."
      }
    ],
    operationalIntelligence: [
      {
        kpiValue: "Open protocols",
        title: "CONTROLLER",
        description: "Najhum IoT Controller — LoRaWAN, Modbus, BACnet/IP, MQTT and REST."
      },
      {
        kpiValue: "OCPP 1.6J / 2.0.1",
        title: "EV STANDARD",
        description: "Any OCPP-compliant charger, any manufacturer."
      },
      {
        kpiValue: "5 channels",
        title: "CONNECTIVITY",
        description: "Cellular, fibre, LoRaWAN, satellite and BLE."
      },
      {
        kpiValue: "Agnostic",
        title: "HARDWARE",
        description: "Brand-independent across multi-vendor estates."
      },
      {
        kpiValue: "Automated",
        title: "ALERTING",
        description: "Threshold, anomaly and event-based triggers."
      },
      {
        kpiValue: "Retained",
        title: "DATA",
        description: "Historical storage, trend analysis, exportable reports."
      }
    ]
  },
  platforms: {
    label: "THE ENGINE OF OPERATION",
    title: "Proprietary high performance platforms",
    description: "",
    items: [
      {
        id: "evoltics",
        title: "EVOLTICS",
        description: "Advanced EV charger management. Load balancing and payment gateway integration.",
        cta: "Details"
      },
      {
        id: "iotrics",
        title: "IoTRICS",
        description: "The complete operating system for industrial IoT. Connect millions of data points securely across any network protocol with enterprise-grade encryption.",
        features: [
          "Multi-protocol ingestion (MQTT, LoRa)",
          "Advanced Rules Engine",
          "Customizable Executive Dashboards"
        ],
        cta: "EXPLORE IoTRICS",
        label: "CORE PLATFORM"
      },
      {
        id: "cropifai",
        title: "cropifAI",
        description: "AI-driven agricultural insights for food security and yield optimization.",
        cta: "Details"
      }
    ]
  },
  about: {
    badge: "+ Who we are",
    leftContent: "We build enterprise platforms that transform industrial infrastructure into intelligent, connected ecosystems. By combining Industrial IoT, smart energy, EV mobility, and cloud technologies, we help organizations improve visibility, optimize operations, and accelerate digital transformation.",
    headline: "Engineering the Future of\nConnected Infrastructure",
    description: "Our solutions are designed to integrate seamlessly with existing infrastructure, enabling real-time monitoring, predictive insights, and scalable automation across mission-critical operations.",
    buttonLabel: "Our Story",
    trustStrip: [
      "Industrial IoT", "EV Infrastructure", "Smart Energy", "Enterprise Software", "Cloud Platforms", "Hardware Agnostic", "Real-Time Intelligence", "Predictive Analytics"
    ],
    stats: [
      { id: "established", title: "ESTABLISHED", value: "2017", label: "Building enterprise platforms for Industrial IoT, smart energy, and intelligent infrastructure." },
      { id: "core", title: "CORE PLATFORMS", value: "03", label: "IoTRICS, EVOLTICS and CropifAI working together as one connected ecosystem." },
      { id: "support", title: "ENTERPRISE SUPPORT", value: "SLA-Backed", label: "Dedicated technical support, guaranteed response times, and operational visibility for enterprise deployments." },
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
    heading: "Build Intelligent Operations.",
    subCopy: "Transform industrial infrastructure with connected platforms for Industrial IoT, smart energy, EV mobility, and enterprise automation.",
    buttonLabel: "Explore Solutions",

    card1: {
      label1: "THE PROBLEM",
      label2: "INDUSTRIAL OPERATIONS",
      title1: "Your data already exists.",
      title2: "Nobody sees it in time.",
      description: "Sensors, meters, chargers and building systems each hold part of the picture, in platforms that do not talk to one another. What you need to act on is being recorded. It just never arrives in one place, at one time.",
      outcomeLabel: "OUTCOME:",
      outcome: "One operational view"
    },

    card2: {
      label1: "WHAT YOU ACTUALLY USE",
      label2: "EVERY DEPLOYMENT",
      items: [
        { id: "1", title: "Live dashboards", subtitle: "Every connected asset, one screen" },
        { id: "2", title: "Alerts", subtitle: "Routed to whoever can act" },
        { id: "3", title: "Audit records", subtitle: "Exportable history, kept" },
        { id: "4", title: "Open integration", subtitle: "Into your BMS, ERP or BI tool" }
      ],
      panel: {
        title: "Two ways to pay for it.",
        description: "SolaaS bundles hardware, platform, deployment and support into one operating cost. PaaS licenses the platform — run it on infrastructure you already own, or buy the hardware from us outright."
      }
    },

    card3: {
      title1: "Retrofit,",
      title2: "not rip-and-replace",
      description: "Existing meters, chillers, chargers and building systems stay where they are. The Najhum IoT Controller sits alongside them and reads them over the protocols they already speak, so the first deployment adds sensing without a shutdown and without replacing anything that still works."
    },

    card4: {
      title1: "Energy",
      title2: "Optimisation",
      description: "Circuit-level metering shows which assets drive peak demand and when, so load shifting and tariff decisions rest on measurement rather than estimate.",
      outcomeLabel: "OUTCOME:",
      outcome: "Circuit-level load visibility"
    },

    card5: {
      label: "BEFORE IT FAILS",
      title1: "Predictive",
      title2: "Maintenance",
      description: "Vibration, temperature and runtime trends flag equipment drifting out of normal before it stops — turning an unplanned shutdown into a scheduled job.",
      button: "DISCOVER MORE"
    },

    card6: {
      label: "GET STARTED",
      title: "Start with one site and one problem.",
      description: "We deploy the sensors, run the platform and keep it supported. You keep the data. If it works on the first site, it scales to the rest on the same subscription.",
      button: "Book a demo"
    }
  },

  whyChoose: {
    label: "THE NAJHUM ADVANTAGE",
    title: "Why Choose Us",
    subtitle: "Enterprise-grade architecture meets intelligent automation.",
    competitorLabel: "Traditional Systems",
    najhumLabel: "Najhum Platform",
    features: [
      {
        id: "01",
        name: "Infrastructure monitoring",
        competitor: "Manual inspection rounds, reported days later.",
        najhum: "Live readings from every asset, alerts in minutes."
      },
      {
        id: "02",
        name: "Operational visibility",
        competitor: "One portal per vendor, and none of them talk.",
        najhum: "Every asset on one dashboard, whatever the brand."
      },
      {
        id: "03",
        name: "Maintenance strategy",
        competitor: "Repairs begin after the equipment has stopped.",
        najhum: "Drift flagged while the equipment still runs."
      },
      {
        id: "04",
        name: "System integration",
        competitor: "Vendor-locked hardware that will not interoperate.",
        najhum: "One controller, open protocols, any vendor."
      },
      {
        id: "05",
        name: "Energy management",
        competitor: "One meter reading a month, after the fact.",
        najhum: "Circuit-level use, measured as it happens."
      },
      {
        id: "06",
        name: "EV charging",
        competitor: "Every charger brand brings its own software.",
        najhum: "One network across any OCPP charger brand."
      }
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
