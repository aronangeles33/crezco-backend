import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Users, Heart, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { mockUser, mockProjects } from '@/lib/mockData';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const userProjects = mockProjects.filter(p => p.creatorId === mockUser.id);

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={mockUser.avatar} />
              <AvatarFallback>{mockUser.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{mockUser.name}</h1>
              <p className="text-muted-foreground">{mockUser.email}</p>
            </div>
          </div>
          <Button asChild>
            <Link to="/create">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Proyecto
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Proyectos Activos</p>
                <p className="text-3xl font-bold">{userProjects.length}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Recaudado</p>
                <p className="text-3xl font-bold">8.800€</p>
              </div>
              <div className="p-3 rounded-full bg-accent/10">
                <Heart className="h-6 w-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Apoyos Totales</p>
                <p className="text-3xl font-bold">147</p>
              </div>
              <div className="p-3 rounded-full bg-warning/10">
                <Users className="h-6 w-6 text-warning" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="projects">Mis Proyectos</TabsTrigger>
            <TabsTrigger value="supported">Proyectos Apoyados</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            {userProjects.length > 0 ? (
              userProjects.map((project) => {
                const progress = (project.currentAmount / project.goalAmount) * 100;
                return (
                  <Card key={project.id} className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full md:w-48 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">{project.shortDescription}</p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/projects/${project.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </Link>
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">
                              {project.currentAmount.toLocaleString('es-ES')}€ de {project.goalAmount.toLocaleString('es-ES')}€
                            </span>
                            <span className="text-muted-foreground">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>{project.supportersCount} apoyos</span>
                            <span>{project.daysLeft} días restantes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">Aún no has creado ningún proyecto</p>
                <Button asChild>
                  <Link to="/create">Crear mi primer proyecto</Link>
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="supported" className="space-y-6">
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No has apoyado ningún proyecto todavía</p>
              <Button variant="outline" asChild>
                <Link to="/projects">Explorar Proyectos</Link>
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Información del Perfil</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre</label>
                  <p className="text-muted-foreground">{mockUser.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <p className="text-muted-foreground">{mockUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ubicación</label>
                  <p className="text-muted-foreground">{mockUser.location || 'No especificada'}</p>
                </div>
                <Button variant="outline">Editar Perfil</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
