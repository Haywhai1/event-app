"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

/* ✅ TYPE */
type UserType = {
  name: string;
  email: string;
  gender?: "male" | "female" | "";
};

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<UserType | null>(null);

  /* ✅ FETCH USER */
  useEffect(() => {
    const fetchUser = async () => {
      if (!session) return;

      try {
        const res = await fetch("/api/user/me");
        const data: UserType = await res.json();
        setUser(data);
      } catch {
        console.log("Failed to load user");
      }
    };

    fetchUser();
  }, [session]);

  /* ✅ NAME + INITIALS */
  const name = user?.name || session?.user?.name || "";

  const initials = name
    ? name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "P";

  /* ✅ NAVIGATION */
  const navigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const handleSignOut = () => {
    setOpen(false);
    signOut();
  };

  /* ✅ CLICK OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  /* ✅ AVATAR */
  const avatar =
    user?.gender === "male"
      ? "from-blue-500 to-cyan-400"
      : user?.gender === "female"
      ? "from-pink-500 to-purple-500"
      : "from-gray-500 to-gray-700";

  return (
    <div className="relative" ref={menuRef}>
      {/* PROFILE ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center border border-white/10 overflow-hidden"
      >
        {session ? (
          <div
            className={`w-full h-full bg-gradient-to-br ${avatar} flex items-center justify-center`}
          >
            <span className="text-white text-lg font-semibold">
              {initials}
            </span>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        )}
      </button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden z-50
            bg-white/5 backdrop-blur-xl
            border border-white/10
            shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          >
            {session ? (
              <>
                <MenuItem
                  icon={<User size={16} />}
                  label="Profile"
                  onClick={() => navigate("/profile")}
                />
                <MenuItem
                  icon={<Calendar size={16} />}
                  label="My Events"
                  onClick={() => navigate("/my-events")}
                />
                <MenuItem
                  icon={<Settings size={16} />}
                  label="Settings"
                  onClick={() => navigate("/settings")}
                />

                <Divider />

                <MenuItem
                  icon={<LogOut size={16} />}
                  label="Logout"
                  onClick={handleSignOut}
                  danger
                />
              </>
            ) : (
              <>
                <MenuItem
                  icon={<Calendar size={16} />}
                  label="My Events"
                  onClick={() => navigate("/my-events")}
                />
                <MenuItem
                  icon={<Settings size={16} />}
                  label="Settings"
                  onClick={() => navigate("/settings")}
                />

                <Divider />

                <MenuItem
                  icon={<UserPlus size={16} />}
                  label="Register"
                  onClick={() => navigate("/signup")}
                />
                <MenuItem
                  icon={<LogIn size={16} />}
                  label="Sign In"
                  onClick={() => navigate("/signin")}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ✅ MENU ITEM */
function MenuItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/10 ${
        danger ? "text-red-500" : "text-grayText"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* ✅ DIVIDER */
function Divider() {
  return <div className="h-px bg-white/10 my-2 opacity-50" />;
}