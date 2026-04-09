"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [form, setForm] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    password: "",
    gender: "",
    bio: "",
    location: "",
  });

  const [editing, setEditing] = useState(false);

  const handleSave = async () => {
    await fetch("/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setEditing(false);
  };

  const avatar =
    form.gender === "male"
      ? "from-blue-500 to-cyan-400"
      : form.gender === "female"
      ? "from-pink-500 to-purple-500"
      : "from-gray-500 to-gray-700";

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111]">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* PROFILE CARD */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-4">

            {/* AVATAR */}
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatar} flex items-center justify-center text-white text-xl font-bold`}
            >
              {form.name?.[0]}
            </div>

            <div>
              <h2 className="text-white text-xl font-semibold">
                {form.name || "Your Name"}
              </h2>
              <p className="text-gray-400 text-sm">
                {form.email}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Joined recently
              </p>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-4">

          <Field label="Gender">
            {editing ? (
              <select
                value={form.gender}
                onChange={(e) =>
                  setForm({ ...form, gender: e.target.value })
                }
                className="input text-black"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <span>{form.gender || "Not set"}</span>
            )}
          </Field>

          <Field label="Bio">
            {editing ? (
              <input
                value={form.bio}
                onChange={(e) =>
                  setForm({ ...form, bio: e.target.value })
                }
                className="input text-black"
              />
            ) : (
              <span>{form.bio || "No bio"}</span>
            )}
          </Field>

          <Field label="Location">
            {editing ? (
              <input
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
                className="input text-black"
              />
            ) : (
              <span>{form.location || "Not set"}</span>
            )}
          </Field>
        </div>

        {/* ACCOUNT SETTINGS */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-4">

          <Field label="Username">
            {editing ? (
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="input text-black"
              />
            ) : (
              <span>{form.name}</span>
            )}
          </Field>

          <Field label="Email">
            {editing ? (
              <input
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="input text-black"
              />
            ) : (
              <span>{form.email}</span>
            )}
          </Field>

          {editing && (
            <Field label="New Password">
              <input
                type="password"
                placeholder="Enter new password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="input text-black"
              />
            </Field>
          )}

          <div className="flex gap-3 pt-4">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-white text-black py-2 rounded-xl"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-white/10 text-white py-2 rounded-xl"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="w-full bg-white text-black py-2 rounded-xl"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* FIELD COMPONENT */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <div className="text-white">{children}</div>
    </div>
  );
}