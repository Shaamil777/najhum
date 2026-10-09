export const iotricsContent = {
  hero: {
    title: {
      line1: "SMARTER CONNECTED",
      line2: "OPERATIONS"
    },
    description: "IoTRICs connects your physical assets, sensors, and infrastructure to a unified IoT platform—delivering real-time visibility, intelligent alerts, and actionable insights to help you operate smarter and more efficiently.",
    cta: {
      primary: "Explore IoTRICs"
    },
    marqueeText: "TRUSTED BY COMPANIES WORLDWIDE",
    clients: [
      { name: "DEWA", src: "/logo/client%20logos/Dubai_Electricity_and_Water_Authority_id40SLA8sS_1.png" },
      { name: "ADAA", src: "/logo/client%20logos/adaa_gov.png" },
      { name: "UAEAA", src: "/logo/client%20logos/uaeaa_gov.png" },
      { name: "Nokia", src: "/logo/client%20logos/nokia-com-wordmark.png" },
      { name: "Thuraya", src: "/logo/client%20logos/Thuraya_logo.png" },
      { name: "Space42", src: "/logo/client%20logos/space42.png" },
      { name: "Aramtec", src: "/logo/client%20logos/aramtec.png" },
      { name: "Yahsat", src: "/logo/client%20logos/idsuguLgbe.png" }
    ]
  },
  about: {
    header: {
      titlePart1: "From Physical Assets",
      titlePart2: "to Actionable Intelligence",
      description: "IoTRICs connects your physical infrastructure to a unified IoT platform. Collect data in real-time, transmit it securely, and turn it into actionable insights for smarter operations."
    },
    cards: [
      {
        num: "01",
        label: "COLLECT",
        title: "Capture What Matters",
        description: "Industrial-grade sensors capture critical environmental and operational data across your assets."
      },
      {
        num: "02",
        label: "CONNECT",
        title: "Move Data Reliably",
        description: "Resilient connectivity options ensure your data reaches the platform from anywhere, every time."
      },
      {
        num: "03",
        label: "COLLABORATE",
        title: "Turn Data Into Decisions",
        description: "Powerful cloud intelligence delivers real-time visualization, alerts, and predictive insights to help you act faster."
      }
    ],
    pipeline: [
      { label: "ASSETS", text: "One connected intelligence layer for your entire infrastructure." },
      { label: "SENSORS", text: "Industrial-grade sensors capture critical data across your assets." },
      { label: "CONNECTIVITY", text: "Resilient connectivity ensures your data reaches the platform securely." },
      { label: "IOTRICS CLOUD", text: "A unified cloud platform to ingest, process, and store operational data." },
      { label: "INSIGHTS", text: "Real-time visualization and analytics to help you make smarter decisions." },
      { label: "ACTION", text: "Configurable alerts and automated triggers for immediate response." }
    ]
  },
  businessModel: {
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
        title: "SolaaS",
        included: [
          "Annual Maintenance (AMC) covering hardware & software",
          "Warranty coverage for the full active subscription period",
          "Supply of IP-rated & non-IP-rated devices",
          "Configuration, commissioning & radio planning",
          "Outdoor gateway supply & monthly connectivity charges"
        ],
        excluded: [
          "Platform customizations or feature changes",
          "On-site civil works (drilling, structural mounting)",
          "Client-side IT infrastructure, computers, or internet",
          "Site acquisition, poles, or power arrangements"
        ]
      },
      paas: {
        title: "PaaS",
        included: [
          "Cloud-based monitoring platform & data visualization",
          "Data storage & historical data access",
          "Basic analytics, reporting & alert management",
          "User access management & role-based permissions",
          "Platform maintenance, updates & security patches"
        ],
        excluded: [
          "Platform customizations",
          "On-site civil works (drilling, structural mounting)",
          "Internet connectivity, computers, or laptops",
          "Gateways in case of no coverage",
          "AI Module and related dashboards"
        ]
      }
    }
  },
  core: {
    header: {
      title: "The Intelligence Layer Behind Your Operations",
      description: "End-to-end capabilities to capture data, monitor assets, and generate actionable insights for your operations in real time."
    },
    modules: [
      {
        id: "monitoring",
        title: "01 — MONITORING & DATA ACQUISITION",
        subtitle: "Capture What Matters",
        description: "IoTRICs continuously collects real-time data from physical assets across geographically distributed locations, supporting multiple sensor types and deployment environments.",
        keyCapabilities: [
          "Multi-sensor data collection",
          "Real-time asset monitoring",
          "Fixed and mobile deployments",
          "Environmental and operational data capture",
          "Support for geographically distributed assets"
        ],
        tags: ["REAL-TIME", "MULTI-SENSOR", "ANY ASSET", "ANY LOCATION"]
      },
      {
        id: "alerts",
        title: "02 — INTELLIGENT ALERTS & EVENTS",
        subtitle: "Know When Something Needs Attention",
        description: "IoTRICs identifies abnormal conditions and triggers configurable alerts so teams can respond quickly when operational thresholds are exceeded.",
        keyCapabilities: [
          "Threshold-based alerts",
          "SMS, email & push notifications",
          "Abnormal-condition detection",
          "Event logging",
          "Faster operational response"
        ],
        tags: ["SMART ALERTS", "THRESHOLDS", "NOTIFICATIONS", "EVENT LOGGING"]
      },
      {
        id: "visibility",
        title: "03 — ENVIRONMENTAL & ASSET VISIBILITY",
        subtitle: "See Your Infrastructure in Real Time",
        description: "Monitor critical environmental and asset conditions from a centralized platform. IoTRICs brings information such as temperature, humidity, water levels, air quality, energy, pressure, and vibration into a unified operational view.",
        keyCapabilities: [
          "Temperature & Humidity monitoring",
          "Water-level & Air-quality monitoring",
          "Energy, pressure & vibration monitoring",
          "Asset condition visibility",
          "Centralized dashboard view"
        ],
        tags: ["TEMPERATURE", "HUMIDITY", "WATER", "AIR QUALITY"]
      },
      {
        id: "energy",
        title: "04 — ENERGY & RESOURCE INTELLIGENCE",
        subtitle: "Turn Consumption Data Into Efficiency",
        description: "IoTRICs enables advanced monitoring of energy and resource consumption, helping organizations understand load patterns and identify opportunities for greater efficiency and sustainability.",
        keyCapabilities: [
          "Consumption monitoring",
          "Load-pattern analysis",
          "Energy & Resource visibility",
          "Efficiency insights",
          "Sustainability initiatives",
          "Peak-load and demand management"
        ],
        tags: ["ENERGY", "CONSUMPTION", "LOAD ANALYSIS", "EFFICIENCY"]
      },
      {
        id: "tracking",
        title: "05 — MOVEMENT & UTILISATION TRACKING",
        subtitle: "Know Where Your Assets Are — And How They're Used",
        description: "Track asset utilization and operational movement to improve visibility across fleets, equipment, and mobile assets.",
        keyCapabilities: [
          "Asset utilization tracking",
          "Mobile asset visibility",
          "Fleet monitoring",
          "Equipment tracking",
          "Movement visibility",
          "Data-driven performance evaluation"
        ],
        tags: ["ASSET TRACKING", "UTILISATION", "FLEET", "MOBILITY"]
      },
      {
        id: "analytics",
        title: "06 — ANALYTICS, REPORTING & COMPLIANCE",
        subtitle: "Turn Data Into Better Decisions",
        description: "IoTRICs transforms collected operational data into actionable intelligence through real-time dashboards, historical analysis, predictive analytics, reporting, and compliance support.",
        keyCapabilities: [
          "Real-time dashboards",
          "Historical data & Trend analysis",
          "Predictive analytics",
          "Reporting & Audit support",
          "Performance evaluation",
          "Compliance visibility"
        ],
        tags: ["DASHBOARDS", "ANALYTICS", "REPORTING", "COMPLIANCE"]
      }
    ],
    cta: "EXPLORE OUR MODULES"
  },
  capabilities: {
    header: {
      tag: "6 CORE CAPABILITIES",
      title: "Everything you need to run data-driven operations"
    },
    items: [
      {
        id: "01",
        num: "01",
        shortTitle: "Data Acquisition",
        title: "Monitoring & Data Acquisition",
        description: "Continuous data capture from any sensor, any asset, any geography. Fixed and mobile deployments supported.",
        tag: "OPTIMIZATION_ALPHA",
        image: "/images/iotrics/capability_1.jpg",
        badge: "Real-Time Ingestion"
      },
      {
        id: "02",
        num: "02",
        shortTitle: "Alerts & Events",
        title: "Intelligent Alerts & Events",
        description: "Configurable threshold-based alerts via SMS, email, and push notification. Full event logging for traceability.",
        tag: "ALERT_LOGIC_BETA",
        image: "/images/iotrics/capability_2.jpg",
        badge: "Threshold Triggers"
      },
      {
        id: "03",
        num: "03",
        shortTitle: "Environmental Visibility",
        title: "Environmental & Asset Visibility",
        description: "Temperature, humidity, energy, water, air quality, and asset status — all centralised in one dashboard view.",
        tag: "CONDITION_GAMMA",
        image: "/images/iotrics/capability_3.jpg",
        badge: "Facility Environment"
      },
      {
        id: "04",
        num: "04",
        shortTitle: "Energy Intelligence",
        title: "Energy & Resource Intelligence",
        description: "Sub-meter monitoring, load analysis, peak demand detection, and ESG reporting — all from one platform.",
        tag: "SUBMETER_DELTA",
        image: "/images/iotrics/capability_4.jpg",
        badge: "Smart Metering"
      },
      {
        id: "05",
        num: "05",
        shortTitle: "Movement Tracking",
        title: "Movement & Utilisation Tracking",
        description: "Mobile asset location, logistics visibility, fleet and equipment tracking — real-time, always current.",
        tag: "TELEMATICS_EPSILON",
        image: "/images/iotrics/capability_5.jpg",
        badge: "Fleet Logistics"
      },
      {
        id: "06",
        num: "06",
        shortTitle: "Analytics & Compliance",
        title: "Analytics, Reporting & Compliance",
        description: "Historical data, trend analysis, automated report generation, and audit-ready exports on demand.",
        tag: "AUDIT_COMPLIANCE_ZETA",
        image: "/images/iotrics/capability_6.jpg",
        badge: "Audit Reports"
      }
    ]
  },
  industries: {
    header: {
      titlePart1: "One IoT Platform.",
      titlePart2: "Built for Every Industry.",
      description: "From facilities and manufacturing to logistics and smart infrastructure, IoTRICs adapts to the environments where real-time asset visibility, monitoring, and intelligence matter most."
    },
    items: [
      {
        number: "01",
        title: "Facilities Management",
        desc: "Monitor building environments, equipment, energy consumption, and critical infrastructure from one connected platform.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "02",
        title: "Cold Storage",
        desc: "Track temperature, humidity, and environmental conditions in real time to maintain critical storage conditions and respond to abnormal conditions.",
        image: "https://images.unsplash.com/photo-1551313158-73d016a829ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHN0b3JhZ2V8ZW58MHx8MHx8fDA%3D"
      },
      {
        number: "03",
        title: "Hospitality",
        desc: "Monitor guest environments, energy usage, equipment, and facility conditions to improve operational efficiency and service reliability.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "04",
        title: "Industrial & Manufacturing",
        desc: "Connect industrial assets and equipment to monitor operational conditions, identify anomalies, and improve efficiency.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "05",
        title: "Logistics",
        desc: "Track assets and operational conditions across distributed locations, helping teams gain greater visibility across their logistics operations.",
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "06",
        title: "Smart Cities & Infrastructure",
        desc: "Connect distributed infrastructure and environmental systems to create real-time visibility across smart-city operations.",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "07",
        title: "Agriculture",
        desc: "Monitor environmental and operational conditions across agricultural environments using connected sensors and real-time data.",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "08",
        title: "Retail",
        desc: "Connect and monitor retail environments, assets, and operational conditions through a centralized IoT platform.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  methodology: {
    header: {
      title: "The 3C Methodology",
      description: "Our framework for transforming physical infrastructure into intelligent, connected operations."
    },
    steps: [
      {
        step: "01",
        title: "Collect",
        desc: "Integrate sensors, assets, and infrastructure into a unified ecosystem using open communication protocols."
      },
      {
        step: "02",
        title: "Connect",
        desc: "Process real-time data across cloud and edge to transform raw telemetry into actionable intelligence."
      },
      {
        step: "03",
        title: "Collaborate",
        desc: "Automate decisions, orchestrate workflows, and execute operational responses without manual intervention."
      }
    ]
  },
  cta: {
    title: {
      line1: "Ready to Connect",
      line2: "Your",
      highlight: "Operations?"
    },
    description: "Partner with IoTRICs for end-to-end IoT deployment, real-time monitoring, and intelligent insights across your connected infrastructure.",
    button: "Get Started"
  }
};
