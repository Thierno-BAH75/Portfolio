import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getUnreadMessageCount } from "@/lib/admin-data";

// Layout partagé par toutes les pages admin protégées (tout sauf /admin/login).
// Le middleware protège déjà /admin/*, cette vérification serveur évite tout
// flash de contenu si jamais contournée.
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const unreadCount = await getUnreadMessageCount();

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar userEmail={user.email ?? ""} unreadCount={unreadCount} />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
