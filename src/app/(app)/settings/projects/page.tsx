import { Page } from "@/components/app-shell";
import { ProjectList } from "@/components/settings/project-list";
import { SettingsTabs } from "@/components/settings/settings-tabs";
import { ButtonLink, Card, PageHeader } from "@/components/ui";
import { PLAN_PROJECT_LIMIT, PROJECTS } from "@/lib/projects";

// Figma: Projects (53:623)
export default function ProjectsPage() {
  return (
    <Page crumb="Settings / Projects">
      <SettingsTabs active="projects" />
      <PageHeader
        title="Projects"
        subtitle={`${PROJECTS.length} of ${PLAN_PROJECT_LIMIT} projects on your plan. Each project is one market segment for your product, with its own ICP, offers, tests, results and sending inbox.`}
        actions={<ButtonLink href="/settings/projects/new">Add new project</ButtonLink>}
      />
      <div data-tour="projects" className="w-full">
        <ProjectList />
      </div>
      <div className="flex w-full items-start gap-6 max-lg:flex-col">
        <Card className="flex min-w-0 flex-1 flex-col gap-2 p-5 max-lg:w-full">
          <p className="text-[16px] font-semibold text-ink">Who sees which project</p>
          <p className="text-[14px] leading-5 text-ink-2">
            You and your cofounder both see every project. Today, Approvals and Replies combine
            them; the project switcher in the sidebar filters them or picks the project for Setup,
            Tests and Results.
          </p>
        </Card>
        <Card className="flex min-w-0 flex-1 flex-col gap-2 p-5 max-lg:w-full">
          <p className="text-[16px] font-semibold text-ink">Deleting a project</p>
          <p className="text-[14px] leading-5 text-ink-2">
            Deleting a project stops its tests and frees a slot on your plan. Its threads and
            results are kept for 30 days. Need a fourth project at once? See the higher plan on
            Plan.
          </p>
        </Card>
      </div>
    </Page>
  );
}
