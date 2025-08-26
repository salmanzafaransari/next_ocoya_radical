"use client";

import { Phone, Lock, Mail, KeyRound, User } from "lucide-react";
import { useState } from "react";
import API from "@/lib/axios"; // axios instance

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Default Brand";
const brandLogo = process.env.NEXT_PUBLIC_BRAND_LOGO || "/next.svg";

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export default function AuthForm({ isLogin, setIsLogin }: AuthFormProps) {
  const [activeMethod, setActiveMethod] = useState("magic"); // "magic" = OTP, "password"

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP login states
  const [contactNumber, setContactNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState(""); // comes from sendotp response
  const [otpSent, setOtpSent] = useState(false);

  // Signup states
  const [name, setName] = useState("");
  const [signupContactNumber, setSignupContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Password Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeMethod === "password") {
      setLoading(true);
      setError("");

      try {
        const { data } = await API.post("/auth/login/", { email, password });
        if (!data.success) throw new Error(data.message || "Login failed");

        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/";
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Login failed");
      } finally {
        setLoading(false);
      }
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("/auth/sendotp/", {
        contactnumber: contactNumber,
      });

      if (!data.success) throw new Error(data.message || "OTP sending failed");

      setUsername(data.username);
      setOtpSent(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "OTP sending failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("/auth/loginviaotp/", {
        username,
        otp,
      });

      if (!data.success) throw new Error(data.message || "OTP verification failed");

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Register (Signup)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("/auth/register/", {
        name,
        email,
        password,
        contact_number: signupContactNumber,
        country_code: countryCode,
      });

      if (!data.success) throw new Error(data.message || "Signup failed");

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-[17px] font-semibold mb-1 text-gray-900">
          {isLogin ? `Login to ${brandName}` : `Sign up to ${brandName}`}
        </h1>

        <p className="text-dimmed">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a
            onClick={() => setIsLogin(!isLogin)}
            className="link-login-signup font-medium hover:underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </a>
        </p>
      </div>

      {/* Auth Methods Toggle (only for login) */}
      {isLogin && (
        <div className="px-6">
          <div className="relative flex bg-gray-100 rounded-lg p-1">
            <span
              className={`absolute top-1 bottom-1 w-[calc(50%-0.5rem)] bg-white rounded-md shadow-sm transition-transform duration-300 ease-in-out ${
                activeMethod === "magic"
                  ? "translate-x-0"
                  : "translate-x-[calc(100%+0.5rem)]"
              }`}
            />

            <button
              type="button"
              onClick={() => {
                setActiveMethod("magic");
                setOtpSent(false);
                setOtp("");
              }}
              className={`relative z-10 flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeMethod === "magic" ? "text-gray-900" : "text-gray-600"
              }`}
            >
              OTP
            </button>

            <button
              type="button"
              onClick={() => setActiveMethod("password")}
              className={`relative z-10 flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeMethod === "password" ? "text-gray-900" : "text-gray-600"
              }`}
            >
              Password
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <form
        className="px-6 py-4"
        onSubmit={isLogin ? handleLogin : handleRegister}
      >
        <div className="space-y-4">
          {/* SIGNUP INPUTS */}
          {!isLogin && (
            <>
              {/* Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="eion@spacex.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={signupContactNumber}
                  onChange={(e) => setSignupContactNumber(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* LOGIN (Password Method) */}
          {isLogin && activeMethod === "password" && (
            <>
              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="eion@spacex.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-place-size block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* LOGIN (OTP Method) */}
          {isLogin && activeMethod === "magic" && (
            <>
              {!otpSent ? (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </>
          )}

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit buttons */}
          {isLogin && activeMethod === "magic" ? (
            !otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="btn-color w-full text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading}
                className="btn-color w-full text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            )
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="btn-color w-full text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              {loading ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="relative flex items-center my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          className="w-full flex btn-color-google items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
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
        </button>

        {!isLogin && (
          <p className="text-sm text-gray-500 mt-6">
            By continuing, you agree to the Terms of Service and Privacy Policy
          </p>
        )}
      </form>
    </>
  );
}
