import { ArrowRight } from "lucide-react";
import { TestimonialGlobe, type GlobeTestimonial } from "./testimonial-globe";
import type { Language } from "../site-navbar";

interface TestimonialsSectionProps {
  language: Language;
}

const reviews: GlobeTestimonial[] = [
  {
    id: "yaounde",
    quote: "Waka makes it much easier to find classmates heading to the same neighbourhood after lectures. We spend less time waiting and more time getting home together.",
    name: "Diane Mbarga",
    role: "Student",
    company: "Yaoundé",
    city: "Yaoundé",
    country: "CM",
    lat: 3.848,
    lng: 11.502,
    image: "/avatars/diane-mbarga.svg",
    rating: 5,
    tone: 1,
  },
  {
    id: "douala",
    quote: "The shared ride board helps us coordinate around busy evenings in Douala. We agree on a meeting point quickly and everyone knows the plan.",
    name: "Fabrice Nkou",
    role: "Young professional",
    company: "Douala",
    city: "Douala",
    country: "CM",
    lat: 4.051,
    lng: 9.768,
    image: "/avatars/fabrice-nkou.svg",
    rating: 5,
    tone: 2,
  },
  {
    id: "paris",
    quote: "Waka keeps me connected to people from home. Finding a ride and sharing the journey feels simple, even when I am far from Cameroon.",
    name: "Brenda Eposi",
    role: "Graduate student",
    company: "Paris",
    city: "Paris",
    country: "FR",
    lat: 48.8566,
    lng: 2.3522,
    image: "/avatars/brenda-eposi.svg",
    rating: 5,
    tone: 3,
  },
  {
    id: "london",
    quote: "The community makes every trip feel more welcoming. I can see who is travelling my way and coordinate before leaving.",
    name: "Nji Kevin",
    role: "Software engineer",
    company: "London",
    city: "London",
    country: "GB",
    lat: 51.5072,
    lng: -0.1276,
    image: "/avatars/nji-kevin.svg",
    rating: 5,
    tone: 4,
  },
  {
    id: "montreal",
    quote: "It is reassuring to have a shared board built around people and routes, not just a ride request. Waka helps us look out for one another.",
    name: "Mireille Tanyi",
    role: "Passenger",
    company: "Montréal",
    city: "Montréal",
    country: "CA",
    lat: 45.5017,
    lng: -73.5673,
    image: "/avatars/mireille-tanyi.svg",
    rating: 5,
    tone: 5,
  },
  {
    id: "new-york",
    quote: "I found a group heading in the same direction within minutes. The shared plan makes a busy city feel a little smaller.",
    name: "Diane Mbarga",
    role: "Community member",
    company: "New York",
    city: "New York",
    country: "US",
    lat: 40.7128,
    lng: -74.006,
    image: "/avatars/diane-mbarga.svg",
    rating: 5,
    tone: 1,
  },
  {
    id: "sao-paulo",
    quote: "Waka gives people travelling in the same direction a reason to connect before the ride begins. That changes the whole experience.",
    name: "Fabrice Nkou",
    role: "Entrepreneur",
    company: "São Paulo",
    city: "São Paulo",
    country: "BR",
    lat: -23.5505,
    lng: -46.6333,
    image: "/avatars/fabrice-nkou.svg",
    rating: 5,
    tone: 2,
  },
  {
    id: "cape-town",
    quote: "The ride board helps me plan ahead and meet people I can trust. It is a much calmer way to get home after a long day.",
    name: "Brenda Eposi",
    role: "Passenger",
    company: "Cape Town",
    city: "Cape Town",
    country: "ZA",
    lat: -33.9249,
    lng: 18.4241,
    image: "/avatars/brenda-eposi.svg",
    rating: 5,
    tone: 3,
  },
  {
    id: "dubai",
    quote: "Even across borders, Waka keeps the spirit of travelling together alive. The interface is clear and the group plan is easy to follow.",
    name: "Nji Kevin",
    role: "Consultant",
    company: "Dubai",
    city: "Dubai",
    country: "AE",
    lat: 25.2048,
    lng: 55.2708,
    image: "/avatars/nji-kevin.svg",
    rating: 5,
    tone: 4,
  },
  {
    id: "sydney",
    quote: "I love seeing people from different places connected by the same destination. Waka turns a journey into a community moment.",
    name: "Mireille Tanyi",
    role: "Designer",
    company: "Sydney",
    city: "Sydney",
    country: "AU",
    lat: -33.8688,
    lng: 151.2093,
    image: "/avatars/mireille-tanyi.svg",
    rating: 5,
    tone: 5,
  },
];

export default function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const isFrench = language === "fr";

  return (
    <section id="testimonials" className="bg-white dark:bg-neutral-950">
      <TestimonialGlobe
        items={reviews}
        connections={[
          ["yaounde", "douala"],
          ["yaounde", "paris"],
          ["douala", "london"],
          ["paris", "montreal"],
          ["london", "new-york"],
          ["montreal", "new-york"],
          ["new-york", "sao-paulo"],
          ["sao-paulo", "cape-town"],
          ["cape-town", "dubai"],
          ["dubai", "sydney"],
        ]}
        eyebrow={isFrench ? "La communauté Waka dans le monde" : "The Waka community worldwide"}
        heading={isFrench ? "Des trajets partagés, racontés par notre communauté." : "Shared rides, told by our community."}
        caption={
          isFrench
            ? "Découvrez les témoignages de passagers camerounais partout dans le monde."
            : "Discover testimonials from Cameroonian passengers around the world."
        }
        autoRotate
        autoplay
        interval={3000}
        rotationSpeed={0.12}
        action={
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-neutral-950 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            {isFrench ? "Voir tous les témoignages" : "Read all reviews"}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        }
        labels={{
          previous: isFrench ? "Témoignage précédent" : "Previous review",
          next: isFrench ? "Témoignage suivant" : "Next review",
          pin: isFrench ? "Afficher le témoignage de" : "Show the review from",
        }}
      />
    </section>
  );
}
