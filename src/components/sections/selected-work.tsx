import { Band } from '@/components/ui/band'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/ui/project-card'
import { Reveal } from '@/components/ui/reveal'
import { featuredProjects } from '@/content/projects'

/** Brief §8.3. */
export function SelectedWork() {
  return (
    <Band
      id="work"
      label="SELECTED WORK"
      action={
        <Button href="/work" variant="ghost" size="sm">
          VIEW ALL PROJECTS
        </Button>
      }
    >
      <Reveal as="ul" stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <li key={project.slug} className="flex">
            <ProjectCard
              index={project.index}
              title={project.title}
              category={project.category}
              cover={project.cover}
              href={project.href}
              concept={project.concept}
              className="w-full"
            />
          </li>
        ))}
      </Reveal>
    </Band>
  )
}
