"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [form, setForm] = useState({
    name: "",
    password: "",
    gender: "",
    bio: "",
    location: "",
  });

  const [loadingData, setLoadingData] = useState(true);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ FETCH USER DATA
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();

        setForm({
          name: data.name || "",
          password: "",
          gender: data.gender || "",
          bio: data.bio || "",
          location: data.location || "",
        });
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoadingData(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ SAVE
  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setMessage("Profile updated successfully 🎉");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  // ✅ LOADING SCREEN
  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

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
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatar} flex items-center justify-center text-white text-xl font-bold`}
            >
              {form.name?.[0]}
            </div>

            <div>
              <h2 className="text-white text-xl font-semibold">
                {form.name}
              </h2>
              <p className="text-gray-400 text-sm">
                {session?.user?.email}
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

          {/* ✅ ERROR */}
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          {/* ✅ SUCCESS */}
          {message && (
            <p className="text-sm text-green-400">{message}</p>
          )}

          <div className="flex gap-3 pt-4">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 bg-white text-black py-2 rounded-xl"
                >
                  {loading ? "Saving..." : "Save Changes"}
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

/* FIELD */
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