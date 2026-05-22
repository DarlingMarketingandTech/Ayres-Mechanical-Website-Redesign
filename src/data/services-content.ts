import type { CloudinaryMediaAsset } from "@/content/media";
import { media } from "@/content/media";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";

export type HeroPhotoOverlayPreset =
  | "none"
  | "navy-strong"
  | "navy-soft"
  | "light-soft"
  | "light-blend";

export type ServicePageMedia = {
  heroBackground?: CloudinaryMediaAsset;
  /** Tailwind object-position / cover tuning on hero photo (e.g. `object-[center_30%]`). */
  heroImageClassName?: string;
  heroPhotoOverlay?: HeroPhotoOverlayPreset;
  heroGallery?: CloudinaryMediaAsset[];
  contentIllustration?: CloudinaryMediaAsset;
  heroDeliveryWidth?: number;
};

export type ServiceContentCard = {
  title: string;
  description: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceSpecialNote = {
  tone: "tip" | "safety" | "business" | "assurance";
  label: string;
  text: string;
};

export type ServiceClosingCta = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  subtext?: string;
  maintenancePromo?: {
    title: string;
    description: string;
    label: string;
    href: string;
  };
};

export type ServiceContent = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  heroTitle: string;
  eyebrow: string;
  accent: "red" | "blue" | "dark";
  icon: "heating" | "cooling" | "maintenance" | "commercial" | "industrial" | "emergency" | "ductwork";
  intro: string;
  whatWeHelpWith: ServiceContentCard[];
  commonProblems: ServiceContentCard[];
  faqs: ServiceFaq[];
  specialNote?: ServiceSpecialNote;
  closingCTA: ServiceClosingCta;
  relatedServices: string[];
  media?: ServicePageMedia;
};

export const serviceSlugs = {
  airConditioning: "air-conditioning",
  heating: "heating",
  ductless: "ductless-mini-splits",
  indoorAirQuality: "indoor-air-quality",
  preventiveMaintenance: "preventive-maintenance",
  commercial: "commercial",
  industrial: "industrial",
  twentyFourHourEmergency: "24-hour-emergency",
} as const;

