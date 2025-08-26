"use client";

import { useState } from "react";
import AuthForm from "./AuthForm";
import AuthFeatures from "./AuthFeatures";

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex">
      <div className={`flex flex-col util-bg-dots items-center justify-center p-4 ${isLogin ? 'w-full' : 'w-full md:w-1/2'}`}>
        <div className="w-full sm:max-w-sm mx-10 bg-white overflow-hidden ocaya">
          <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
      </div>
      {!isLogin && (
        <div className="hidden md:flex bg-white md:w-1/2 flex-col justify-center items-center min-h-screen dark:bg-dark-6 border">
          <AuthFeatures />
        </div>
      )}
    </div>
  );
}