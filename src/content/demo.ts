export const demoContent = {
  hero: {
    titlePart1: "Command Your",
    titlePart2: "Ecosystem.",
    description: "Witness the convergence of industrial hardware and predictive AI. Stream live telemetry from remote assets and govern complex operations through a single, unified interface.",
    buttonExplore: "Explore Dashboards",
    buttonDemo: "Book Guided Demo"
  },
  trustMetrics: [
    { label: "ACTIVE INSTANCES", value: "48+", suffix: "DASHBOARDS" },
    { label: "MARKET REACH", value: "12+", suffix: "INDUSTRIES" },
    { label: "LIVE NODES", value: "4,200+", suffix: "DEVICES" },
    { label: "NETWORK STABILITY", value: "99.98%", suffix: "AVAILABILITY" }
  ],
  architecture: {
    title: "Data Pipeline Architecture",
    description: "End-to-end operational flow from physical asset telemetry to actionable command center intelligence.",
    steps: [
      { iconName: "Activity", label: "Sensors", desc: "Data Collection" },
      { iconName: "Router", label: "Gateways", desc: "Edge Aggregation" },
      { iconName: "Wifi", label: "Network", desc: "Secure Transfer" },
      { iconName: "Cloud", label: "Cloud", desc: "Data Ingestion" },
      { iconName: "BarChart3", label: "Analytics", desc: "AI Processing" },
      { iconName: "Settings2", label: "Automation", desc: "Rule Engine" },
      { iconName: "LayoutDashboard", label: "Dashboards", desc: "Visualization" },
      { iconName: "Target", label: "Decisions", desc: "Actions", isEnd: true }
    ]
  },
  dashboardUI: {
    badge: "Featured Environment",
    title: "Dashboard UI Sample",
    description: "Monitor asset health, track real-time telemetry, and leverage predictive AI models all from a single pane of glass designed for enterprise scale.",
    statusFeed: { label: "Feed Status", value: "LIVE_FEED_STREAMING" },
    statusNode: { label: "Node Identifier", value: "ID: M0C-904X" },
    buttonLabel: "View Demo Dashboard",
    placeholderTitle: "Dashboard Image Space",
    placeholderDesc: "Add your high-resolution platform UI mockup here."
  },
  modules: {
    badge: "Live Environments",
    title: "Launch Command Dashboards.",
    description: "Explore real-time data streams and predictive analytics across our live infrastructure instances.",
    buttonLabel: "Launch Dashboard",
    items: [
      {
        platform: "IoTRICs",
        title: "Unified IoT Platform",
        description: "Connect physical assets, sensors, and infrastructure. Deliver real-time visibility, intelligent alerts, and actionable insights to operate smarter and more efficiently.",
        image: "/images/iotrics/dashboardiortics.png",
        color: "bg-blue-500",
        textColor: "text-blue-500",
        badgeColor: "bg-blue-50 text-blue-600 border-blue-100"
      },
      {
        platform: "EVOLTICS",
        title: "Intelligent EV Charging",
        description: "Deploy and scale intelligent EV charging networks with real-time IoT telemetry, automated load management, and complete operational control.",
        image: "/images/elvotics/cpmsDahsboard.jpeg",
        color: "bg-emerald-500",
        textColor: "text-emerald-500",
        badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100"
      },
      {
        platform: "CropifAI",
        title: "Smart Agriculture Solutions",
        description: "A revolutionary IoT-based agriculture and irrigation system using sensors, devices, and data analytics to monitor and optimize farming operations.",
        image: "/images/cropify/dashboardcropify.png",
        color: "bg-amber-500",
        textColor: "text-amber-500",
        badgeColor: "bg-amber-50 text-amber-600 border-amber-100"
      }
    ]
  },
  enterpriseFeatures: {
    badge: "Enterprise Grade",
    title: "Engineered for scale, security, and strict compliance.",
    description: "Built to seamlessly integrate into the most demanding corporate environments and government infrastructures.",
    features: [
      {
        iconName: "ShieldCheck",
        title: "Role-Based Access",
        description: "Granular user permissions and SSO integration for complex organizations. Ensure strict data governance across all operational teams."
      },
      {
        iconName: "Lock",
        title: "Secure Architecture",
        description: "End-to-end encryption from sensor-to-cloud with hardware-level security."
      },
      {
        iconName: "Cloud",
        title: "Multi-Cloud Ready",
        description: "Deployment flexibility across Azure, AWS, or local on-premise infrastructure."
      },
      {
        iconName: "ActivitySquare",
        title: "SLA Guaranteed",
        description: "99.9% uptime commitments for critical infrastructure monitoring."
      },
      {
        iconName: "Webhook",
        title: "API-First Design",
        description: "Comprehensive RESTful APIs for seamless integration with ERP and CRM systems."
      },
      {
        iconName: "History",
        title: "Audit Compliance & Forensics",
        description: "Full historical data logging for regulatory compliance and safety forensics."
      }
    ]
  },
  portfolios: {
    badge: "Our Ecosystem",
    title: "Platform Portfolios.",
    swipeText: "Swipe to view more",
    items: [
      {
        iconName: "Factory",
        title: "IoTRICs",
        description: "General Industrial IoT management suite for mixed assets and infrastructure monitoring.",
        category: "INDUSTRIAL AUTOMATION",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
        color: "group-hover:text-blue-400",
        link: "/platforms/iotrics"
      },
      {
        iconName: "Zap",
        title: "EVOLTICS",
        description: "Specialized grid-edge analytics for smart meters, EV networks, and renewable energy storage.",
        category: "ENERGY INTELLIGENCE",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
        color: "group-hover:text-emerald-400",
        link: "/platforms/evoltics"
      },
      {
        iconName: "Tractor",
        title: "CropifAI",
        description: "Agritech platform focused on yield optimization and precision soil analysis via satellite and on-site sensors.",
        category: "PRECISION AGRI",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
        color: "group-hover:text-amber-400",
        link: "/platforms/cropifai"
      }
    ]
  },
  techStack: {
    title: "Technology Ecosystem.",
    description: "Built on industry-leading protocols and robust infrastructure to ensure seamless interoperability and military-grade security.",
    connectivity: {
      badge: "Connectivity & Protocols",
      tags: ["LoRaWAN", "NB-IoT", "MQTT", "Modbus", "OPC-UA", "5G/eSIM"]
    },
    infrastructure: {
      badge: "Infrastructure & Compute",
      tags: ["Kube-IoT Clusters", "AWS Greengrass", "Edge Computing", "AI/ML Models", "Kafka Streams"]
    }
  },
  cta: {
    titlePart1: "Want to See Your Own",
    titlePart2: "Infrastructure Live?",
    description: "Book a personalized session with our engineering team to map your physical assets to a digital twin prototype.",
    buttonLabel: "CONNECT WITH AN ARCHITECT"
  }
};