export const servicePageContent: ServiceContent[] = [
  {
    slug: serviceSlugs.airConditioning,
    title: "Air Conditioning Service",
    shortTitle: "Air Conditioning",
    summary: "Professional AC diagnostics, tune-ups, comfort checks, and replacement guidance for Central Indiana homes and facilities.",
    heroTitle: "Air Conditioning Service",
    eyebrow: "Cooling Service",
    accent: "blue",
    icon: "cooling",
    intro:
      "While some AC issues are obvious, others hide behind high energy bills or slightly “off” humidity levels. Our team provides professional intervention for every stage of your system's life cycle.",
    whatWeHelpWith: [
      {
        title: "AC Diagnostics and Repair",
        description:
          "When your system fails, you need more than a quick fix; you need to know why it happened. Our technicians use advanced diagnostic tools to pinpoint the root cause—whether it's a failed capacitor, a refrigerant leak, or a faulty compressor—preventing repeat breakdowns and costly “guesswork” repairs.",
      },
      {
        title: "Cooling Tune-ups",
        description:
          "Preventative maintenance is the best way to extend the life of your equipment. During a Cooling Tune-up, we clean the condenser coils, check electrical connections, and calibrate your thermostat. This ensures your system runs at peak efficiency, lowering your monthly utility bills.",
      },
      {
        title: "Indoor Comfort Checks",
        description:
          "Cooling isn't just about temperature; it's about air quality and balance. We evaluate your home's airflow and humidity levels to ensure every room feels consistent. If you have “hot spots” or “cold spots,” our comfort checks identify the ductwork or insulation issues causing the imbalance.",
      },
      {
        title: "System Replacement Guidance",
        description:
          "If your unit is more than 10–12 years old or requiring frequent repairs, it may be time to consider an upgrade. We provide transparent System Replacement Guidance, helping you choose a high-efficiency model that fits your home's square footage and your budget.",
      },
    ],
    commonProblems: [
      {
        title: "Warm Air From Vents",
        description: "Often caused by a restricted evaporator coil or low refrigerant levels. We'll get the “chill” back in your air.",
      },
      {
        title: "Short Cycling",
        description:
          "If your AC turns on and off rapidly, it's wearing out the motor and failing to dehumidify. We'll check for oversized units or faulty sensors.",
      },
      {
        title: "Weak Airflow",
        description:
          "This could be as simple as a clogged filter or as complex as a failing blower motor or leaky ductwork.",
      },
      {
        title: "High Humidity & Inconsistent Cooling",
        description:
          "In Indiana, the humidity is the real enemy. If your home feels “sticky” despite the AC running, we can optimize your system's dehumidification capabilities.",
      },
    ],
    specialNote: {
      tone: "tip",
      label: "Pro Tip",
      text: "Don't wait for a total system failure. If your energy bills have spiked by more than 15% compared to last summer without a change in usage, your AC is likely working harder than it should.",
    },
    faqs: [
      {
        question: "Why is my AC running but not cooling the house?",
        answer:
          "Restricted airflow, low refrigerant, frozen coils, thermostat issues, and electrical failures are all common causes. Ayres Mechanical can diagnose which problem is actually keeping the system from cooling properly.",
      },
      {
        question: "When should I repair vs. replace an older AC system?",
        answer:
          "Frequent repairs, rising utility bills, major component failures, and aging equipment are the main signals. We look at the condition of the system first, then explain whether repair or replacement makes more sense for your home.",
      },
      {
        question: "Can high humidity make my AC feel like it is not working?",
        answer:
          "Yes. If the system is running but indoor humidity stays high, the home can still feel warm and sticky. We check both cooling performance and dehumidification during the visit.",
      },
      {
        question: "Do you service central AC systems in Central Indiana?",
        answer:
          "Yes. Ayres Mechanical services central air conditioning systems for homeowners across Central Indiana, including diagnostics, repair, tune-ups, and replacement guidance.",
      },
    ],
    closingCTA: {
      title: "Why Choose Ayres Mechanical?",
      description:
        "We believe in a straightforward path to resolution. From the moment you Book Service, our goal is to provide clear communication and dependable work that restores your confidence in your home's comfort. We also offer Flexible Financing through FTL Finance to help make major repairs or replacements manageable.",
      primaryLabel: "Request Service Today",
      primaryHref: routes.requestService,
      secondaryLabel: "Call Now",
      secondaryHref: phoneHref,
    },
    relatedServices: [serviceSlugs.heating, serviceSlugs.preventiveMaintenance, serviceSlugs.twentyFourHourEmergency],
    media: {
      heroBackground: media.pages.airConditioning.hero,
      heroImageClassName: "object-[center_22%]",
      heroDeliveryWidth: 2400,
      heroGallery: [media.pages.airConditioning.supporting],
    },
  },
  {
    slug: serviceSlugs.heating,
    title: "Reliable Heating Service",
    shortTitle: "Heating",
    summary: "Furnace and heat pump diagnostics, maintenance, and performance support built for safe Indiana winters.",
    heroTitle: "Reliable Heating Service",
    eyebrow: "Heating Service",
    accent: "red",
    icon: "heating",
    intro:
      "A reliable heating system is a safety requirement during Indiana winters. We provide comprehensive support to ensure your home remains a sanctuary against the cold.",
    whatWeHelpWith: [
      {
        title: "Furnace and Heat Pump Service",
        description:
          "Whether your home relies on a traditional gas furnace or a modern electric heat pump, our technicians are trained to handle the specific complexities of each. We provide Furnace and Heat Pump Service that addresses everything from ignition failures to reversing valve issues, ensuring your system operates safely and efficiently.",
      },
      {
        title: "No-Heat Troubleshooting",
        description:
          "Losing heat in the middle of a sub-zero night is an emergency. Our “No-Heat” diagnostic process is designed to quickly identify the culprit—be it a tripped limit switch, a cracked heat exchanger, or a faulty pilot light—and provide a straightforward path to restoring your warmth.",
      },
      {
        title: "Preventive Heating Maintenance",
        description:
          "The best time to fix a furnace is before you need to turn it on. Our preventive maintenance includes a rigorous multi-point inspection: cleaning burners, checking for carbon monoxide leaks, testing safety controls, and lubricating moving parts. Regular tuning reduces the risk of mid-winter breakdowns and keeps your manufacturer's warranty valid.",
      },
      {
        title: "System Performance Checks",
        description:
          "Is your heater running but not performing? We conduct deep-dive performance checks to measure temperature rise and static pressure. This data-driven approach allows us to optimize your system for maximum heat output with minimum energy consumption.",
      },
    ],
    commonProblems: [
      {
        title: "Uneven Rooms and Cold Spots",
        description:
          "Often a sign of ductwork issues or an improperly sized system. We balance your airflow so every room stays comfortable.",
      },
      {
        title: "Unexpected Shutdowns",
        description:
          "If your furnace starts and then immediately stops (short-cycling), it could be overheating or dealing with a dirty flame sensor. We'll find the fix before it leads to a total lockout.",
      },
      {
        title: "Rising Utility Bills",
        description:
          "A sudden spike in heating costs usually means your system is losing efficiency. We help identify if a repair can restore efficiency or if it's time for an upgrade.",
      },
      {
        title: "Aging Equipment",
        description:
          "If your system is over 15 years old, it requires an expert eye. We provide honest expert evaluations to let you know if your unit is safe for another season or if replacement is the smarter investment.",
      },
    ],
    specialNote: {
      tone: "safety",
      label: "Safety Note",
      text: "If you smell “rotten eggs” (natural gas) or your carbon monoxide detector sounds, exit your home immediately and call for Emergency Service.",
    },
    faqs: [
      {
        question: "What should I check before calling for no heat?",
        answer:
          "Start with the thermostat, filter, breaker, and furnace switch if they are safe to access. If the system still will not run or shuts down again right away, schedule service.",
      },
      {
        question: "When is a furnace issue an emergency?",
        answer:
          "No heat during extreme cold, gas odors, repeated breaker trips, or suspected carbon monoxide concerns should be treated as urgent. If you suspect gas or carbon monoxide, leave the home and call emergency services first.",
      },
      {
        question: "Do you service heat pumps and furnaces?",
        answer:
          "Yes. Ayres Mechanical services both furnace and heat-pump systems and can troubleshoot heating issues tied to airflow, controls, ignition, and overall system performance.",
      },
      {
        question: "What heating problems can maintenance catch early?",
        answer:
          "Maintenance can uncover dirty burners, failing motors, airflow restrictions, safety-control issues, and heat-exchanger concerns before they become a mid-winter breakdown.",
      },
    ],
    closingCTA: {
      title: "Transparent Solutions for Every Home",
      description:
        "We know that heating repairs can be an unexpected stress. That's why Ayres Mechanical focuses on practical diagnostics and clear communication. If a replacement is necessary, we offer Flexible Financing through FTL Finance to help you prioritize your family's comfort without breaking the bank.",
      primaryLabel: "Request Heating Service",
      primaryHref: routes.requestService,
      secondaryLabel: "Call Now",
      secondaryHref: phoneHref,
    },
    relatedServices: [serviceSlugs.airConditioning, serviceSlugs.preventiveMaintenance, serviceSlugs.twentyFourHourEmergency],
    media: {
      heroBackground: media.pages.heating.hero,
      heroImageClassName: "object-[center_28%]",
    },
  },
  {
    slug: serviceSlugs.preventiveMaintenance,
    title: "Preventive HVAC Maintenance",
    shortTitle: "Preventive Maintenance",
    summary: "Seasonal HVAC maintenance plans that reduce breakdown risk, improve airflow, and clarify equipment condition.",
    heroTitle: "Preventive HVAC Maintenance",
    eyebrow: "Maintenance",
    accent: "blue",
    icon: "maintenance",
    intro:
      "Preventive maintenance helps homeowners and building managers catch wear early, keep airflow cleaner, and make better decisions before a heating or cooling problem becomes urgent.",
    whatWeHelpWith: [
      {
        title: "Residential Maintenance",
        description:
          "Home maintenance visits focus on seasonal tune-ups, filter and airflow checks, and the comfort issues homeowners notice first. We explain findings clearly so you know what matters now and what can be planned ahead.",
      },
      {
        title: "Commercial Maintenance",
        description:
          "Commercial maintenance is built for rooftop units, split systems, filter schedules, coil cleaning, electrical and motor checks when needed, and service timing that works around business hours when possible.",
      },
      {
        title: "Seasonal Performance Checks",
        description:
          "As the seasons shift in Central Indiana, so do the demands on your equipment. We test cooling and heating performance before the weather turns so you are not surprised by the first heatwave or cold snap.",
      },
      {
        title: "Equipment Condition Notes",
        description:
          "After the visit, Ayres Mechanical explains what we saw, what should be watched, and what likely needs follow-up next. That applies to home systems and to buildings with multiple pieces of equipment.",
      },
    ],
    commonProblems: [
      {
        title: "Emergency Breakdown Risk",
        description:
          "Most mid-season failures are caused by parts that were already failing months prior. We catch these during the “off-season” so you stay comfortable when it matters most.",
      },
      {
        title: "Neglected System Wear",
        description:
          "Friction and dirt are the enemies of efficiency. By cleaning and lubricating internal components, we reduce the mechanical stress that leads to expensive heating or AC repairs.",
      },
      {
        title: "Poor Airflow",
        description:
          "If some rooms feel stuffy or your vents are whistling, our maintenance review identifies the bottlenecks in your system, ensuring air moves freely and quietly.",
      },
      {
        title: "Unclear Equipment Condition",
        description:
          "Stop wondering if your 10-year-old unit will make it through the month. We provide a clear “health grade” for your system so you can plan for the future with confidence.",
      },
    ],
    faqs: [
      {
        question: "How often should HVAC maintenance be scheduled?",
        answer:
          "Most systems benefit from seasonal service, typically before cooling season and before heating season. Commercial schedules can vary based on equipment type, runtime, and building use.",
      },
      {
        question: "What is different about residential vs. commercial maintenance?",
        answer:
          "Residential visits usually focus on comfort, airflow, and homeowner-friendly explanations. Commercial maintenance often adds rooftop-unit support, recurring filter and coil schedules, equipment notes, and planning around building operations.",
      },
      {
        question: "Can maintenance prevent every breakdown?",
        answer:
          "No. Maintenance lowers the chance of surprise failures and helps catch wear earlier, but it cannot guarantee that every part will last until the next visit.",
      },
      {
        question: "What does Ayres check during a maintenance visit?",
        answer:
          "The exact checklist depends on the system, but it commonly includes performance testing, airflow review, filter inspection, electrical and component checks, and notes on overall equipment condition.",
      },
    ],
    closingCTA: {
      title: "Choose the right maintenance path for the building you manage",
      description:
        "Ayres Mechanical helps homeowners stay ahead of seasonal breakdowns and helps businesses build a steadier maintenance rhythm for rooftop units and other HVAC equipment. If an inspection shows bigger repair or replacement needs, we explain the next step clearly.",
      primaryLabel: "Request Residential Maintenance",
      primaryHref: routes.requestService,
      secondaryLabel: "Call Now",
      secondaryHref: phoneHref,
      subtext: "Need planned maintenance for a business, property, or multi-system building instead?",
      maintenancePromo: {
        title: "Need a commercial maintenance path instead of a home tune-up?",
        description:
          "See Commercial Maintenance Plans for planned service, equipment notes, and seasonal support built around Central Indiana businesses and property teams.",
        label: "View Commercial Maintenance Plans",
        href: routes.commercialMaintenancePlans,
      },
    },
    relatedServices: [serviceSlugs.airConditioning, serviceSlugs.heating, serviceSlugs.commercial],
    media: {
      heroBackground: media.pages.maintenance.hero,
      heroImageClassName: "object-top",
      contentIllustration: media.pages.maintenance.supporting,
    },
  },
  {
    slug: serviceSlugs.commercial,
    title: "Commercial HVAC Service",
    shortTitle: "Commercial HVAC",
    summary: "Commercial HVAC diagnostics, rooftop unit service, planned maintenance, and responsive scheduling for Central Indiana businesses.",
    heroTitle: "Commercial HVAC Service",
    eyebrow: "Commercial HVAC",
    accent: "dark",
    icon: "commercial",
    intro:
      "Ayres Mechanical helps businesses keep building comfort more reliable with practical diagnostics, RTU service, repairs, and planned maintenance that fit real operating schedules.",
    whatWeHelpWith: [
      {
        title: "Business HVAC Diagnostics",
        description:
          "Commercial systems often include rooftop units, split systems, economizers, and zoning controls. We diagnose the actual cause of the issue and explain the most practical repair path for the building.",
      },
      {
        title: "Preventive Maintenance",
        description:
          "Planned maintenance helps catch worn belts, failing motors, dirty coils, and airflow issues before they turn into a full shutdown. We work around business hours when the job allows.",
      },
      {
        title: "Rooftop Unit and Airflow Support",
        description:
          "Large open spaces, front offices, and customer areas create different comfort needs. We help balance airflow, improve problem zones, and keep rooftop units and other systems performing more consistently.",
      },
      {
        title: "Responsive Service Scheduling",
        description:
          "When a store, office, restaurant, or facility loses heating or cooling, you need a clear response. Ayres Mechanical provides responsive commercial scheduling and practical follow-up on what needs to happen next.",
      },
    ],
    commonProblems: [
      {
        title: "Tenant or Employee Comfort Issues",
        description:
          "Hot and cold spots lead to complaints and lost productivity. We diagnose thermostat calibration and ductwork issues to restore harmony to your workspace.",
      },
      {
        title: "Equipment Downtime",
        description:
          "A system that is “down” can mean a closed store or a dangerous environment. Our technicians move quickly to provide Emergency Service and permanent solutions.",
      },
      {
        title: "Inconsistent Zones",
        description:
          "If your server room is overheating while your lobby is freezing, your zoning controls need attention. We calibrate dampers and sensors to ensure every zone reacts correctly to its environment.",
      },
      {
        title: "Maintenance Uncertainty",
        description:
          "When no one has a clear record of what was serviced, what is aging out, or what keeps failing, maintenance planning gets harder. We provide clear notes so the next step is easier to prioritize.",
      },
    ],
    specialNote: {
      tone: "business",
      label: "Commercial Service Note",
      text: "We focus on practical diagnostics and clear follow-up. If a targeted repair is the right answer, we will say so instead of turning every call into a replacement pitch.",
    },
    faqs: [
      {
        question: "What types of commercial HVAC systems do you service?",
        answer:
          "Ayres Mechanical services common commercial HVAC equipment including rooftop units, split systems, and other heating and cooling equipment used in offices, retail buildings, restaurants, and light industrial spaces.",
      },
      {
        question: "Do you work on rooftop units?",
        answer:
          "Yes. Rooftop unit service is a common part of Ayres Mechanical's commercial work, including diagnostics, repair planning, seasonal maintenance, and condition notes.",
      },
      {
        question: "Can you help reduce surprise HVAC breakdowns for a business?",
        answer:
          "Yes. Planned maintenance and clearer equipment notes help catch issues earlier and reduce the odds of avoidable breakdowns during business hours, even though no service plan can prevent every failure.",
      },
      {
        question: "When should a business consider a maintenance plan?",
        answer:
          "A plan is worth considering when the building has multiple systems, recurring comfort complaints, rooftop units, or repeated service calls that would benefit from a steadier seasonal schedule.",
      },
    ],
    closingCTA: {
      title: "Commercial HVAC support with a clearer next step",
      description:
        "Ayres Mechanical supports business owners, property managers, and facility teams with clear communication, dependable service, and practical recommendations. If you need a steadier maintenance rhythm, we can help you move from reactive calls to planned service.",
      primaryLabel: "Request Commercial Service",
      primaryHref: routes.requestService,
      secondaryLabel: "Call Now",
      secondaryHref: phoneHref,
      subtext: "Need planned maintenance for rooftop units or multiple systems instead of a one-time repair call?",
      maintenancePromo: {
        title: "Need planned support for multiple systems or facilities?",
        description:
          "View Commercial Maintenance Plans for seasonal service, equipment condition notes, and building-specific maintenance planning.",
        label: "View Commercial Maintenance Plans",
        href: routes.commercialMaintenancePlans,
      },
    },
    relatedServices: [serviceSlugs.preventiveMaintenance, serviceSlugs.industrial, serviceSlugs.twentyFourHourEmergency],
    media: {
      heroBackground: media.pages.commercial.hero,
      heroImageClassName: "object-[center_36%]",
      heroDeliveryWidth: 1600,
      heroGallery: [media.pages.commercial.supporting],
    },
  },
  {
    slug: serviceSlugs.industrial,
    title: "Industrial HVAC Support",
    shortTitle: "Industrial HVAC",
    summary: "Industrial HVAC service, maintenance coordination, and equipment condition reviews for demanding facilities.",
    heroTitle: "Industrial HVAC Support",
    eyebrow: "Industrial HVAC",
    accent: "dark",
    icon: "industrial",
    intro:
      "Industrial environments require more than just cooling; they require precise environmental control to maintain operational integrity. We provide the technical expertise needed to manage heavy-duty systems in demanding settings.",
    whatWeHelpWith: [
      {
        title: "Facility HVAC Service",
        description:
          "Industrial facilities often house specialized equipment that generates significant heat or requires specific ambient conditions. Our Facility HVAC Service covers everything from large-tonnage rooftop units to complex makeup air systems, ensuring your infrastructure supports your output.",
      },
      {
        title: "Operational Comfort Support",
        description:
          "In a warehouse or manufacturing plant, maintaining a stable temperature is a matter of safety and productivity. We provide operational comfort support by optimizing airflow in large-scale spaces, ensuring that your workforce stays focused and your machinery stays within safe operating parameters.",
      },
      {
        title: "Equipment Condition Review",
        description:
          "Data is critical in an industrial setting. Our Equipment Condition Review provides a deep-dive analysis of your mechanical assets. We assess vibration, motor temperatures, and electrical draws to provide a “health grade” for each unit, allowing you to prioritize repairs before they impact your production line.",
      },
      {
        title: "Maintenance Coordination",
        description:
          "Managing HVAC across a sprawling facility requires organization. We offer Maintenance Coordination that integrates with your facility's schedule. We handle the logistics of filter changes, belt replacements, and coil cleanings across dozens of units so your internal team can focus on core operations.",
      },
    ],
    commonProblems: [
      {
        title: "Operational Downtime Risk",
        description:
          "A cooling failure in a server room or a heating failure on a production floor can cost thousands per hour. Our Emergency Service and proactive monitoring are designed to keep your facility “always-on.”",
      },
      {
        title: "Large-Area Comfort Control",
        description:
          "Industrial spaces are notorious for stratification and dead zones. We use advanced diagnostics to balance airflow and ensure consistent temperatures from the loading dock to the front office.",
      },
      {
        title: "Aging Mechanical Systems",
        description:
          "Many industrial facilities rely on legacy equipment. We provide expert evaluation to determine if a system can be reliably repaired or if it's time to leverage Flexible Financing for a high-efficiency replacement.",
      },
      {
        title: "Specialized Service Coordination",
        description:
          "If your facility requires specific safety protocols, lift access, or after-hours work, we provide the Service Coordination necessary to get the job done without disrupting your workflow.",
      },
    ],
    specialNote: {
      tone: "assurance",
      label: "Industrial Assurance",
      text: "We understand the “operational awareness” required for industrial work. Our technicians respect your facility's safety protocols and operational flow.",
    },
    faqs: [
      {
        question: "What does light industrial HVAC support mean?",
        answer:
          "It usually means HVAC service for facilities such as warehouses, operational spaces, and buildings with larger equipment loads or tighter service coordination needs than a typical office.",
      },
      {
        question: "Do you support warehouses or operational spaces?",
        answer:
          "Yes. Ayres Mechanical supports warehouses, operational spaces, and similar facilities where airflow, temperature stability, and scheduling around operations matter.",
      },
      {
        question: "Can service be coordinated around business operations?",
        answer:
          "Yes. When possible, Ayres Mechanical coordinates access and service timing around building operations, safety protocols, and the practical limits of the work being performed.",
      },
      {
        question: "When should facility equipment be reviewed?",
        answer:
          "A review makes sense when equipment is aging, repeated breakdowns are affecting operations, or the building needs a clearer picture of what should be repaired, maintained, or planned next.",
      },
    ],
    closingCTA: {
      title: "Engineering Reliability into Your Facility",
      description:
        "Ayres Mechanical provides a straightforward path to resolution for even the most complex industrial challenges. Whether you need a one-time repair or a comprehensive Maintenance Plan, we bring the technical skill and dependable work Central Indiana businesses trust.",
      primaryLabel: "Request Industrial Service",
      primaryHref: routes.requestService,
      secondaryLabel: "Call Now",
      secondaryHref: phoneHref,
      subtext: "Does your facility require specific safety certifications or specialized access equipment for service?",
      maintenancePromo: {
        title: "Need coordinated HVAC support for an operational facility?",
        description:
          "Start a facility service plan that accounts for equipment footprint, access needs, and service coordination.",
        label: "Start a Facility Service Plan",
        href: routes.commercialMaintenancePlans,
      },
    },
    relatedServices: [serviceSlugs.commercial, serviceSlugs.preventiveMaintenance, serviceSlugs.twentyFourHourEmergency],
    media: {
      heroBackground: media.pages.industrial.hero,
    },
  },
  {
    slug: serviceSlugs.ductless,
    title: "Ductless Mini-Split Systems",
    shortTitle: "Ductless",
    summary: "High-efficiency ductless heating and cooling for room additions, tight spaces, and zoned comfort without ductwork.",
    heroTitle: "Ductless Mini-Split Service",
    eyebrow: "Ductless HVAC",
    accent: "blue",
    icon: "ductwork",
    intro:
      "Ductless mini-splits deliver targeted comfort where traditional ductwork is impractical. Ayres Mechanical designs, installs, and services wall-mounted and multi-zone systems with the same practical diagnostics we bring to every residential visit.",
    whatWeHelpWith: [
      {
        title: "Single- and Multi-Zone Layouts",
        description:
          "We map how you use each space—primary suites, bonus rooms, garages, and workshops—then recommend a single- or multi-zone layout that avoids short cycling and keeps humidity under control.",
      },
      {
        title: "Installation and Line Set Routing",
        description:
          "Clean line hide, proper condensate management, and secure mounting matter as much as the equipment itself. Our installs prioritize long-term service access and a finished look that matches your home.",
      },
      {
        title: "Seasonal Performance Checks",
        description:
          "Mini-splits work year-round as heat pumps. We verify defrost behavior, filter maintenance intervals, and refrigerant circuit health so you stay efficient through Indiana's humid summers and cold snaps.",
      },
      {
        title: "Replacement and Upgrade Guidance",
        description:
          "When an aging ductless head or outdoor unit is beyond economical repair, we walk through efficiency tiers, electrical requirements, and financing paths so you can choose confidently.",
      },
    ],
    commonProblems: [
      {
        title: "Water Dripping at the Wall Unit",
        description: "Clogged condensate lines or failed pumps are common culprits. We restore drainage quickly to protect drywall and flooring.",
      },
      {
        title: "Weak Heating in Extreme Cold",
        description: "Heat pumps can lose capacity at low temperatures. We evaluate supplemental strategies and defrost controls to keep you comfortable.",
      },
      {
        title: "Odd Smells from the Head",
        description: "Mold on blower wheels or dirty coils can affect indoor air. We deep clean accessible components and recommend filter routines.",
      },
      {
        title: "Communication Errors Between Heads",
        description: "Multi-zone systems rely on clean electrical and control wiring. We trace faults methodically instead of swapping parts blindly.",
      },
    ],
    faqs: [
      {
        question: "Where do ductless mini-splits work best?",
        answer:
          "They work especially well in room additions, bonus rooms, finished basements, garages, and homes where adding full ductwork would be difficult or unnecessary.",
      },
      {
        question: "Can ductless systems heat and cool?",
        answer:
          "Yes. Most ductless mini-splits are heat-pump systems that provide both heating and cooling, making them useful year-round in Central Indiana.",
      },
      {
        question: "Why is my ductless head leaking water?",
        answer:
          "Drain clogs, condensate pump problems, and installation issues are common causes. We inspect the drainage path and the head itself to correct the leak safely.",
      },
      {
        question: "Do ductless systems need regular maintenance?",
        answer:
          "Yes. Filters, coils, drain components, and refrigerant performance still need attention. Regular maintenance helps keep the system efficient and lowers the risk of nuisance leaks or performance problems.",
      },
    ],
    closingCTA: {
      title: "Comfort Without the Ductwork Headache",
      description:
        "Whether you are finishing a basement or solving a hot second floor, Ayres Mechanical provides clear options and dependable workmanship. Ask about financing for multi-zone upgrades.",
      primaryLabel: "Request Ductless Service",
      primaryHref: routes.requestService,
      secondaryLabel: "Call Now",
      secondaryHref: phoneHref,
    },
    relatedServices: [serviceSlugs.airConditioning, serviceSlugs.heating, serviceSlugs.preventiveMaintenance],
    media: {
      heroBackground: media.pages.ductless.hero,
      heroImageClassName: "object-[center_26%]",
      heroGallery: [media.pages.ductless.supporting],
    },
  },
  {
    slug: serviceSlugs.indoorAirQuality,
    title: "Indoor Air Quality Services",
    shortTitle: "Indoor Air Quality",
    summary: "Filtration, humidity balance, ventilation, and airflow reviews to make your home feel fresher and healthier.",
    heroTitle: "Indoor Air Quality Support",
    eyebrow: "Healthy Air",
    accent: "blue",
    icon: "maintenance",
    intro:
      "Indoor air quality is more than a single gadget—it is the combination of filtration, humidity, ventilation, and balanced airflow. Ayres Mechanical evaluates how your whole system works together, then recommends practical upgrades that match your budget.",
    whatWeHelpWith: [
      {
        title: "Media and Filtration Upgrades",
        description:
          "We match filter styles to your equipment and allergy sensitivities, from high-MERV pleated filters to cabinet media air cleaners that do not choke airflow.",
      },
      {
        title: "Humidity and Moisture Control",
        description:
          "Sticky summers and dry winters both create comfort issues. We measure dew points and recommend humidification or dehumidification strategies tied to your existing HVAC system.",
      },
      {
        title: "Ventilation and Fresh Air Options",
        description:
          "Tightly sealed homes can trap pollutants. We evaluate ERV/HRV and controlled ventilation paths so fresh air does not undermine efficiency.",
      },
      {
        title: "Duct Leakage and Airflow Balancing",
        description:
          "Even premium filters cannot fix leaky ducts. We inspect distribution systems for pressure imbalances that create stuffy rooms or excess dust.",
      },
    ],
    commonProblems: [
      {
        title: "Persistent Dust After Cleaning",
        description: "Leaky return pathways or missing filtration can recycle particulates. We pinpoint infiltration and duct issues.",
      },
      {
        title: "Dry Static Shocks in Winter",
        description: "Low humidity is common when furnaces run nonstop. We recommend safe humidification tied to your water supply and maintenance plan.",
      },
      {
        title: "Musty Odors When AC Runs",
        description: "Moisture on coils or in drain pans can support microbial growth. We clean accessible components and verify condensate removal.",
      },
      {
        title: "Allergy Flare-ups Indoors",
        description: "We review filtration, ventilation, and humidity together—often a combination fix works better than a single product pitch.",
      },
    ],
    faqs: [
      {
        question: "What causes excess dust in a home?",
        answer:
          "Excess dust can come from leaky ductwork, poor filtration, airflow imbalances, or outdoor air infiltration. We look at the system as a whole instead of blaming one part too quickly.",
      },
      {
        question: "Can HVAC improvements help with indoor humidity?",
        answer:
          "Yes. Humidity problems are often tied to airflow, equipment sizing, or the need for humidification or dehumidification support. HVAC changes can improve comfort when the root cause is identified correctly.",
      },
      {
        question: "Are high-MERV filters always better?",
        answer:
          "Not always. A filter that is too restrictive for the equipment can hurt airflow. We recommend filter options that balance air cleaning with what the system can handle safely.",
      },
      {
        question: "What is the difference between filtration, humidity control, and ventilation?",
        answer:
          "Filtration helps capture particulates, humidity control manages moisture levels, and ventilation brings in or exchanges air. Many homes need a combination of those approaches rather than one standalone product.",
      },
    ],
    closingCTA: {
      title: "Breathe Easier with Whole-Home Thinking",
      description:
        "Ayres Mechanical focuses on measurable improvements—not buzzwords. If equipment upgrades make sense, we explain why, what they cost, and how they interact with your heating and cooling system.",
      primaryLabel: "Request IAQ Review",
      primaryHref: routes.requestService,
      secondaryLabel: "Call Now",
      secondaryHref: phoneHref,
    },
    relatedServices: [serviceSlugs.preventiveMaintenance, serviceSlugs.airConditioning, serviceSlugs.heating],
    media: {
      heroBackground: media.pages.indoorAirQuality.hero,
      heroImageClassName: "object-[center_24%]",
      heroPhotoOverlay: "light-blend",
    },
  },
  {
    slug: serviceSlugs.twentyFourHourEmergency,
    title: "24-Hour HVAC Service",
    shortTitle: "24-Hour Service",
    summary: "Round-the-clock HVAC emergency response for residential, commercial, and industrial comfort failures.",
    heroTitle: "24-Hour HVAC Service",
    eyebrow: "Emergency Service",
    accent: "red",
    icon: "emergency",
    intro:
      "When your HVAC system fails at the worst possible time, you don't need an answering machine—you need a resolution. We provide round-the-clock support to ensure your safety and comfort are restored immediately.",
    whatWeHelpWith: [
      {
        title: "24-Hour Service Availability",
        description:
          "HVAC emergencies don't stick to a 9-to-5 schedule, and neither do we. Whether it's 2:00 AM on a holiday or a Sunday afternoon, our technicians are on standby. Our 24-Hour Service ensures that a qualified professional is always just a phone call away.",
      },
      {
        title: "Heating and Cooling Emergencies",
        description:
          "Some repairs can wait until Monday; others cannot. We prioritize true emergencies—such as total system failure during extreme Indiana temperatures or situations involving electrical risks. We quickly diagnose the issue to prevent further damage to your home or equipment.",
      },
      {
        title: "Residential, Commercial, and Industrial Response",
        description:
          "The definition of an “emergency” changes depending on the setting. Whether it's a family home without heat, a retail store with a broken AC, or an industrial plant facing a production-stopping climate failure, we provide a tailored response that matches the scale and urgency of your facility.",
      },
      {
        title: "Direct Call-to-Service Path",
        description:
          "In an emergency, every minute counts. We've eliminated the red tape with a Direct Call-to-Service Path. When you call our emergency line, you are routed to a team that can take immediate action, helping you bypass lengthy intake forms when time is of the essence.",
      },
    ],
    commonProblems: [
      {
        title: "No Heat in Cold Weather",
        description:
          "In sub-zero temperatures, a lack of heat is a safety hazard for your family and your plumbing. We prioritize these calls to prevent frozen pipes and dangerous indoor conditions.",
      },
      {
        title: "No Cooling During Peak Heat",
        description:
          "Extreme humidity and heat aren't just uncomfortable—they can be life-threatening for the elderly or those with health conditions. We restore your Air Conditioning quickly to get your home back to a safe temperature.",
      },
      {
        title: "Critical Comfort Failures",
        description:
          "If your system is making loud grinding noises, emitting a burning smell, or leaking water into your living space, these are critical failures that require immediate intervention to avoid total system replacement.",
      },
      {
        title: "Business-Disrupting HVAC Issues",
        description:
          "For our Commercial and Industrial clients, a cooling failure can mean lost inventory or equipment damage. We move fast to protect your bottom line.",
      },
    ],
    specialNote: {
      tone: "safety",
      label: "Safety First",
      text: "If you smell gas or suspect a carbon monoxide leak, exit the building immediately and call emergency services before contacting us for repair.",
    },
    faqs: [
      {
        question: "What counts as an HVAC emergency?",
        answer:
          "No heat during dangerous cold, no cooling during severe heat for vulnerable occupants, gas odors, suspected carbon monoxide, electrical burning smells, and major active leaks are common emergency situations.",
      },
      {
        question: "Should I call immediately if I smell gas or suspect carbon monoxide?",
        answer:
          "Yes. Leave the building and call emergency services or the gas utility first. After the immediate safety risk is addressed, contact Ayres Mechanical for HVAC repair.",
      },
      {
        question: "Do you handle residential and commercial emergency calls?",
        answer:
          "Yes. Ayres Mechanical handles emergency HVAC calls for residential, commercial, and industrial customers across its Central Indiana service area.",
      },
      {
        question: "What information should I have ready when I call?",
        answer:
          "Have the address, a callback number, the type of system if you know it, and a short description of the problem or safety concern. That helps us route the emergency faster.",
      },
    ],
    closingCTA: {
      title: "Restoring Comfort and Confidence",
      description:
        "At Ayres Mechanical, we believe an emergency repair shouldn't be a temporary patch. Our goal is to provide a permanent fix through Practical Diagnostics. If an emergency requires a major replacement, we offer Flexible Financing through FTL Finance to help you make the right decision for your home without financial panic.",
      primaryLabel: "Request Emergency Service",
      primaryHref: routes.requestService,
      secondaryLabel: "Call Now",
      secondaryHref: phoneHref,
      subtext: "Are you currently experiencing a system failure, or are you looking to add us to your facility's emergency contact list?",
    },
    relatedServices: [serviceSlugs.heating, serviceSlugs.airConditioning, serviceSlugs.commercial],
    media: {
      heroBackground: media.pages.emergency.hero,
      heroImageClassName: "object-[center_46%]",
    },
  },
];

export function getServiceContentBySlug(slug: string) {
  return servicePageContent.find((service) => service.slug === slug);
}
