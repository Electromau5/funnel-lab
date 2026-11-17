import { Tag } from "@/components/ui";
import { getProject, type ProjectId } from "@/lib/projects";

// Tag/Project (51:414): which project an item on a combined screen belongs to.
export function ProjectTag({ projectId }: { projectId: ProjectId }) {
  return (
    <Tag className="border border-line bg-white! text-ink-2">{getProject(projectId).name}</Tag>
  );
}
