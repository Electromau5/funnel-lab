import { Page } from "@/components/app-shell";
import { NewProjectForm } from "@/components/settings/new-project-form";
import { SettingsTabs } from "@/components/settings/settings-tabs";
import { PageHeader } from "@/components/ui";

// Figma: New project (53:780)
export default function NewProjectPage() {
  return (
    <Page crumb="Settings / Projects / New project">
      <SettingsTabs active="projects" />
      <PageHeader
        title="New project"
        subtitle="One market segment for your product, with its own ICP, offers, tests and sending inbox."
      />
      <NewProjectForm />
    </Page>
  );
}
