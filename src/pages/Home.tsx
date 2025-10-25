import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/ProjectCard';
import { CategoryCard } from '@/components/CategoryCard';
import { categories } from '@/lib/mockData';
import { getFeaturedProjects } from '@/lib/api';
import heroBg from '@/assets/hero-bg.jpg';
import { useEffect, useState } from 'react';
import { Project } from '@/types';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const projects = await getFeaturedProjects();
        setFeaturedProjects(projects);
      } catch (error) {
        console.error('Error cargando proyectos:', error);
        setFeaturedProjects([]); // Si falla, array vacío
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 gradient-hero opacity-90" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Apoya a los que están empezando
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light">
              Invierte en personas, no en bancos. Impulsa proyectos desde 5€.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="hero" asChild className="text-lg">
                <Link to="/projects">
                  Explorar Proyectos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                <Link to="/create">
                  Crear Proyecto
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proyectos Destacados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre iniciativas increíbles de jóvenes emprendedores españoles
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-4 text-muted-foreground">Cargando proyectos...</p>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No hay proyectos destacados disponibles.</p>
              <p className="text-sm text-muted-foreground mt-2">¡Sé el primero en crear uno!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="accent" size="lg" asChild>
              <Link to="/projects">
                Ver Todos los Proyectos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explora por Categoría
            </h2>
            <p className="text-lg text-muted-foreground">
              Encuentra proyectos en las áreas que más te interesan
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Why CREZCO */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué CREZCO?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No necesitas inversores, necesitas personas que crean en ti
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6">
              <div className="inline-flex p-4 rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Fácil y Rápido</h3>
              <p className="text-muted-foreground">
                Crea tu proyecto en minutos y empieza a recibir apoyo desde el primer día
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="inline-flex p-4 rounded-full bg-accent/10">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Comunidad Real</h3>
              <p className="text-muted-foreground">
                Conecta con personas que comparten tu visión y quieren verte triunfar
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="inline-flex p-4 rounded-full bg-warning/10">
                <Shield className="h-8 w-8 text-warning" />
              </div>
              <h3 className="text-xl font-semibold">100% Seguro</h3>
              <p className="text-muted-foreground">
                Pagos seguros y transparencia total en cada proyecto
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="gradient-hero rounded-3xl p-12 md:p-20 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Únete a cientos de creadores que ya están construyendo su futuro con el apoyo de la comunidad
            </p>
            <Button size="lg" variant="hero" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/create">
                Crear Mi Proyecto
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
