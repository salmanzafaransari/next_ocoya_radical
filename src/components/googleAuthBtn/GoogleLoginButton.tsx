"use client";

import { useState } from "react";
import API from "@/lib/axios";

const googleClientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    if (loading) return; // prevent double clicks
    setLoading(true);
    setError("");

    try {
      //@ts-ignore
      const google = window.google;
      if (!google) {
        setError("Google SDK not loaded yet");
        setLoading(false);
        return;
      }

      google.accounts.id.initialize({
        client_id: googleClientID,
        callback: async (response: any) => {
          const id_token = response.credential;
          setLoading(false);
          try {
            const { data } = await API.post("/auth/google/", {
              id_token,
              device_token_key: "optional-device-key", // optional
            });

            if (!data.success) throw new Error(data.message || "Google login failed");

            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            localStorage.setItem("user", JSON.stringify(data.user));

            window.location.href = "/";
          } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Google login failed");
          }
        },
      });

      google.accounts.id.prompt(); // open Google popup
    } catch (err: any) {
      console.error("Google login error", err);
      setError("Google login failed");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg font-medium transition-colors ${
          loading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "btn-color-google text-gray-700 hover:bg-gray-50"
        }`}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </>
        )}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
