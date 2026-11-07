import { useMemo, useState } from "react";
import {
  ArrowRight,
  CarFront,
  Check,
  Clock3,
  MapPin,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { Language } from "./site-navbar";
import { cn } from "@/lib/utils";

interface RideBoardProps {
  language: Language;
  authenticatedEmail: string | null;
  onSignup: () => void;
}

interface RideGroup {
  id: number;
  corridor: string;
  window: string;
  members: number;
  capacity: number;
  destinations: string;
  coordinator: string;
  status: "Open" | "Almost full";
}

const CORRIDORS = [
  "Ngoa-Ekelle → Poste Centrale",
  "Ngoa-Ekelle → Mobile Omnisport",
  "Ngoa-Ekelle → Total Ngousso",
  "Ngoa-Ekelle → Barrière en Pierre",
];

const WINDOWS = ["8:00–9:00 PM", "9:00–10:00 PM", "10:00–11:00 PM"];
const RIDE_BOARD_IMAGE =
  "https://images.unsplash.com/photo-1615463669098-521a22047a1e?auto=format&fit=crop&w=1200&q=80";

const INITIAL_GROUPS: RideGroup[] = [
  {
    id: 1,
    corridor: CORRIDORS[3],
    window: WINDOWS[2],
    members: 3,
    capacity: 4,
    destinations: "Mobile Omnisport · Poste Centrale · Barrière en Pierre",
    coordinator: "Nadia",
    status: "Open",
  },
  {
    id: 2,
    corridor: CORRIDORS[0],
    window: WINDOWS[1],
    members: 3,
    capacity: 4,
    destinations: "Mokolo · Poste Centrale",
    coordinator: "Junior",
    status: "Almost full",
  },
  {
    id: 3,
    corridor: CORRIDORS[2],
    window: WINDOWS[2],
    members: 2,
    capacity: 4,
    destinations: "Nkolbisson · Total Ngousso",
    coordinator: "Arielle",
    status: "Open",
  },
];

export default function RideBoard({ language, authenticatedEmail, onSignup }: RideBoardProps) {
  const isFrench = language === "fr";
  const [corridor, setCorridor] = useState(CORRIDORS[3]);
  const [departureWindow, setDepartureWindow] = useState(WINDOWS[2]);
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const matchingGroups = useMemo(
    () => groups.filter((group) => group.corridor === corridor && group.window === departureWindow),
    [corridor, departureWindow, groups],
  );

  const toggleJoin = (groupId: number) => {
    if (!authenticatedEmail) {
      onSignup();
      return;
    }

    setJoinedGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId],
    );
  };

  const createGroup = () => {
    setGroups((current) => [
      ...current,
      {
        id: Date.now(),
        corridor,
        window: departureWindow,
        members: 1,
        capacity: 4,
        destinations: corridor.split(" → ")[1],
        coordinator: authenticatedEmail?.split("@")[0] || "You",
        status: "Open",
      },
    ]);
    setIsCreating(false);
  };

  return (
    <section id="find-a-ride" className="bg-neutral-50 px-6 py-24 text-neutral-950 dark:bg-neutral-900 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              {isFrench ? "Le tableau de départ" : "The departure board"}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              {isFrench ? "Trouvez des personnes qui vont dans votre direction." : "Find people going your way."}
            </h2>
            <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">
              {isFrench
                ? "Choisissez un corridor et une heure. Waka vous aide à vous organiser avant de commander un taxi."
                : "Choose a corridor and time window. Waka helps you coordinate before anyone orders a taxi."}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            <ShieldCheck className="size-5 text-emerald-600" aria-hidden="true" />
            {isFrench ? "Profils vérifiés et rendez-vous publics" : "Verified profiles and public meeting points"}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-950">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                <MapPin className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold">{isFrench ? "Votre recherche" : "Your search"}</h3>
                <p className="text-sm text-neutral-500">{isFrench ? "Corridors manuels pour commencer" : "Manual corridors to start"}</p>
              </div>
            </div>
            <label className="block text-sm font-medium">
              {isFrench ? "Corridor" : "Corridor"}
              <select
                value={corridor}
                onChange={(event) => setCorridor(event.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-amber-500 dark:border-white/10 dark:bg-neutral-900"
              >
                {CORRIDORS.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="mt-5 block text-sm font-medium">
              {isFrench ? "Heure de départ" : "Departure window"}
              <select
                value={departureWindow}
                onChange={(event) => setDepartureWindow(event.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-amber-500 dark:border-white/10 dark:bg-neutral-900"
              >
                {WINDOWS.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <div className="mt-6 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600 dark:bg-white/5 dark:text-neutral-400">
              <div className="flex items-center gap-2 font-medium text-neutral-900 dark:text-white">
                <CarFront className="size-4" aria-hidden="true" />
                {isFrench ? "Waka ne commande pas le taxi" : "Waka does not order the taxi"}
              </div>
              <p className="mt-2">
                {isFrench
                  ? "Le groupe se rencontre, s’accorde sur les contributions, puis choisit qui commande."
                  : "The group meets, agrees on contributions, then chooses who places the order."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => authenticatedEmail ? setIsCreating(true) : onSignup()}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400"
            >
              <Plus className="size-4" aria-hidden="true" />
              {isFrench ? "Créer un groupe" : "Create a group"}
            </button>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                {matchingGroups.length} {isFrench ? "groupes disponibles" : "groups available"}
              </p>
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <Clock3 className="size-3.5" aria-hidden="true" />
                {departureWindow}
              </span>
            </div>
            <div className="space-y-4">
              {matchingGroups.length > 0 ? matchingGroups.map((group) => {
                const isJoined = joinedGroups.includes(group.id);
                return (
                  <article key={group.id} className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">{group.window}</p>
                        <h3 className="mt-1 text-lg font-semibold">{group.corridor}</h3>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                        {group.status}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">{group.destinations}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4 text-sm dark:border-white/10">
                      <span className="flex items-center gap-2 text-neutral-500">
                        <Users className="size-4" aria-hidden="true" />
                        {group.members}/{group.capacity} · {isFrench ? "coordonné par" : "coordinated by"} {group.coordinator}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleJoin(group.id)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                          isJoined
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                            : "bg-neutral-100 text-neutral-900 hover:bg-amber-100 dark:bg-white/10 dark:text-white dark:hover:bg-amber-500/20",
                        )}
                      >
                        {isJoined ? <Check className="size-4" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
                        {isJoined ? (isFrench ? "Vous êtes dedans" : "You're in") : (isFrench ? "Rejoindre" : "Join group")}
                      </button>
                    </div>
                  </article>
                );
              }) : (
                <div className="rounded-3xl border border-dashed border-neutral-300 p-10 text-center dark:border-white/15">
                  <p className="font-medium">{isFrench ? "Aucun groupe pour le moment." : "No groups yet."}</p>
                  <p className="mt-2 text-sm text-neutral-500">{isFrench ? "Soyez le premier à créer ce départ." : "Be the first to create this departure."}</p>
                </div>
              )}
            </div>
            <figure className="relative mt-6 min-h-56 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900 shadow-sm dark:border-white/10">
              <img
                src={RIDE_BOARD_IMAGE}
                alt={isFrench ? "Vue aérienne de Yaoundé, Cameroun" : "Aerial view of Yaoundé, Cameroon"}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />
              <figcaption className="relative flex min-h-56 items-end p-5 text-sm text-white">
                <span>
                  <span className="block font-medium">
                    {isFrench ? "Rentrez ensemble." : "Get home together."}
                  </span>
                  <span className="mt-1 block text-xs text-white/70">
                    {isFrench ? "Un départ partagé commence par un itinéraire commun." : "A shared departure starts with a shared route."}
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {isCreating && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-neutral-950">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{isFrench ? "Créer votre groupe" : "Create your group"}</h3>
                <p className="mt-1 text-sm text-neutral-500">{corridor} · {departureWindow}</p>
              </div>
              <button type="button" onClick={() => setIsCreating(false)} className="text-sm text-neutral-500 hover:text-neutral-950 dark:hover:text-white">Close</button>
            </div>
            <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
              {isFrench
                ? "Ajoutez vos destinations exactes dans le chat du groupe et choisissez un point de rendez-vous public."
                : "Add exact destinations in the group chat and choose a public meeting point."}
            </p>
            <button type="button" onClick={createGroup} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-amber-500 text-sm font-medium text-neutral-950 hover:bg-amber-400">
              {isFrench ? "Publier le groupe" : "Publish group"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
