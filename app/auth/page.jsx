"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import "@/app/globals.css";

function Login() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={40}
          className="w-[160px] mb-10"
        />
        <div className="flex items-center flex-col border rounded-2xl p-8">
          <Image
            src={"/video_conferece_04.jpg"}
            alt="login"
            width={600}
            height={400}
            className="w-[400px] h-[250px] rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-center">Welcome to AIREC</h2>
          <p className="text-gray-500 text-center">Sign in with Google</p>

          <Button className="mt-7 w-full" onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
