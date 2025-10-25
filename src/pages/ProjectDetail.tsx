import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Clock, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getProjectById } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Project } from '@/types';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getProjectById(id);
        setProject(data);
      } catch (error) {
        console.error('Error cargando proyecto:', error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        <p className="mt-4 text-muted-foreground">Cargando proyecto...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Proyecto no encontrado</h1>
        <p className="text-muted-foreground mb-6">El proyecto que buscas no existe o ha sido eliminado.</p>
        <Button asChild>
          <Link to="/projects">Ver todos los proyectos</Link>
        </Button>
      </div>
    );
  }

  const progress = (project.currentAmount / project.goalAmount) * 100;

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a proyectos
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Image */}
            <div className="aspect-video rounded-xl overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-sm font-medium text-warning bg-warning/10 px-3 py-1 rounded-full">
                    Destacado
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              
              {/* Creator */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <Avatar>
                  <AvatarImage src={project.creator.avatar} />
                  <AvatarFallback>{project.creator.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Creado por</p>
                  <p className="font-semibold">{project.creator.name}</p>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Sobre este proyecto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Este proyecto representa una oportunidad única para transformar una idea innovadora en realidad. 
                  Con tu apoyo, podremos alcanzar nuestros objetivos y crear un impacto positivo en nuestra comunidad.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Cada contribución, sin importar el tamaño, nos acerca más a nuestro objetivo. 
                  Únete a nosotros en este viaje y sé parte de algo especial.
                </p>
              </div>
            </div>

            {/* Updates */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Actualizaciones del Proyecto</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-sm text-muted-foreground mb-1">Hace 3 días</p>
                  <h3 className="font-semibold mb-2">¡Hemos alcanzado el 60% de nuestra meta!</h3>
                  <p className="text-muted-foreground">
                    Estamos increíblemente agradecidos por todo el apoyo recibido. 
                    Gracias a ustedes, estamos cada vez más cerca de hacer realidad este proyecto.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Card */}
            <Card className="p-6 sticky top-24">
              <div className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-3xl font-bold text-primary">
                      {project.currentAmount.toLocaleString('es-ES')}€
                    </span>
                    <span className="text-muted-foreground">
                      de {project.goalAmount.toLocaleString('es-ES')}€
                    </span>
                  </div>
                  <Progress value={progress} className="h-3 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {Math.round(progress)}% financiado
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Apoyos</span>
                    </div>
                    <p className="text-2xl font-bold">{project.supportersCount}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Días restantes</span>
                    </div>
                    <p className="text-2xl font-bold">{project.daysLeft}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button size="lg" className="w-full" asChild>
                    <Link to={`/donate/${project.id}`}>
                      Apoyar este Proyecto
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="flex-1">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="flex-1">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✓ Pagos 100% seguros</p>
                  <p>✓ Transparencia total</p>
                  <p>✓ Apoyo desde 5€</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
