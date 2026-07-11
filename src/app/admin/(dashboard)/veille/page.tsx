import { getAllVeilleSourcesAdmin, getAllVeilleBookmarksAdmin } from "@/lib/admin-data";
import { VeilleTabs } from "@/components/admin/veille/veille-tabs";

export default async function AdminVeillePage() {
  const [sources, bookmarks] = await Promise.all([
    getAllVeilleSourcesAdmin(),
    getAllVeilleBookmarksAdmin(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Veille</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Sources RSS affichées sur /veille et articles mis en avant.
      </p>
      <VeilleTabs sources={sources} bookmarks={bookmarks} />
    </div>
  );
}
