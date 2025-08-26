"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Settings, User, LogOut, HelpCircle, DollarSign } from "lucide-react";
import API from "@/lib/axios"; 

export default function Header() {
  console.log("Saved User:", JSON.parse(localStorage.getItem("user")));
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Always clear token and redirect
      localStorage.removeItem("accessToken");
      router.push("/auth");
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-12 relative">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:cursor-pointer hover:bg-gray-100">
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-full hover:cursor-pointer hover:bg-gray-100">
          <Settings size={20} />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            className="w-9 h-9 rounded-full hover:cursor-pointer bg-gray-200 flex items-center justify-center"
            onClick={() => setOpen(!open)}
          >
            <User size={18} />
          </button>

          {open && (
            <div className="absolute overflow-hidden right-0 mt-2 w-60 bg-white rounded-sm shadow-lg border z-50">
              {/* Top user info */}
              <div className="flex items-center bg-blue-900 gap-3 px-4 py-3 border-b">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{user.email}</p>
                  <span className="text-xs bg-white px-2 py-0.5 rounded-full">
                    Silver Plan
                  </span>
                </div>
              </div>

              {/* Menu options */}
              <div className="grid grid-cols-2 divide-x divide-y">
                <button className="flex flex-col items-center justify-center py-4 hover:bg-gray-50">
                  <User size={18} />
                  <span className="text-xs mt-1">My Profile</span>
                </button>

                <button className="flex flex-col items-center justify-center py-4 hover:bg-gray-50">
                  <DollarSign size={18} />
                  <span className="text-xs mt-1">Subscription</span>
                </button>

                <button className="flex flex-col items-center justify-center py-4 hover:bg-gray-50">
                  <HelpCircle size={18} />
                  <span className="text-xs mt-1">Help</span>
                </button>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center py-4 hover:bg-gray-50 text-red-500"
                >
                  <LogOut size={18} />
                  <span className="text-xs mt-1">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
