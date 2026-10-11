/**
 * Home Page Content
 *
 * This file acts as the Single Source of Truth for the homepage text.
 * Replace the placeholder strings below with the final copy provided by ChatGPT.
 */

export const homeContent = {
  hero: {
    badge: "Industrial IoT · EV mobility · Smart agriculture",
    titlePart1: "CONNECTED ASSETS.",
    titlePart2: "SMARTER",
    titlePart3: "DECISIONS.",
    subheadline: "Connect your infrastructure, see what matters in real time, and turn operational data into action with Najhum’s enterprise platforms.",
    primaryCta: { 
      label: "Request a Demo",
      href: "/contact"
    },
    secondaryCta: { 
      label: "Explore Platforms",
      href: "#platforms"
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
        kpiValue: "9+",
        title: "YEARS OF EXPERIENCE",
        description: "Delivering Industrial IoT and enterprise technology solutions since 2017."
      },
      {
        kpiValue: "Dubai, UAE",
        title: "HEADQUARTERS",
        description: "Serving organizations across the UAE and GCC region."
      },
      {
        kpiValue: "3",
        title: "CORE PLATFORMS",
        description: "IoTRICS, EVOLTICS, and CropifAI enterprise platforms."
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
        kpiValue: "3",
        title: "Enterprise Platforms",
        description: "Purpose-built platforms for Industrial IoT, EV charging, and precision agriculture."
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
        description: "Connect industrial assets, monitor live data, and automate workflows through one IoT platform.",
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
        title: "CropifAI",
        description: "AI-driven agricultural insights for food security and yield optimization.",
        cta: "Details"
      }
    ]
  },
  about: {
    badge: "+ Who we are",
    leftContent: "Based in Dubai, we build platforms that connect industrial assets, EV charging networks, and agricultural infrastructure. From integration to ongoing support, our team helps you put operational data to work.",
    headline: "Built in Dubai.\nConnected to your operations.",
    description: "Integrate with your existing infrastructure and choose a deployment that fits your business.",
    buttonLabel: "Meet Najhum",
    trustStrip: [
      "Industrial IoT", "EV Infrastructure", "Smart Energy", "Enterprise Software", "Cloud Platforms", "Hardware Agnostic", "Real-Time Intelligence", "Predictive Analytics"
    ],
    stats: [
      { id: "established", title: "ESTABLISHED", value: "2017", label: "Building enterprise platforms for Industrial IoT, smart energy, and intelligent infrastructure." },
      { id: "core", title: "CORE PLATFORMS", value: "03", label: "IoTRICS, EVOLTICS, and CropifAI." },
      { id: "support", title: "ENTERPRISE SUPPORT", value: "24/7", label: "Continuous monitoring, operational visibility, and technical support for mission-critical deployments." },
      { id: "deployment", title: "DEPLOYMENT OPTIONS", value: "Cloud • Edge • Hybrid", label: "Flexible deployment models designed to integrate with enterprise infrastructure at any scale." }
    ]
  },
  cta: {
    headline: "Let’s connect your next big idea.",
    subheadline: "Tell us about your infrastructure. We’ll help you find the right platform and walk you through a tailored demonstration.",
    primaryCta: { label: "Request a Demo", href: "/contact" },
    secondaryCta: { label: "Explore Solutions", href: "/solutions" }
  },
  impact: {
    card1: {
      id: "1",
      label1: "CHALLENGE 01",
      label2: "SAFETY",
      title: "Personnel Hazards",
      description: "Manual monitoring of hazardous industrial environments.",
      outcomeLabel: "OUTCOME:",
      outcome: "100% Visibility"
    },

    card2: {
      items: [
        { 
          id: "2",
          challengeLabel: "CHALLENGE 02",
          category: "EV NETWORKS", 
          title: "Fragmented Charging", 
          description: "Complexity in managing multi-site charger availability and billing.",
          outcome: "99.9% Uptime"
        },
        { 
          id: "3", 
          challengeLabel: "CHALLENGE 03",
          category: "ENERGY COSTS", 
          title: "Rising Utility Expenses", 
          description: "High operational costs due to inefficient peak-load management.",
          outcome: "25% Reduction"
        },
        { 
          id: "4", 
          challengeLabel: "CHALLENGE 04",
          category: "WATER USAGE", 
          title: "Undetected Leaks", 
          description: "Non-revenue water loss across large-scale facility networks.",
          outcome: "Zero-Leak Ops"
        },
        { 
          id: "5", 
          challengeLabel: "CHALLENGE 05",
          category: "FACILITIES", 
          title: "Manual FM Tasks", 
          description: "Inefficient maintenance schedules based on time rather than data.",
          outcome: "Predictive FM"
        }
      ],
      feature: {
        id: "6",
        challengeLabel: "CHALLENGE 06",
        category: "AGRICULTURE",
        title: "Climate Volatility",
        description: "Inconsistent crop yields due to unpredictable moisture levels.",
        outcome: "30% Yield Gain"
      },
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
