/**
 * About Page / Section Content
 *
 * This file holds the content for both the standalone About page
 * and the About summary section on the Homepage.
 */

export const aboutContent = {
  homeSummary: {
    badge: "About Najhum",
    headline: "Architecting the Future of Enterprise Technology",
    description: "We are a collective of engineers, designers, and strategists dedicated to pushing the boundaries of what is possible. By bridging the gap between hardware and software, we build platforms that define the next era of digital transformation.",
    features: [
      {
        title: "Global Scale",
        description: "Deployed across 40+ countries with 99.99% uptime guarantees."
      },
      {
        title: "Uncompromising Security",
        description: "Built on zero-trust architectures to protect enterprise data."
      },
      {
        title: "Sustainable Innovation",
        description: "Green tech initiatives that reduce carbon footprints by 30%."
      }
    ],
    cta: {
      label: "Read Our Story",
      href: "/about"
    }
  },
  hero: {
    titlePart1: "Turning Infrastructure",
    titlePart2: "Into Intelligence",
    description: "Najhum Group bridges the gap between physical assets and digital clarity through a proprietary hardware-agnostic industrial ecosystem.",
    ctaPrimary: {
      label: "Our Technology",
      href: "#technology"
    },
    ctaSecondary: {
      label: "Get In Touch",
      href: "/contact"
    },
    stats: [
      { label: "FOUNDED", value: "2017", iconName: "Activity" },
      { label: "CORE PLATFORMS", value: "3", iconName: "Cpu" },
      { label: "Data residency", value: "Dubai", iconName: "Globe2" },
      { label: "Focus", value: "Industrial", iconName: "BarChart3" },
    ]
  },
  intro: {
    titlePart1: "An Uncompromising Approach to ",
    titlePart2: "Industrial Data.",
    description: "Founded with a vision to redefine how industries interact with their operational environments, Najhum Group has evolved into a powerhouse of technical innovation. We believe that data is only as good as the infrastructure that captures it — and the intelligence that refines it.",
    ecosystemFlow: ["SENSORS", "CONNECTIVITY", "CLOUD & ANALYTICS", "STRATEGIC DECISIONS"],
    stats: {
      founded: 2017,
      corePlatforms: 3,
      serverIn: "Dubai",
      iotExpertise: "Industrial"
    }
  },
  methodology: {
    badge: "The Methodology",
    titlePart1: "HOW DATA BECOMES ",
    titlePart2: "DECISIONS",
    steps: ["Collect", "Connect", "Collaborate"],
    phases: [
      {
        code: "PHASE_01",
        title: "COLLECT",
        tag: "Real-time Insight",
        description: "We deploy ruggedized sensors across your physical infrastructure to capture high-fidelity operational data at the source.",
        iconName: "Radar"
      },
      {
        code: "PHASE_02",
        title: "CONNECT",
        tag: "Secure Connectivity",
        description: "Data is securely transmitted via NB-IoT, LPWAN, or 5G private networks to our central processing ecosystem.",
        iconName: "Wifi"
      },
      {
        code: "PHASE_03",
        title: "COLLABORATE",
        tag: "Intelligent Outcomes",
        description: "Proprietary ML models convert raw signals into actionable boardroom intelligence and autonomous field responses.",
        iconName: "BrainCircuit"
      }
    ],
    footerStatement: "Technology For A More Resilient Tomorrow"
  },
  platform: {
    badge: "The Platforms",
    titlePart1: "One Group. ",
    titlePart2: "Three Intelligent Platforms.",
    description: "Three platforms, one company. Each built for a different kind of operation, each running on the same sensing, connectivity and cloud layer.",
    platforms: [
      {
        code: "CORE 01",
        name: "IoTRICS",
        description: "Industrial monitoring for facilities, utilities and cold chain — sensors, alerts and live dashboards on one platform.",
        href: "/platforms/iotrics",
        badgeType: "iotrics"
      },
      {
        code: "CORE 02",
        name: "EVOLTICS",
        description: "EV charging management for any OCPP charger — one network for access, uptime, session records and driver payments.",
        href: "/platforms/evoltics",
        badgeType: "evoltics"
      },
      {
        code: "CORE 03",
        name: "CropifAI",
        description: "Agricultural monitoring and irrigation control — soil moisture, flow and valve scheduling from one dashboard.",
        href: "/platforms/cropifai",
        badgeType: "cropifai"
      }
    ]
  },
  presence: {
    badge: "Global Presence",
    titlePart1: "Strategic Hub ",
    titlePart2: "in the ",
    titlePart3: "UAE",
    description: "Expanding globally through cloud-first platforms and industry partnerships.",
    address: {
      title: "Dubai, United Arab Emirates",
      description: "in5 Innovation Centre — Zaa'beel Second — Dubai Design District"
    },
    contact: {
      title: "Get in Touch",
      phone: "+971 55 617 7234",
      secondaryPhone: "+971 52 569 9979"
    },
    cloudBadge: "Cloud-First Global Reach"
  },
  trust: {
    badge: "WHERE OUR SYSTEMS RUN",
    titlePart1: "Deployed across utilities, buildings, ",
    titlePart2: "cold storage and agriculture.",
    subtitleText: "Supporting organizations across",
    industries: [
      "Utilities",
      "Commercial buildings",
      "Cold Storage",
      "EV charging",
      "Agriculture",
    ],
    quote: "From a single site to a multi-site estate, on the same platform and the same subscription."
  }
};
