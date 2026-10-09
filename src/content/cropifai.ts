export const cropifaiContent = {
  hero: {
    badge: "CROPifAI Platform",
    title: {
      line1: "BEYOND PRECISION.",
      line2: "CULTIVATING THE FUTURE."
    },
    subtitle: "AI & IoT-Powered Smart Agriculture Solutions",
    description: "A revolutionary IoT-based agriculture and irrigation system using sensors, devices, and data analytics to monitor and optimize farming operations.",
    buttons: {
      explore: "Explore Solutions",
      models: "Business Models"
    }
  },
  about: {
    header: {
      tag: "THE PLATFORM",
      titlePart1: "Smart Agriculture,",
      titlePart2: "Powered by",
      highlight: "AI & IoT",
      description: "CropifAI™ is an intelligent, end-to-end platform combining rugged IoT sensors, advanced AI analytics, and cloud technology to fully automate your agricultural operations. We bridge the gap between physical infrastructure and digital intelligence."
    },
    steps: [
      {
        num: "1",
        title: "COLLECT",
        desc: "Intelligent sensors capture soil, water & environmental data"
      },
      {
        num: "2",
        title: "CONNECT",
        desc: "LoRaWAN & cloud connectivity from remote field locations"
      },
      {
        num: "3",
        title: "COLLABORATE",
        desc: "AI-driven dashboards turn data into actionable insights"
      }
    ]
  },
  architecture: {
    header: {
      tag: "SYSTEM ARCHITECTURE",
      title: "Seamless Interoperability",
      description: "An ecosystem built for scale and flexibility, connecting your physical fields to any digital platform."
    },
    pipeline: [
      {
        label: "FIELD SENSORS",
        text: "Industrial soil moisture, weather, and environmental sensors capture real-time agricultural telemetry."
      },
      {
        label: "LoRaWAN GATEWAY",
        text: "Long-range, low-power LoRaWAN gateways collect telemetry across up to 15km radius without cellular dependencies."
      },
      {
        label: "CROPIFAI CLOUD",
        text: "A unified IoT cloud platform to ingest, process, and analyze high-frequency field telemetry in real-time."
      },
      {
        label: "CLOUD INTEGRATION",
        text: "API-ready integrations connecting farm operations to ERPs, SCADA systems, AWS, Azure, and local servers."
      },
      {
        label: "DASHBOARD",
        text: "Intuitive farm maps, live moisture analytics, automated valve control triggers, and instant alerts."
      }
    ]
  },
  businessModels: {
    header: {
      tag: "OUR BUSINESS MODELS",
      title: "Two Ways to Work With Us",
      description: "Choose the deployment model that best fits your capital structure and operational preferences."
    },
    comparison: [
      {
        id: "capex",
        solaas: {
          title: "CAPITAL EXPENDITURE",
          description: "Zero Upfront Hardware Cost",
          details: "We supply all devices, gateways, and connectivity under a comprehensive subscription."
        },
        paas: {
          title: "ASSET OWNERSHIP",
          description: "Full Hardware Ownership",
          details: "Make a one-time purchase for all hardware, giving you complete permanent ownership of the assets."
        }
      },
      {
        id: "costs",
        solaas: {
          title: "RECURRING EXPENSES",
          description: "Predictable OpEx Structure",
          details: "Fixed monthly or annual pricing with no surprise maintenance or replacement bills."
        },
        paas: {
          title: "RECURRING EXPENSES",
          description: "Lower Ongoing Costs",
          details: "Your recurring subscription strictly covers the cloud platform and data storage, significantly reducing operational expenses."
        }
      },
      {
        id: "management",
        solaas: {
          title: "MAINTENANCE & SUPPORT",
          description: "Fully Managed Service",
          details: "Enjoy total peace of mind. We handle AMC, warranty, installation, and the entire device lifecycle."
        },
        paas: {
          title: "INFRASTRUCTURE CONTROL",
          description: "Complete Client Control",
          details: "Manage your own infrastructure, deployment, and device maintenance according to your internal IT policies."
        }
      }
    ],
    scope: {
      solaas: {
        included: [
          "Annual Maintenance (AMC) covering hardware & software",
          "Warranty coverage for the full active subscription period",
          "Supply of IP-rated & non-IP-rated devices",
          "Configuration, commissioning & radio planning",
          "Outdoor gateway supply & monthly connectivity charges",
        ],
        excluded: [
          "Platform customizations or feature changes",
          "On-site civil works (drilling, structural mounting)",
          "Client-side IT infrastructure, computers, or internet",
          "Site acquisition, poles, or power arrangements",
        ]
      },
      paas: {
        included: [
          "Cloud-based monitoring platform & data visualization",
          "Data storage & historical data access",
          "Basic analytics, reporting & alert management",
          "User access management & role-based permissions",
          "Platform maintenance, updates & security patches",
        ],
        excluded: [
          "Platform customizations",
          "On-site civil works (drilling, structural mounting)",
          "Internet connectivity, computers, or laptops",
          "Gateways in case of no coverage",
          "AI Module and related dashboards",
        ]
      }
    }
  },
  cta: {
    title: {
      line1: "Ready to Optimize",
      line2: "Your",
      highlight: "Agriculture?"
    },
    description: "Join leading agri-enterprises saving millions of gallons of water and boosting crop yields with <span class=\"text-primary font-medium\">CropifAI's intelligent, data-driven ecosystem.</span>",
    button: "Contact Sales"
  },
  ecosystem: {
    header: {
      tag: "CORPORATE GROUP",
      title: "Explore the Najhum Ecosystem"
    },
    items: [
      {
        title: "IoTRICs",
        desc: "IoT platforms for connected assets, real-time data, and operational intelligence.",
        href: "/platforms/iotrics"
      },
      {
        title: "EVOLTICS",
        desc: "Smart EV charging management for connected and sustainable mobility.",
        href: "/platforms/evoltics"
      },
      {
        title: "Smart Irrigation",
        desc: "IoT-powered irrigation and precision agriculture for smarter water management.",
        href: "/"
      },
      {
        title: "ESG & Sustainability",
        desc: "Data-driven energy and carbon solutions for measurable sustainability.",
        href: "/"
      }
    ]
  },
  hardware: {
    header: {
      tag: "Hardware & Sensors",
      titlePart1: "Crop & Soil Sensing",
      titlePart2: "Systems",
      description: "Industrial-grade IoT devices built to withstand harsh desert conditions while delivering pinpoint accuracy."
    },
    categories: [
      {
        title: "Soil Sensors",
        color: "text-emerald-700",
        borderColor: "border-emerald-200",
        bgColor: "bg-emerald-50",
        glow: "group-hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)]",
        features: ["Soil Moisture", "Electrical Conductivity (EC)", "pH Level", "Temperature", "NPK (N, P, K)", "Soil Heat Flux"]
      },
      {
        title: "Water Sensors",
        color: "text-blue-700",
        borderColor: "border-blue-200",
        bgColor: "bg-blue-50",
        glow: "group-hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)]",
        features: ["pH", "Electrical Conductivity (EC)", "Hardness (Ca²⁺, Mg²⁺)", "TDS", "Salinity (Fertigation)"]
      },
      {
        title: "Weather Station",
        color: "text-teal-700",
        borderColor: "border-teal-200",
        bgColor: "bg-teal-50",
        glow: "group-hover:shadow-[0_20px_60px_-15px_rgba(20,184,166,0.3)]",
        features: ["Wind Speed & Direction", "Humidity & Temperature", "Rainfall", "Solar-Powered", "LoRaWAN (15km range)"]
      }
    ],
    timelineProducts: [
      { 
        name: "Industrial Soil Sensor", 
        image: "/products/cropifai/soilsensor.png",
        description: "Multi-parameter soil sensing for precision agriculture.",
        features: ["Soil Moisture & Temp", "Electrical Conductivity (EC)", "pH Level", "NPK (N, P, K)"]
      },
      { 
        name: "LoRaWAN Weather Station", 
        image: "/products/cropifai/LoRaWan_iotWeatherStation.png",
        description: "Comprehensive environmental monitoring with 15km range.",
        features: ["Wind Speed & Direction", "Humidity & Temperature", "Rainfall Measurement", "Solar-Powered"]
      },
      { 
        name: "Solenoid Valve Controller", 
        image: "/products/cropifai/solenoidValveController.png",
        description: "Automated irrigation control for multiple zones.",
        features: ["0–100% Flow Control", "Open/Close Precision", "Multicast Control"]
      },
      { 
        name: "Smart Valve Controller", 
        image: "/products/cropifai/SmartValveController.png",
        description: "Intelligent autonomous operation for off-grid deployment.",
        features: ["Autonomous Operation", "Battery Backup", "NFC Configuration"]
      },
      { 
        name: "Industrial pH Sensor", 
        image: "/products/cropifai/Phsensor.png",
        description: "High-precision pH monitoring for optimal nutrient uptake.",
        features: ["Real-time pH Tracking", "Anti-Fouling Design", "Automatic Calibration"]
      }
    ],
    tags: ["Ruggedized for Desert", "LoRaWAN Connectivity", "IP67 Rated", "Low Maintenance", "NFC Configuration"],
    flowControls: [
      { title: "Solenoid Valve Control", desc: "Percentage control 0–100%, open/close precision" },
      { title: "Autonomous Operation", desc: "Solar-powered, battery backup, works off-grid" },
      { title: "Cycle Irrigation", desc: "Set start time, duration, capacity, cycle number" },
      { title: "Fertigation Dosing", desc: "Automated nutrient dosing, variable-rate application" },
      { title: "Safety Alarms", desc: "Web notifications for flow, pressure, sensor breakdown" },
      { title: "Multicast Control", desc: "Bulk valve control across multiple zones simultaneously" }
    ]
  },
  impact: {
    header: {
      tag: "PROVEN IMPACT",
      title: "Real-World Impact",
      description: "Field-proven technology deployed across residential, commercial, and agricultural projects."
    },
    items: [
      { value: "38%", title: "Water Savings", desc: "Smart irrigation optimization", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
      { value: "30%", title: "Crop Quality Improvement", desc: "Precision farming", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
      { value: "35%", title: "Revenue & Profit Increase", desc: "Smart agriculture", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
      { value: "30%", title: "Food Safety Enhancement", desc: "Supply chain traceability", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
      { value: "25%", title: "Environmental Impact Reduction", desc: "Sustainable practices", color: "text-teal-500", bg: "bg-teal-500/10", border: "border-teal-500/20" },
      { value: "40%", title: "Market Competitiveness", desc: "Enhanced efficiency", color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" }
    ]
  },
  interface: {
    header: {
      titlePart1: "CENTRALIZED MANAGEMENT —",
      titlePart2: "CLOUD PLATFORM",
      description: "Powered by IoTRICs, providing an intuitive, multi-tenant interface for remote agricultural management and device oversight."
    },
    sidebar: {
      titleLine1: "Everything you need",
      titleLine2: "in one Platform"
    },
    features: [
      { title: "Visual Map Representation", desc: "Pinpoint exact device locations and irrigation zones across farms." },
      { title: "Real-Time Telemetry", desc: "Live sensor monitoring for multi-depth soil moisture and climate." },
      { title: "Over-the-Air (OTA) Control", desc: "Remote valve automation, scheduling, and firmware updates." },
      { title: "Data Analytics & Trends", desc: "Historical water consumption charts, NDVI analysis, and yield insights." }
    ]
  },
  solutions: {
    header: {
      tag: "Core Solutions",
      titlePart1: "The Future of",
      titlePart2: "Smart Agriculture",
      description: "A revolutionary IoT-based agriculture and irrigation system using sensors, devices, and data analytics to monitor and optimize farming operations."
    },
    items: [
      {
        code: "CORE 01",
        title: "Precision Farming",
        description: "Multi-depth soil sensors, weather monitoring, and crop health tracking.",
        tag: "Soil & Crop Telemetry",
        bgImage: "/images/cropify/precision_farming.jpg"
      },
      {
        code: "CORE 02",
        title: "Smart Irrigation",
        description: "Automated valve control, fertigation, and water flow optimization.",
        tag: "Automated Valve Flow",
        bgImage: "/images/cropify/smart_irrigation.jpg"
      },
      {
        code: "CORE 03",
        title: "AI/ML Analytics",
        description: "Satellite imagery, NDVI analysis, yield prediction, and recommendations.",
        tag: "Predictive Yield Models",
        bgImage: "/images/cropify/aiml_analytics.jpg"
      },
      {
        code: "CORE 04",
        title: "Cloud Platform",
        description: "Real-time dashboards, remote monitoring, and multi-site management.",
        tag: "IoTRICs Central Hub",
        bgImage: "/images/cropify/cloud_platform.jpg"
      }
    ]
  },
  whyChoose: {
    header: {
      tag: "BENEFITS",
      titlePart1: "Why Choose",
      titlePart2: "cropifAI™?"
    },
    features: [
      {
        title: "Water Conservation",
        description: "Save millions of gallons annually through precision delivery systems that only water when the plant needs it."
      },
      {
        title: "Crop Quality",
        description: "Ensure optimal growing conditions for maximum yield and quality by monitoring key soil and environmental metrics."
      },
      {
        title: "Cost Reduction",
        description: "Lower energy bills, labor costs, and fertilizer expenses through targeted, automated resource distribution."
      },
      {
        title: "Sustainability",
        description: "Meet environmental goals with eco-friendly smart agriculture practices that reduce your overall carbon footprint."
      }
    ],
    roadmapTitle: "Implementation Roadmap",
    roadmap: [
      {
        num: "1",
        title: "Initial Assessment",
        description: "Reviewing farm topography and crop requirements."
      },
      {
        num: "2",
        title: "Field Survey",
        description: "Sensor placement optimization and network coverage testing."
      },
      {
        num: "3",
        title: "Hardware Deployment",
        description: "Installation of IoT sensors, gateways, and controllers."
      },
      {
        num: "4",
        title: "Cloud Integration",
        description: "Live data feed activation and dashboard configuration."
      },
      {
        num: "5",
        title: "AI Optimization",
        description: "Model training and autonomous irrigation active."
      }
    ]
  },
  workflow: {
    header: {
      tag: "WORKFLOW",
      title: "Data-to-Action Lifecycle"
    },
    steps: [
      {
        num: "01",
        title: "Sense",
        description: "Industrial sensors capture micro-climatic and soil data at 15-minute intervals."
      },
      {
        num: "02",
        title: "Analyze",
        description: "Cloud engines process billions of data points through crop-specific AI models."
      },
      {
        num: "03",
        title: "Decide",
        description: "Actionable recommendations are generated for resource optimization and risk mitigation."
      },
      {
        num: "04",
        title: "Irrigate",
        description: "Smart controllers execute precise water delivery via automated valve management."
      }
    ]
  },
  caseStudies: {
    header: {
      tag: "CASE STUDIES",
      title: "Real-World Impact",
      description: "See how leading organizations are transforming their infrastructure with our smart agriculture and irrigation solutions."
    },
    cases: [
      {
        id: 0,
        client: "Emaar",
        title: "The Greens, Dubai",
        mode: "Proof of Concept",
        location: "The Greens, Dubai",
        launched: "March 2020",
        challenge: "Traditional irrigation causing excessive water waste, inefficient practices, and high maintenance costs in residential community.",
        solution: "Retrofitted existing irrigation with wireless IoT sensors, smart valve controllers, integrated with IoTRICs cloud dashboard.",
        result: "38% reduction in water consumption with optimized irrigation, remote monitoring, and enhanced plant health.",
        metric: "38%",
        metricLabel: "Water Savings Achieved",
        image: "/images/cropifai/the-greens.jpg"
      },
      {
        id: 1,
        client: "Al Rostamani Properties",
        title: "Garden Villa",
        mode: "Commercial Deployment",
        location: "Dubai",
        launched: "2021",
        challenge: "Need for sustainable environments and optimized watering to reduce carbon footprint and operational costs.",
        solution: "Deployed a full cycle system: Sense (Real-time monitoring) → Decide (Smart engine) → Irrigate (Automated cut-off) → Analyze (Central reports).",
        result: "Reduced water consumption, healthier crop growth, zero electrical cabling (solar-powered), and lower operational costs.",
        metric: "100%",
        metricLabel: "Wireless & Solar-Powered",
        image: "/images/cropifai/garden-villa.jpg",
        outcomes: [
          "Reduced water consumption through smart scheduling",
          "Healthier crop growth with optimized soil moisture",
          "No electrical cabling — wireless & solar-powered",
          "Reduced carbon emissions & lower operational cost"
        ],
        components: "Soil Sensors • Smart Controllers • Cloud Monitoring Platform"
      }
    ]
  },
  clients: {
    header: {
      tag: "OUR CLIENTS",
      title: "Our Strategic Partners & Clients",
      description: "Building a smarter future together — trusted by industry leaders across the UAE and beyond."
    },
    carouselLogos: [
      { name: "SPACE42", src: "/logo/client logos/space42-logo.webp" },
      { name: "Nokia", src: "/logo/client logos/nokia-seeklogo.svg" },
      { name: "Thuraya", src: "/logo/client logos/Thuraya-logo.webp" },
      { name: "e&", src: "/logo/client logos/etisalat-seeklogo.svg" },
      { name: "du", src: "/logo/client logos/du-seeklogo.svg" },
      { name: "Emaar", src: "/logo/client logos/emaar-seeklogo.svg" }
    ],
    gridLogos: [
      { name: "Al Rostamani Communications", src: "/logo/client logos/ARC_Logo.png" },
      { name: "DEWA", src: "/logo/client logos/Dubai_Electricity_and_Water_Authority_id40SLA8sS_1.png" },
      { name: "ADAA", src: "/logo/client logos/adaa_gov.png" },
      { name: "UAEAA", src: "/logo/client logos/uaeaa_gov.png" },
      { name: "Aramtec", src: "/logo/client logos/Aramteclogo_400x.avif" },
      { name: "ATGC", src: "/logo/client logos/atgc-logo.svg" },
      { name: "Al Mulla Group", src: "/logo/client logos/Al_Mulla_Group_Logo.svg" },
      { name: "Al Rostamani Properties", src: "/logo/client logos/Al-Rostamani.png" },
      { name: "Gargash", src: "/logo/client logos/gargash.svg" },
      { name: "DTC", src: "/logo/client logos/dtclogo.jpg" },
      { name: "The Dubai Mall", src: "/logo/client logos/dubaimall.png" },
      { name: "Ski Dubai", src: "/logo/client logos/ski_dubai_logo.png" }
    ]
  },
  waterFlow: {
    header: {
      tag: "SMART IRRIGATION & AUTOMATION",
      title: "Automated Water Flow Control"
    },
    image: "/products/cropifai/SolarPoweredWaterFlowSensor.png",
    flowControls: [
      { title: "Solenoid Valve Control", desc: "Percentage control 0–100%, open/close precision" },
      { title: "Autonomous Operation", desc: "Solar-powered, battery backup, works off-grid" },
      { title: "Cycle Irrigation", desc: "Set start time, duration, capacity, cycle number" },
      { title: "Fertigation Dosing", desc: "Automated nutrient dosing, variable-rate application" },
      { title: "Safety Alarms", desc: "Web notifications for flow, pressure, sensor breakdown" },
      { title: "Multicast Control", desc: "Bulk valve control across multiple zones simultaneously" }
    ],
    specs: [
      "IP67 Rated Enclosure",
      "Flexible Power: Solar / Battery / Mains",
      "Internal & External Antenna Options"
    ]
  }
};
