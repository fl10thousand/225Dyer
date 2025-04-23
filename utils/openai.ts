// This file contains server-side only code
import fs from "fs"
import path from "path"

// Load the JSON data once
let knowledgeBase: any = {}

try {
  const knowledgeBasePath = path.join(process.cwd(), "public", "buildingData.json")
  const fileContent = fs.readFileSync(knowledgeBasePath, "utf8")
  knowledgeBase = JSON.parse(fileContent)
  console.log("Knowledge base loaded successfully")
} catch (error) {
  console.error("Error loading knowledge base:", error)
  // Initialize with empty structure to prevent errors
  knowledgeBase = {
    building: {},
    building_amenities: {},
    event_policies: {},
    insurance_requirements: {},
    tenant_services: {
      maintenance_requests: {
        work_order_submission: "[Submit through Building Engines](https://app.buildingengines.com/geofire/login)",
        common_issues: {},
      },
      parking: {},
      mailroom: {},
      bike_storage: {},
    },
    fees_and_services: {},
    contractors: {},
    contact_information: {},
  }
}

// Keyword categories mapped to knowledgeBase sections
const keywordMapping: Record<string, { keywords: string[]; response: (query: string) => Record<string, any> }> = {
  buildingInfo: {
    keywords: [
      "building",
      "floor",
      "level",
      "story",
      "population",
      "certification",
      "owner",
      "ventilation",
      "air quality",
      "humidity",
      "elevator",
      "drinking water",
      "asbestos",
      "sustainability",
      "feature",
    ],
    response: () => ({
      message: "Here is the general information about the building:",
      buildingInfo: knowledgeBase.building,
    }),
  },
  events: {
    keywords: ["event", "common area", "vendor", "alcohol", "cleaning fee", "political", "contract", "right of entry"],
    response: () => ({
      message: "For event approvals at 225 Dyer Street, submit your request at least one week in advance.",
      eventPolicies: knowledgeBase.event_policies,
      cleaningFees: knowledgeBase.event_policies.cleaning_fees,
      insurance: knowledgeBase.insurance_requirements.event_vendors,
      contact: "For assistance, contact Marta Tessier at marta.tessier@cic.com.",
    }),
  },
  insurance: {
    keywords: ["insurance", "liability", "coverage", "certificate", "coi", "policy", "waiver", "subrogation"],
    response: () => ({
      message: "Here are the insurance requirements for events and contractors.",
      insuranceRequirements: knowledgeBase.insurance_requirements,
    }),
  },
  maintenance: {
    keywords: [
      "maintenance",
      "work order",
      "building engines",
      "repair",
      "lighting",
      "bulb",
      "hvac",
      "heating",
      "cooling",
      "air conditioning",
      "plumbing",
      "leak",
      "clog",
      "water",
      "electrical",
      "power",
      "outlet",
      "wiring",
      "window",
      "door",
    ],
    response: (query) => {
      const response: Record<string, any> = {
        message:
          "For maintenance requests, please submit a work order through [Building Engines](https://app.buildingengines.com/geofire/login).",
        link: knowledgeBase.tenant_services.maintenance_requests.work_order_submission,
        common_issues: knowledgeBase.tenant_services.maintenance_requests.common_issues,
      }
      if (query.includes("emergency")) {
        response.emergency_contact = knowledgeBase.tenant_services.maintenance_requests.emergency_contact
      }
      return response
    },
  },
  parking: {
    keywords: ["parking", "garage", "prox card", "clifford"],
    response: () => ({
      message: "Here are the parking details for 225 Dyer Street.",
      parking: knowledgeBase.tenant_services.parking,
    }),
  },
  fees: {
    keywords: ["fee", "cost", "price", "rate", "charge"],
    response: () => ({
      message: "Here are the various service fees for 225 Dyer Street.",
      fees: knowledgeBase.fees_and_services,
    }),
  },
  contractors: {
    keywords: [
      "contractor",
      "vendor",
      "service",
      "painting",
      "painter",
      "plumbing",
      "plumber",
      "electrical",
      "electrician",
    ],
    response: (query) => {
      let category: string | null = null
      if (query.includes("paint")) category = "painting"
      else if (query.includes("plumb")) category = "plumbing"
      else if (query.includes("electric")) category = "electrical"

      return category
        ? {
            message: `Here are the recommended ${category} contractors:`,
            contractors: knowledgeBase.contractors[category],
          }
        : { message: "Here are the available contractors for the building:", contractors: knowledgeBase.contractors }
    },
  },
  contacts: {
    keywords: ["contact", "manager", "management", "engineer", "email", "phone"],
    response: () => ({
      message: "Here are the primary contact details for building management.",
      contacts: knowledgeBase.contact_information,
    }),
  },
  amenities: {
    keywords: ["restaurant", "cafe", "dining", "food", "eat", "amenity", "facility", "bayberry"],
    response: () => ({
      message: "Here's information about the on-site restaurant:",
      restaurant: knowledgeBase.building_amenities.restaurant,
    }),
  },
  mailroom: {
    keywords: ["mail", "package", "delivery", "mailroom", "address"],
    response: () => ({
      message: "Here's information about the building's mailroom services:",
      mailroom: knowledgeBase.tenant_services.mailroom,
    }),
  },
  bikeStorage: {
    keywords: ["bike", "bicycle", "storage", "rack"],
    response: () => ({
      message: "Here's information about bicycle storage in the building:",
      bike_storage: knowledgeBase.tenant_services.bike_storage,
    }),
  },
  hvac: {
    keywords: [
      "hvac",
      "heating",
      "cooling",
      "air conditioning",
      "temperature",
      "humidity",
      "overtime hvac",
      "heat",
      "cold",
      "warm",
      "chilly",
      "weekend",
      "sunday",
      "saturday",
    ],
    response: () => ({
      message: "Here's information about the building's HVAC system and heating on weekends:",
      hvac: knowledgeBase.building.features.HVAC,
      maintenance: knowledgeBase.tenant_services.maintenance_requests,
    }),
  },
}

