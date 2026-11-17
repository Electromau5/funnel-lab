import { Suspense } from "react";
import { PublicHeader } from "@/components/auth/public-header";
import { SignUpSteps } from "@/components/auth/sign-up-steps";
import { Card } from "@/components/ui";

// Figma: Sign up (5:72). Two states: create a workspace (founder), or join one
// from an emailed invite (cofounder).
export default function SignUpPage() {
  return (
    <div className="flex w-full flex-1 flex-col items-center bg-canvas">
      <PublicHeader />
      <main className="flex w-full justify-center px-4 py-[120px] max-md:py-8">
        <Card className="flex w-[440px] max-w-full flex-col items-start gap-4 p-8! max-md:p-6!">
          <Suspense fallback={<div className="h-64 w-full" />}>
            <SignUpSteps />
          </Suspense>
        </Card>
      </main>
    </div>
  );
}
