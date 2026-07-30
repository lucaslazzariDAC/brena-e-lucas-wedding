import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Área dos Noivos · Lucas & Brena" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/admin" },
    });
    if (error) {
      toast.error("Erro com Google", { description: error.message });
      setLoading(false);
    }
    // On success the browser is redirected to Google, so no further action here.
  };

  return (
    <main className="min-h-screen bg-navy-texture px-6 py-20 text-paper">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-display text-2xl tracking-[0.2em] sm:text-3xl">
          ÁREA DOS NOIVOS
        </h1>
        <div className="mx-auto mt-6 h-px w-24 bg-silver/40" />
        <p className="mt-6 text-center text-sm text-silver">Entre para acessar o painel</p>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-sm border border-silver/40 bg-paper px-4 py-3 text-sm font-medium text-navy-deep transition hover:bg-silver/20 disabled:opacity-60"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              fill="#4285F4"
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
            />
            <path
              fill="#FBBC05"
              d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
            />
            <path
              fill="#EA4335"
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
            />
          </svg>
          {loading ? "..." : "Entrar com Google"}
        </button>
      </div>
    </main>
  );
}
