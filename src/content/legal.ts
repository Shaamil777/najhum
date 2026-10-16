export interface LegalSection { title: string; paragraphs: string[]; list?: string[]; table?: { columns: string[]; rows: string[][] } }
export interface LegalDocument { title: string; slug: string; updated: string; pdf: string; sections: LegalSection[] }

export const privacyPolicy: LegalDocument = {
  "title": "Privacy Policy",
  "slug": "privacy-policy",
  "updated": "29-Nov-2025",
  "pdf": "/documents/Najhum_Privacy_Policy.pdf",
  "sections": [
    {
      "title": "Who we are",
      "paragraphs": [
        "Najhum Technologies LLC (\"Najhum\", \"we\", \"us\") operates www.najhumgroup.com (the \"Website\"). We are the controller of personal data collected through the Website. This policy explains what we collect, why, and the rights you have under the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021, the \"PDPL\") and other applicable law.",
        "This policy covers the Website only. Data processed inside our platforms (IoTRICs, EVOLTICS, cropifAI) for clients is governed by the relevant client agreement."
      ]
    },
    {
      "title": "Data we collect",
      "paragraphs": [
        "We do not knowingly collect sensitive personal data, such as health or biometric data, through the Website. Please do not include it in your messages. The Website is not intended for anyone under 18."
      ],
      "table": {
        "columns": [
          "Category",
          "Examples",
          "Source"
        ],
        "rows": [
          [
            "Contact and enquiry details",
            "Name, company, job title, email, phone, country, message content, area of interest",
            "You, through the contact form or email"
          ],
          [
            "Technical data",
            "IP address, browser and device type, pages visited, referring site, date and time of visit",
            "Automatically, through server logs and cookies"
          ],
          [
            "Communication records",
            "Correspondence with our team, meeting requests, proposals requested",
            "You and our team"
          ]
        ]
      }
    },
    {
      "title": "How we use your data",
      "paragraphs": [
        "We do not sell your personal data and do not use it for automated decisions that have legal or similarly significant effects on you."
      ],
      "table": {
        "columns": [
          "Purpose",
          "Legal basis"
        ],
        "rows": [
          [
            "Respond to enquiries and requests for proposals, demos or quotations",
            "Your request, and steps before entering a contract"
          ],
          [
            "Manage our business relationship with you or your organisation",
            "Performance of a contract, or our legitimate business interests"
          ],
          [
            "Send updates about our products and events, where you have opted in",
            "Your consent, which you can withdraw at any time"
          ],
          [
            "Operate, secure and improve the Website",
            "Our legitimate interests in a secure, working website"
          ],
          [
            "Meet legal, regulatory and tax obligations",
            "Legal obligation"
          ]
        ]
      }
    },
    {
      "title": "Sharing your data",
      "paragraphs": [
        "We share personal data only when needed, with:"
      ],
      "list": [
        "service providers who host the Website, send email or support our operations, under contracts requiring them to protect your data",
        "Najhum group companies and authorised partners, where needed to answer your enquiry or deliver a project you requested",
        "professional advisers, such as lawyers and auditors",
        "authorities or courts, where required by law"
      ]
    },
    {
      "title": "International transfers",
      "paragraphs": [
        "Some service providers may store or process data outside the UAE. Where this happens, we transfer data only as permitted by the PDPL, for example to countries with adequate protection or under contractual safeguards."
      ]
    },
    {
      "title": "Cookies",
      "paragraphs": [
        "The Website uses cookies and similar technologies.",
        "You can accept or reject non-essential cookies in our cookie banner, and manage or delete cookies in your browser settings at any time."
      ],
      "list": [
        "Essential cookies keep the Website working and secure. They cannot be switched off.",
        "Analytics cookies help us understand how visitors use the Website. We set them only with your consent."
      ]
    },
    {
      "title": "Retention",
      "paragraphs": [
        "We keep enquiry data for up to 24 months after our last contact if no business relationship follows. We keep client and contract records for as long as UAE law requires, usually up to 5 years after the relationship ends. We then delete or anonymise the data."
      ]
    },
    {
      "title": "Security",
      "paragraphs": [
        "We use appropriate technical and organisational measures to protect personal data, including encrypted (HTTPS) connections, access controls and limited staff access. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security."
      ]
    },
    {
      "title": "Your rights",
      "paragraphs": [
        "Under the PDPL you may:",
        "To use these rights, email info@najhumgroup.com. We may need to confirm your identity and will respond within the period required by law. You may also complain to the UAE Data Office."
      ],
      "list": [
        "request access to the personal data we hold about you",
        "ask us to correct inaccurate or incomplete data",
        "ask us to delete your data, or restrict or stop its processing",
        "object to processing, including direct marketing",
        "receive your data in a structured, machine-readable format",
        "withdraw consent at any time, without affecting earlier processing"
      ]
    },
    {
      "title": "Changes to this policy",
      "paragraphs": [
        "We may update this policy from time to time. The \"Last updated\" date shows the current version. We will highlight significant changes on the Website."
      ]
    },
    {
      "title": "Contact us",
      "paragraphs": [
        "Najhum Technologies LLC",
        "in5 Innovation Center, Dubai Design District, Dubai, UAE",
        "Email: info@najhumgroup.com",
        "Phone: +971 55 617 7234",
        "Website: www.najhumgroup.com"
      ]
    }
  ]
};

