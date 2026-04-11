import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // ❌ Not logged in
  if (!session) redirect("/signin");

  // ❌ Logged in but not admin
  if (session.user.role !== "admin") redirect("/");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid gap-4">
        <a
          href="/admin/createEvent"
          className="bg-primary text-white px-4 py-3 rounded-xl text-center font-medium shadow hover:opacity-90 transition"
        >
          ➕ Create New Event
        </a>

        <a
          href="/admin/events"
          className="bg-white/10 backdrop-blur border border-white/10 text-white px-4 py-3 rounded-xl text-center font-medium hover:bg-white/20 transition"
        >
          📅 Manage Existing Events
        </a>
      </div>
    </div>
  );
}