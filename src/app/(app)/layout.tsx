import { Sidebar } from "@/components/app-shell";
import { ProductTour } from "@/components/onboarding/product-tour";
import { getCurrentProjectId } from "@/lib/current-project";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Not awaited: the sidebar reads it inside its own Suspense boundary.
  const currentProjectId = getCurrentProjectId();
  return (
    <div className="flex min-h-screen w-full items-start bg-canvas">
      <Sidebar currentProjectId={currentProjectId} />
      {children}
      <ProductTour />
    </div>
  );
}
