import { Target, Users, Heart, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-20 text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Nuestra Historia
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Creemos en el poder de la comunidad para transformar ideas en realidad
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Qué es CREZCO?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              CREZCO es una plataforma de micromecenazgo diseñada específicamente para jóvenes 
              emprendedores y creadores españoles. Creemos que no necesitas grandes inversores 
              para empezar, solo necesitas personas que crean en ti y en tu proyecto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Misión Clara</h3>
              <p className="text-sm text-muted-foreground">
                Democratizar el acceso a financiación para emprendedores
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="inline-flex p-4 rounded-full bg-accent/10 mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Comunidad</h3>
              <p className="text-sm text-muted-foreground">
                Construir una red de apoyo entre creadores y seguidores
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="inline-flex p-4 rounded-full bg-warning/10 mb-4">
                <Heart className="h-8 w-8 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Transparencia</h3>
              <p className="text-sm text-muted-foreground">
                Total visibilidad en el uso de fondos y progreso
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Impacto Real</h3>
              <p className="text-sm text-muted-foreground">
                Proyectos que generan cambio positivo en la sociedad
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Nuestros Valores
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Accesibilidad</h3>
                <p className="text-muted-foreground">
                  Creemos que todos deben tener la oportunidad de financiar sus proyectos, 
                  sin importar su ubicación o experiencia previa.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Comunidad</h3>
                <p className="text-muted-foreground">
                  Fomentamos conexiones reales entre creadores y sus seguidores, 
                  construyendo relaciones duraderas basadas en la confianza.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Innovación</h3>
                <p className="text-muted-foreground">
                  Apoyamos ideas frescas y disruptivas que tienen el potencial 
                  de transformar industrias y comunidades.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Responsabilidad</h3>
                <p className="text-muted-foreground">
                  Promovemos la transparencia total y la responsabilidad en el uso 
                  de los fondos recaudados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestro Impacto
            </h2>
            <p className="text-lg text-muted-foreground">
              Juntos estamos construyendo algo grande
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-5xl font-bold text-primary mb-2">500+</p>
              <p className="text-muted-foreground">Proyectos Financiados</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-accent mb-2">2M€</p>
              <p className="text-muted-foreground">Total Recaudado</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-warning mb-2">10k+</p>
              <p className="text-muted-foreground">Miembros Activos</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
