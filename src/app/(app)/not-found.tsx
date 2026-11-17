import { Page } from "@/components/app-shell";
import { ButtonLink, PageHeader } from "@/components/ui";

export default function NotFound() {
  return (
    <Page crumb="Not found">
      <PageHeader
        title="This page does not exist"
        subtitle="The test, offer or thread you opened may have been removed."
        actions={<ButtonLink href="/today">Back to Today</ButtonLink>}
      />
    </Page>
  );
}
