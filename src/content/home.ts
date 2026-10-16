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
        description: "Najhum IoT Controller — LPWAN, Modbus, BACnet/IP, MQTT and REST."
      },
      {
        kpiValue: "OCPP 1.6J / 2.0.1",
        title: "EV STANDARD",
        description: "Any OCPP-compliant charger, any manufacturer."
      },
      {
        kpiValue: "5 channels",
        title: "CONNECTIVITY",
        description: "Cellular, fibre, LPWAN, satellite and BLE."
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
        question: "What does Najhum do?",
        answer: "We build and run connected monitoring systems for industrial sites, EV charging networks and farms. Sensors and the Najhum IoT Controller collect the data on site; our cloud platform turns it into dashboards, alerts and reports. Three platforms: IoTRICs for industrial IoT, EVOLTICS for EV charging management, cropifAI for agriculture. Sensors, connectivity, platform and support come from one supplier."
      },
      {
        question: "Do I have to replace the equipment I already have?",
        answer: "No. We install the Najhum IoT Controller on site, and it connects to your existing meters, chillers, chargers and building systems over the protocols they already speak — LPWAN, Modbus, BACnet/IP, MQTT and REST — then sends the readings to the platform. The equipment itself is untouched and deployment needs no shutdown."
      },
      {
        question: "How is Najhum bought — capital purchase or subscription?",
        answer: "Two models. SolaaS bundles hardware, platform, deployment and support into one recurring operating cost, with no capital outlay. PaaS licenses the platform. Run it on infrastructure you already own, or buy the hardware from us outright and own the assets."
      },
      {
        question: "What does a deployment involve, and how long does it take?",
        answer: "Site survey, sensor installation, connectivity setup, platform configuration, handover and training."
      },
      {
        question: "Where is my data stored, and who can see it?",
        answer: "Data is held on our secure cloud platform with role-based access, so each user sees only their own sites. The data is yours and is exportable at any time."
      },
      {
        question: "What support do I get after handover?",
        answer: "Annual maintenance contracts cover platform support, firmware updates and on-site service."
      },
      {
        question: "Can it connect to our existing BMS, ERP or reporting tools?",
        answer: "Yes. The platform exposes a REST API and MQTT, so data can feed an existing BMS, ERP or BI tool rather than living only in our dashboard."
      },
      {
        question: "Can we start small?",
        answer: "Yes, and it is what we recommend. One site, one problem. If it works, it extends to the rest of the estate on the same subscription."
      },
      {
        question: "Which industries do you work in?",
        answer: "Manufacturing, utilities, facilities and commercial buildings, cold storage, mobility and agriculture, across the UAE and wider GCC."
      },
      {
        question: "How do I get started?",
        answer: "Request a demo, or call +971 55 617 7234 / +971 52 569 9979, or email info@najhumgroup.com. We are at in5 Innovation Centre, Dubai Design District."
      }
    ]
  }
};
