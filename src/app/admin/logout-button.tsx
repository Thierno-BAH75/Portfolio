"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
    >
      <LogOut className="w-4 h-4" />
      Déconnexion
    </Button>
  );
}