// Function to search the knowledge base
export function searchKnowledgeBase(query: string): Record<string, any> | null {
  try {
    const lowerQuery = query.toLowerCase()

    // Loop through keyword categories
    for (const category in keywordMapping) {
      if (keywordMapping[category].keywords.some((word) => lowerQuery.includes(word))) {
        return keywordMapping[category].response(lowerQuery)
      }
    }

    // Default response if no match found
    return {
      message:
        "I'm sorry, I couldn't find specific details for your request. However, you may find the following information helpful:",
      suggestions: [
        "For building policies, ask about 'event policies' or 'insurance requirements'.",
        "For maintenance, say 'I need a repair' or 'Submit a work order'.",
        "For contractors, say 'I need a plumber' or 'Who does electrical work?'.",
        "For amenities, ask about 'restaurant' or 'bike storage'.",
        "For mailing information, ask about 'mailroom services'.",
        "For HVAC information, ask about 'temperature standards' or 'overtime HVAC requests'.",
      ],
      contacts: knowledgeBase.contact_information,
    }
  } catch (error) {
    console.error("Error in searchKnowledgeBase:", error)
    return {
      message: "I apologize, but I'm having trouble accessing my knowledge base at the moment.",
      error: true,
      suggestions: [
        "Try asking a different question",
        "Contact property management directly at 401-262-7800",
        "Visit the management office in Suite 121",
      ],
    }
  }
}

// System Prompt for AI Model
export const systemPrompt = `
You are an AI assistant for the tenants of 225 Dyer Street Building in Providence, RI. You have access to a comprehensive knowledge base about the building. 

### **Response Guidelines**:
- Always prioritize **retrieving data** from the knowledge base.
- If the requested information **is not found**, suggest contacting **property management**.
- Keep responses **professional, concise, and helpful**.
- If unsure, politely mention that **further verification may be needed**.
- When providing information about the building's floors, always refer to the 'floors.above_street' field in the building section.
- Use the most specific and relevant information from the knowledge base to answer queries.
- When answering questions about building ownership, use the exact information from the 'owner' field.
- IMPORTANT: Whenever you mention "Building Engines", ALWAYS format it as a clickable link: [Building Engines](https://app.buildingengines.com/geofire/login)
- For maintenance issues, always mention the [Building Engines](https://app.buildingengines.com/geofire/login) system and provide the link.
- When discussing contractors, specify if they are primary or secondary options.
- Include relevant contact information when available.
- For urgent issues, always provide emergency contact numbers.
- If a query touches on multiple areas, combine information from different sections as needed.
- When asked about dining options, provide information about the on-site restaurant, Bayberry Garden.
- For questions about mail or package delivery, refer to the mailroom information.
- If asked about bicycle storage, provide details on the building's bike storage facilities.
- When discussing events, mention the policies, cleaning fees, and insurance requirements.
- For parking-related queries, provide information about the Clifford Street Parking Facility.
- Always format your responses in a clear, easy-to-read manner, using markdown for emphasis and structure when needed.
- When discussing HVAC or heating, always mention the 24/7 service availability, provide the specific temperature ranges for the current season, and explain the process for requesting overtime HVAC if needed.
- For weekend-specific HVAC queries, emphasize that the service is available 24/7, including weekends, and provide the process for submitting work orders or contacting emergency maintenance if needed.
`
