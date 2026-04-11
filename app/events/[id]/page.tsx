import { notFound } from "next/navigation";
import { headers } from "next/headers";
import EventClient from "./EventClient";

async function getEvent(id: string) {
  const headersList = await headers();
  const host = headersList.get("host");

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ FIX
}) {
  const { id } = await params; // ✅ VERY IMPORTANT

  if (!id) return notFound(); // extra safety

  const event = await getEvent(id);

  if (!event) return notFound();

  return <EventClient event={event} />;
}