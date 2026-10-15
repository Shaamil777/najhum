/**
 * Contact Page Content
 */

export const contactContent = {
  hero: {
    titlePart1: "Let's Build The ",
    titlePart2: "Future",
    titlePart3: " Together.",
    description: "Whether you're looking for enterprise IoT deployment, a complete EV charging network, or precision agriculture, our team of experts is ready to help."
  },
  address: {
    headerTitle1: "Global Presence.",
    headerTitle2: "Local Support.",
    headerDescription: "Reach out to our teams across different departments. We're here to help you build the future of connected infrastructure.",
    details: [
      {
        title: "Visit Us",
        iconName: "MapPin",
        type: "address",
        location: "Dubai Office",
        addressLine1: "in5 Innovation Centre, Dubai Design District",
        linkText: "View on Maps",
        mapsUrl: "https://maps.google.com/?q=in5+Innovation+Centre+Dubai+Design+District"
      },
      {
        title: "Email Us",
        iconName: "Mail",
        type: "emails",
        emails: [
          { label: "General", address: "info@najhumgroup.com" },
          { label: "Sales", address: "sales@najhumgroup.com" },
          { label: "Support", address: "support@najhumgroup.com" }
        ]
      },
      {
        title: "Call Us",
        iconName: "Phone",
        type: "phones",
        phones: [
          { label: "Office", number: "+971 55 767 5883" },
          { label: "Sales", number: "+971 55 767 5883" },
          { label: "Support", number: "+971 55 767 5883" }
        ]
      },
      {
        title: "Business Hours",
        iconName: "Clock",
        type: "hours",
        days: "Monday - Friday",
        hours: "9:00 AM - 6:00 PM (GST)",
        note: "Closed on weekends and public holidays."
      }
    ]
  },
  cta: {
    titlePart1: "Ready to Transform ",
    titlePart2: "Your ",
    titlePart3: "Operations?",
    descriptionPart1: "Connect ",
    descriptionHighlight: "industrial assets",
    descriptionPart2: ", optimize energy, and unlock real-time operational intelligence with Najhum's enterprise platforms.",
    buttonLabel: "Get in Touch"
  },
  explore: {
    title: "Explore The Najhum Ecosystem",
    ecosystems: [
      {
        title: "IoTRICS",
        desc: "Universal industrial IoT platform for real-time asset monitoring.",
        iconName: "Radio",
        href: "/platforms/iotrics"
      },
      {
        title: "EVOLTICS",
        desc: "Comprehensive management software for EV charging networks.",
        iconName: "PlugZap",
        href: "/platforms/evoltics"
      },
      {
        title: "CropifAI",
        desc: "AI-driven precision agriculture for optimized resource use.",
        iconName: "Sprout",
        href: "/platforms/cropifai"
      }
    ],
    linkLabel: "Learn More"
  },
  faq: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What does Najhum do?",
        answer: "We build and run connected monitoring systems for industrial sites, EV charging networks and farms. Sensors and the Najhum IoT Controller collect the data on site; our cloud platform turns it into dashboards, alerts and reports. Three platforms: IoTRICs for industrial IoT, EVOLTICS for EV charging management, cropifAI for agriculture. Sensors, connectivity, platform and support come from one supplier."
      },
      {
        question: "Do I have to replace the equipment I already have?",
        answer: "No. We install the Najhum IoT Controller on site, and it connects to your existing meters, chillers, chargers and building systems over the protocols they already speak — LoRaWAN, Modbus, BACnet/IP, MQTT and REST — then sends the readings to the platform. The equipment itself is untouched and deployment needs no shutdown."
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
  },
  form: {
    badge: "Start Your Project",
    titlePart1: "How Can We ",
    titlePart2: "Help?",
    description: "Complete the form below to discuss your infrastructure and automation requirements with our technical team.",
    infoCards: [
      {
        title: "Direct Access to Experts",
        desc: "Skip the sales pitch. Talk directly to our solution architects and engineers.",
        iconName: "ShieldCheck"
      },
      {
        title: "Tailored Technical Consultation",
        desc: "Our solution architects evaluate your requirements to provide customized technical and architectural guidance.",
        iconName: "Cpu"
      }
    ]
  }
};