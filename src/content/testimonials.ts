export type ReviewPlatform = {
  name: string;
  /** URL to the public review profile page (e.g. Google Business or Facebook page reviews tab). */
  profileUrl: string;
  /** URL to go directly to the review compose screen, if available. */
  writeReviewUrl: string;
  /** Total review count shown on this platform (update when count changes). */
  count: number;
  /** Average rating shown on this platform. */
  rating: number;
};

/** Review platform profiles for Ayres Mechanical Inc. Update counts, ratings, and review links as they change. */
export const reviewPlatforms: ReviewPlatform[] = [
  {
    name: "Google",
    profileUrl: "https://www.google.com/maps/place/Ayres+Mechanical+Inc/@39.7684,-86.1581,15z",
    writeReviewUrl: "",
    count: 13,
    rating: 4.9,
  },
  {
    name: "Facebook",
    profileUrl: "https://www.facebook.com/AyresMechanicalInc",
    writeReviewUrl: "https://www.facebook.com/AyresMechanicalInc/reviews",
    count: 0,
    rating: 5.0,
  },
];

export type Testimonial = {
  name: string;
  date: string;
  rating: number;
  recommended: boolean;
  amount?: string;
  quote: string;
};

export const reviewSummary = {
  rating: 4.9,
  count: 13,
  distribution: [
    { stars: 5, percentage: 92 },
    { stars: 4, percentage: 8 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ],
};

export const testimonials: Testimonial[] = [
  {
    name: "Timothy M.",
    date: "Nov",
    rating: 5,
    recommended: true,
    amount: "$90",
    quote: "He did a great job. He is very professional, quick and very reasonable. He was prompt and very on time.",
  },
  {
    name: "Aleksandr S.",
    date: "Sep",
    rating: 5,
    recommended: true,
    amount: "$145",
    quote: "Went very well.",
  },
  {
    name: "Terri H.",
    date: "Nov",
    rating: 5,
    recommended: true,
    amount: "$5,500",
    quote:
      "I was having a lot of difficulty maintaining proper heating and cooling in the upstairs of my home. Brian spent a significant amount of time analyzing the heating/cooling set up along with the original duct and supply work. He determined a corrective course and performed the rework with punctuality, efficiency and professionalism. I would definitely contact Ayres Mechanical for any future heating and cooling needs.",
  },
  {
    name: "Alk S.",
    date: "May",
    rating: 5,
    recommended: true,
    amount: "$100",
    quote: "It went perfect overall.",
  },
  {
    name: "Andrew H.",
    date: "Oct",
    rating: 5,
    recommended: true,
    amount: "$2,100",
    quote: "Went very well will recommend this company to anyone who needs any HVAC work done.",
  },
  {
    name: "Timothy M.",
    date: "Sep",
    rating: 5,
    recommended: true,
    amount: "$1,500",
    quote: "See above--highly recommend.",
  },
  {
    name: "Moriag M.",
    date: "Aug",
    rating: 5,
    recommended: true,
    amount: "$400",
    quote: "As noted above, both occasions went well.",
  },
  {
    name: "Laura S.",
    date: "Mar",
    rating: 5,
    recommended: true,
    amount: "$200",
    quote:
      "Bryan does a great job. He schedules actual appointment times and shows up on time. He is fair with his pricing and does quality work. He seems to be very knowledgeable and is willing to take the time to explain things in detail.",
  },
  {
    name: "Jennifer B.",
    date: "Feb",
    rating: 4,
    recommended: true,
    amount: "$1,500",
    quote:
      "They were through our home warranty service. Brian Ayres is the owner. I didn't get the full bill because home warranty paid for most of it. The water heater itself was going to be $600 or $700 and the furnace was more than that. So, it was probably well over $1500. We didn't actually spend all of it ourselves. They provided nice service. It took them a couple of tries to get it right. They were helpful and attentive. They didn't get it right the first time, but they got it right eventually. So, it was perfectly fine. They worked with our schedule and made follow up calls. They were in the scheme of things. They did fine and they did a good job. There was a problem because the furnace wasn't working. He actually noticed that the water heater was having issues. He offered that despite coming out for something else. It took him two trips to figure out why the furnace wasn't working and then the third trip to replace the furnace. He was polite, professional and attentive in following up. He gets good scores for customer service and fair scores for solving the issues quickly. It took me and the plumber to figure out what was wrong with the furnace, but the rest of the experience was perfectly fine. He knew something was wrong, but he couldn't figure out what it was and then he got it working. We figured out what was actually the real issue. It is hard to figure something out on the first time. When he was here it was dry inside. So, he couldn't tell if it was new or old. It was definitely rusting from the inside as well as outside because of a leak in one of the pipes. He went above and beyond for everything else. So, it is hard to blame him for not diagnosing it in the beginning. The price seemed reasonable, but we didn't shop around like we would normally have done. We paid our deductible. The quality was fine. They came out and took care of the issues that weren't even part of it. It is all working and I can't complain about that. I would give them all the points for what they did. We would use their services in the future too.",
  },
  {
    name: "Marcus K.",
    date: "Oct",
    rating: 5,
    recommended: true,
    amount: "$375",
    quote: "Brian was prompt showing up for the work. He inspected and cleaned the AC units. He also relpace a few minor parts that were suspect to fail.",
  },
  {
    name: "Karl S.",
    date: "Jul",
    rating: 5,
    recommended: true,
    quote: "They had very good service.",
  },
  {
    name: "Laura S.",
    date: "Apr",
    rating: 5,
    recommended: true,
    amount: "$330",
    quote:
      "Brian was great! He was prompt and courteous and I believe that he is an honest business person. He was recommended by a family member after I had a different local company come out to do yearly service on 2 air conditioners and I felt that their price to fix the one air conditioner was exorbitant. Brian's price included inspection of the unit, 2 hours worth of leak searching, and 4.5 lbs of 410A refrigerant (Puron). Ultimately, he did not find a leak and suspects that either the leak is very tiny or the other service company didn't charge the system properly. On one hand, $330 seems like a lot when the leak wasn't found but this was about 1/2 of what the other company wanted to charge me.",
  },
  {
    name: "Donald C.",
    date: "Jan",
    rating: 5,
    recommended: true,
    amount: "$200",
    quote:
      "I've had Brian work on my heater and central a/c for several years. I'm very happy with his work. He is knowledgeable and tells me details about what he is doing and why. He's not afraid to admit a mistake and correct it for free.",
  },
];
