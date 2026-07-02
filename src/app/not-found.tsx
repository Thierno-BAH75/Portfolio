import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold gradient-text">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Page non trouvée</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Button variant="glow" asChild>
          <Link href="/">
            <Home size={16} className="mr-2" />
            Retour à l&apos;accueil
          </Link>
        </Button>
      </div>
    </div>
  );
}
