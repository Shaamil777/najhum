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
      { label: "CORE PLATFORMS", value: "3+", iconName: "Cpu" },
      { label: "SERVER IN", value: "Dubai", iconName: "Globe2" },
      { label: "IOT EXPERTISE", value: "Industrial", iconName: "BarChart3" },
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
        description: "Data is securely transmitted via NB-IoT, LoRaWAN, or 5G private networks to our central processing ecosystem.",
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
    badge: "The Architecture",
    titlePart1: "One Group. ",
    titlePart2: "Three Intelligent Platforms.",
    description: "Purpose-built platforms addressing critical global challenges through intelligent technology, real-world impact, and long-term sustainability.",
    platforms: [
      {
        code: "CORE 01",
        name: "IOTRICS",
        description: "Advanced IoT asset management and sensor integration for real-time visibility across global supply chains.",
        href: "/platforms/iotrics",
        badgeType: "iotrics"
      },
      {
        code: "CORE 02",
        name: "EVOLTICS",
        description: "Energy management and optimization platform designed for smart cities and high-consumption industrial plants.",
        href: "/platforms/evoltics",
        badgeType: "evoltics"
      },
      {
        code: "CORE 03",
        name: "CROPIFAI",
        description: "AI-driven agricultural intelligence focused on soil health, yield optimization, and resource sustainability.",
        href: "/platforms/cropifai",
        badgeType: "cropifai"
      }
    ],
    footerStatement: "Technology for a More Resilient Tomorrow"
  },
  presence: {
    badge: "Global Presence",
    titlePart1: "Strategic Hub ",
    titlePart2: "in the ",
    titlePart3: "UAE",
    description: "Expanding globally through cloud-first platforms and industry partnerships.",
    address: {
      title: "Dubai, United Arab Emirates",
      description: "in5 Design — Zaa'beel Second — Dubai Design District"
    },
    contact: {
      title: "Get in Touch",
      phone: "+971 52 569 9979"
    },
    cloudBadge: "Cloud-First Global Reach"
  },
  trust: {
    badge: "Trusted Across Industries",
    titlePart1: "Powering Intelligent Infrastructure ",
    titlePart2: "for Leading Organizations",
    subtitleText: "Supporting organizations across",
    industries: [
      "Energy",
      "Telecommunications",
      "Smart Buildings",
      "Commercial Real Estate",
      "Industrial Facilities",
    ],
    quote: "From enterprise campuses to national infrastructure, Najhum delivers intelligent solutions that scale."
  }
};
