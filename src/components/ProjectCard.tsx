import { Link } from 'react-router-dom';
import { Clock, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const progress = (project.currentAmount / project.goalAmount) * 100;

  return (
    <Card className="overflow-hidden hover-scale border-2 hover:border-primary/50 transition-all">
      <Link to={`/projects/${project.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-5 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded-full">
                Destacado
              </span>
            )}
          </div>
          <Link to={`/projects/${project.id}`}>
            <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {project.shortDescription}
          </p>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="font-bold text-lg text-primary">
                {project.currentAmount.toLocaleString('es-ES')}€
              </span>
              <span className="text-muted-foreground"> de {project.goalAmount.toLocaleString('es-ES')}€</span>
            </div>
            <span className="text-muted-foreground font-medium">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{project.supportersCount} apoyos</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{project.daysLeft} días</span>
          </div>
        </div>

        <Button className="w-full" variant="outline" asChild>
          <Link to={`/projects/${project.id}`}>
            Ver Proyecto
          </Link>
        </Button>
      </div>
    </Card>
  );
};
