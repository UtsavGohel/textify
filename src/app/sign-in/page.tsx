"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [session, router]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Prevents full-page reload
      });

      if (result?.error) throw new Error(result.error);

      toast.success("Sign-in successful!");
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 rounded-lg font-semibold text-lg ${
              loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
