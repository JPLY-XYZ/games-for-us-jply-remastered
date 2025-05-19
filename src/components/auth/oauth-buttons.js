'use client'
import { loginDiscord, loginGoogle, loginReddit } from "@/lib/actions";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useMemo } from "react";

function OauthButtons() {
  const [stateGoogle, actionGoogle, pendingGoogle] = useActionState(loginGoogle, {})
  const [stateDiscord, actionDiscord, pendingDiscord] = useActionState(loginDiscord, {})
  const [stateReddit, actionReddit, pendingReddit] = useActionState(loginReddit, {})

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '';

  const errorMessage = useMemo(() => {
    try {
      const url = new URL(callbackUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
      const error = url.searchParams.get('error');
      if (error === 'AccessDenied') {
        return 'Tu cuenta está desactivada. Contacta con el administrador.';
      }
      return null;
    } catch {
      return null;
    }
  }, [callbackUrl]);

  return (
    <>
      <form className="flex flex-row gap-4 w-full justify-center flex-nowrap">
        <button
          disabled={pendingGoogle}
          formAction={actionGoogle}
          className=" cursor-pointer flex items-center justify-center gap-2 w-[200px] px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-slate-200 transition"
        >
          <img src="/images/google.svg" alt="Google" className="h-5 w-5" />
          {pendingGoogle ? <Loader className="animate-spin" /> : 'Google'}
        </button>

        <button
          disabled={pendingDiscord}
          formAction={actionDiscord}
          className="cursor-pointer flex items-center justify-center gap-2 w-[200px] px-4 py-2 bg-[#5865F2] text-white font-semibold rounded-md hover:bg-indigo-600 transition"
        >
          <img src="/images/discord.svg" alt="Discord" className="h-5 w-5" />
          {pendingDiscord ? <Loader className="animate-spin" /> : 'Discord'}
        </button>

        <button
          disabled={pendingReddit}
          formAction={actionReddit}
          className=" cursor-pointer flex items-center justify-center gap-2 w-[200px] px-4 py-2 bg-orange-700 text-white font-semibold rounded-md hover:bg-orange-600 transition"
        >
          <img src="/images/reddit.svg" alt="Reddit" className="h-6 w-6" />
          {pendingReddit ? <Loader className="animate-spin" /> : 'Reddit'}
        </button>
      </form>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </>
  );
}

export default OauthButtons;
