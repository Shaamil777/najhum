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
    cta: "View Demo Dashboard"
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
        shortTitle: "Sensor Monitoring",
        title: "Sensor Monitoring & Data Acquisition",
        description: "Sensors on your equipment take a reading every few minutes and send it to the platform — temperature, humidity, pressure, water flow, vibration, door state. They report to the Najhum IoT Controller on site, which forwards the data to the platform over LoRaWAN, cellular or satellite — so a site with no network of its own still reports. Instead of someone walking the site with a clipboard, the current state of every asset is on screen, with the history behind it.",
        tag: "REAL-TIME TELEMETRY",
        image: "/images/iotrics/capability_1.webp",
        badge: "Real-Time Telemetry"
      },
      {
        id: "02",
        num: "02",
        shortTitle: "Alerts & Events",
        title: "Automated Alerts & Event Management",
        description: "You set the limits that matter — a freezer above −18°C, a pump drawing more current than usual, a door left open. When a reading crosses one, the platform sends an alert by email, SMS or webhook to the person responsible for that site. Each alert carries its severity and has to be acknowledged, and anything left unanswered escalates, so a problem at 2am is not discovered at 9.",
        tag: "THRESHOLD ALERTS",
        image: "/images/iotrics/capability_2.webp",
        badge: "Threshold Alerts"
      },
      {
        id: "03",
        num: "03",
        shortTitle: "Condition Monitoring",
        title: "Environmental & Condition Monitoring",
        description: "Continuous monitoring of the conditions inside cold rooms, warehouses, plant rooms and offices: temperature, humidity, air quality, and water leak or flood detection under raised floors and around tanks. For cold storage the record is unbroken, which is what an auditor asks for, and a leak is caught as a reading rather than as damage found the next morning.",
        tag: "COLD CHAIN · LEAK DETECTION",
        image: "/images/iotrics/capability_3.webp",
        badge: "Cold Chain · Leak Detection"
      },
      {
        id: "04",
        num: "04",
        shortTitle: "Energy & Sub-Metering",
        title: "Energy Monitoring & Sub-Metering",
        description: "Sub-meters on individual circuits show which equipment is actually consuming the power, not just what the building total was last month. You see load profiles through the day, when peak demand occurs and what causes it — the basis for shifting loads, choosing a tariff, or proving that a change saved something.",
        tag: "SUB-METERING",
        image: "/images/iotrics/capability_4.webp",
        badge: "Sub-Metering"
      },
      {
        id: "05",
        num: "05",
        shortTitle: "Asset Tracking",
        title: "Asset Tracking & Utilisation",
        description: "Tags and sensors report where movable assets are and how much they are used — location across sites, runtime hours on a machine, how often a space is occupied. It answers the two questions that usually get guessed: do we have more of this than we need, and where did it go.",
        tag: "UTILISATION",
        image: "/images/iotrics/capability_5.webp",
        badge: "Utilisation"
      },
      {
        id: "06",
        num: "06",
        shortTitle: "Analytics & Compliance",
        title: "Reporting, Analytics & Compliance",
        description: "Every reading is kept, so any period can be reported on after the fact. Reports can be scheduled and sent automatically, exported for an inspection, or used to compare this month against last. Because the data is logged continuously and alerts carry who acknowledged them and when, the audit trail is a by-product rather than a separate exercise.",
        tag: "AUDIT TRAIL",
        image: "/images/iotrics/capability_6.jpg",
        badge: "Audit Trail"
      }
    ]
  },
  industries: {
    header: {
      titlePart1: "Industrial IoT monitoring, built for every industry.",
      titlePart2: "",
      description: "IoTRICs is deployed in buildings, cold stores, factories, warehouses, farms and retail sites across the UAE. The sensors and the readings change by sector; the Najhum IoT Controller, the platform and the dashboard do not., IoTRICs adapts to the environments where real-time asset visibility, monitoring, and intelligence matter most."
    },
    items: [
      {
        number: "01",
        title: "Facilities & Building Management",
        desc: "Smart building monitoring for offices, towers and mixed-use developments — indoor temperature and humidity, air quality, chiller and AHU performance, water tank levels, pump status and energy use per floor. Integrates with your existing BMS rather than replacing it, giving facility management teams one dashboard across a portfolio of buildings.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "02",
        title: "Cold Storage & Cold Chain",
        desc: "Cold room and freezer temperature monitoring with continuous humidity and door-open logging, plus compressor runtime and defrost cycles. Automated alerts fire before stock is at risk, and the unbroken temperature record is the evidence a food safety or HACCP audit asks for.",
        image: "https://images.unsplash.com/photo-1551313158-73d016a829ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHN0b3JhZ2V8ZW58MHx8MHx8fDA%3D"
      },
      {
        number: "03",
        title: "Hotels & Hospitality",
        desc: "Guest room and back-of-house monitoring across a property — room temperature and humidity, kitchen and cold store conditions, laundry and plant room equipment, water consumption and energy per zone. Maintenance teams see a fault before a guest reports it.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "04",
        title: "Manufacturing & Industrial Plants",
        desc: "Machine condition monitoring on the factory floor — vibration, motor temperature, current draw, runtime hours and compressed air or steam pressure. Trends flag equipment drifting out of normal, turning an unplanned stoppage into scheduled predictive maintenance, with OEE and downtime reported from the same data.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "05",
        title: "Logistics & Warehousing",
        desc: "Warehouse and distribution centre monitoring — ambient and chilled zone conditions, dock door activity, forklift and asset utilisation, and in-transit temperature for refrigerated loads. Location and condition reporting across distributed sites, on one platform.",
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "06",
        title: "Smart Cities & Public Infrastructure",
        desc: "Remote monitoring of distributed public assets — water networks and reservoirs, pumping stations, street lighting, flood and water leak detection in underpasses and basements, and environmental and air quality sensing. Long-range LoRaWAN and cellular coverage reaches sites with no fixed network.",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "07",
        title: "Agriculture & Farming",
        desc: "Smart farming and irrigation monitoring — soil moisture and salinity, weather station data, water flow, tank levels and valve position, with scheduling and remote control of irrigation. Built for farms and landscaped estates where mains power and network coverage are limited.",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"
      },
      {
        number: "08",
        title: "Retail & Supermarkets",
        desc: "Store and chiller monitoring across a retail estate — display cabinet and cold room temperature, HVAC and lighting energy use, and footfall or occupancy by store. One view across every branch, with alerts routed to the area manager responsible.",
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