export const termsAndConditions: LegalDocument = {
  "title": "Terms & Conditions",
  "slug": "terms-and-conditions",
  "updated": "29-Nov-2025",
  "pdf": "/documents/Najhum_Terms_and_Conditions.pdf",
  "sections": [
    {
      "title": "About these terms",
      "paragraphs": [
        "These Terms & Conditions (\"Terms\") govern your use of www.najhumgroup.com and any related pages (the \"Website\"). The Website is operated by Najhum Technologies LLC (\"Najhum\", \"we\", \"us\", \"our\"), a company registered in the United Arab Emirates under trade licence no. 793523 issued by the Department of Economy and Tourism, Dubai, with its office at in5 Innovation Center, Dubai Design District, Dubai, UAE.",
        "By using the Website you accept these Terms. If you do not accept them, please do not use the Website."
      ]
    },
    {
      "title": "Purpose of the Website",
      "paragraphs": [
        "The Website provides general information about Najhum, our platforms (IoTRICs, EVOLTICS and cropifAI) and our services, and lets you contact us. Nothing on the Website is an offer capable of acceptance.",
        "Any supply of hardware, software, platform subscriptions, installation or support is governed by a separate written proposal, quotation or agreement between Najhum and the client. If that agreement conflicts with these Terms, the agreement prevails."
      ]
    },
    {
      "title": "Information on the Website",
      "paragraphs": [
        "We aim to keep Website content accurate and current. Product descriptions, specifications, images, performance figures and use cases are for general information only. They may change without notice and do not form part of any contract unless confirmed in writing in a signed proposal or agreement.",
        "Actual results depend on site conditions, connectivity, configuration and the client's own systems."
      ]
    },
    {
      "title": "Acceptable use",
      "paragraphs": [
        "You agree not to:"
      ],
      "list": [
        "use the Website for any unlawful purpose or in breach of UAE law, including Federal Decree-Law No. 34 of 2021 on Combatting Rumours and Cybercrimes",
        "attempt to gain unauthorised access to the Website, its servers or any connected system or platform",
        "introduce viruses, malware or other harmful code",
        "scrape, copy or harvest Website content or data by automated means without our written permission",
        "submit false, misleading or third-party information through our forms",
        "interfere with the Website's operation or security"
      ]
    },
    {
      "title": "Intellectual property",
      "paragraphs": [
        "All content on the Website, including text, graphics, logos, product and platform names (Najhum, IoTRICs, EVOLTICS, cropifAI), images, video, software and page design, is owned by or licensed to Najhum and protected by UAE and international intellectual property laws.",
        "You may view and print pages for your own internal, non-commercial reference. You may not otherwise copy, modify, distribute, republish or create derivative works without our prior written consent. Third-party names and marks on the Website belong to their owners."
      ]
    },
    {
      "title": "Enquiries and submissions",
      "paragraphs": [
        "When you contact us through the Website, you confirm that the information you provide is accurate and that you are authorised to provide it. Any ideas or feedback you send are given voluntarily, and we may use them without obligation to you. Personal data you submit is handled under our Privacy Policy."
      ]
    },
    {
      "title": "Third-party links",
      "paragraphs": [
        "The Website may link to third-party websites. We do not control them and are not responsible for their content, availability or privacy practices. A link does not mean we endorse the site."
      ]
    },
    {
      "title": "Availability",
      "paragraphs": [
        "We provide the Website \"as is\" and \"as available\". We do not guarantee that it will be uninterrupted, error-free or free of harmful components. We may change, suspend or withdraw any part of the Website at any time."
      ]
    },
    {
      "title": "Limitation of liability",
      "paragraphs": [
        "To the fullest extent permitted by UAE law, Najhum is not liable for any indirect, incidental or consequential loss, or for loss of profit, revenue, data or business opportunity, arising from your use of or reliance on the Website.",
        "Nothing in these Terms limits liability that cannot be limited under applicable law, including liability for fraud or wilful misconduct."
      ]
    },
    {
      "title": "Indemnity",
      "paragraphs": [
        "You agree to indemnify Najhum against claims, losses and costs arising from your breach of these Terms or misuse of the Website."
      ]
    },
    {
      "title": "Changes to these Terms",
      "paragraphs": [
        "We may update these Terms from time to time. The \"Last updated\" date shows the current version. Continued use of the Website after a change means you accept the updated Terms."
      ]
    },
    {
      "title": "Governing law and jurisdiction",
      "paragraphs": [
        "These Terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates. The courts of Dubai have exclusive jurisdiction over any dispute arising from them."
      ]
    },
    {
      "title": "Contact",
      "paragraphs": [
        "Najhum Technologies LLC",
        "in5 Innovation Center, Dubai Design District, Dubai, UAE",
        "Email: info@najhumgroup.com",
        "Phone: +971 55 617 7234",
        "Website: www.najhumgroup.com"
      ]
    }
  ]
};
