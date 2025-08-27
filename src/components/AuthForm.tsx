"use client";

import { Phone, Lock, Mail, KeyRound, User } from "lucide-react";
import { useState } from "react";
import API from "@/lib/axios"; // axios instance
import GoogleLoginButton from "./googleAuthBtn/GoogleLoginButton";

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
        <GoogleLoginButton/>

        {!isLogin && (
          <p className="text-sm text-gray-500 mt-6">
            By continuing, you agree to the Terms of Service and Privacy Policy
          </p>
        )}
      </form>
    </>
  );
}
