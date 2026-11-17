import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";
import { PublicHeader } from "@/components/auth/public-header";
import { embeddedAppearance } from "@/components/auth/embedded";
import { Card } from "@/components/ui";

export default function SignInPage() {
  return (
    <div className="flex w-full flex-1 flex-col items-center bg-canvas">
      <PublicHeader />
      <main className="flex w-full justify-center px-4 py-[120px] max-md:py-8">
        <Card className="flex w-[440px] max-w-full flex-col items-start gap-4 p-8! max-md:p-6!">
          <h1 className="text-[22px] font-bold text-ink">Sign in to Funnel Lab</h1>
          <p className="text-[14px] text-ink-2">Use Google or get a code by email.</p>
          <Suspense fallback={<div className="h-64 w-full" />}>
            <SignIn appearance={embeddedAppearance} />
          </Suspense>
        </Card>
      </main>
    </div>
  );
}
