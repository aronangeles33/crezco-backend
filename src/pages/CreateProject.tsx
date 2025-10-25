import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { categories } from '@/lib/mockData';
import { toast } from 'sonner';

const CreateProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('¡Proyecto creado con éxito!');
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Crea tu Proyecto</h1>
          <p className="text-lg text-muted-foreground">
            Comparte tu idea con el mundo y empieza a recibir apoyo
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center flex-1">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  i <= step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {i}
              </div>
              {i < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    i < step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Proyecto *</Label>
                  <Input
                    id="title"
                    placeholder="Un título claro y atractivo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.slug}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDesc">Descripción Corta *</Label>
                  <Input
                    id="shortDesc"
                    placeholder="Resume tu proyecto en una línea"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción Completa *</Label>
                  <Textarea
                    id="description"
                    placeholder="Cuenta tu historia, explica tu visión y por qué tu proyecto es importante..."
                    rows={8}
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="goal">Meta de Financiación (€) *</Label>
                  <Input
                    id="goal"
                    type="number"
                    placeholder="5000"
                    min="100"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Mínimo 100€. Sé realista con tu objetivo.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duración de la Campaña (días) *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 días</SelectItem>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="45">45 días</SelectItem>
                      <SelectItem value="60">60 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Imagen Principal *</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Arrastra una imagen o haz clic para seleccionar
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG hasta 5MB. Recomendado: 1200x800px
                    </p>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                    <svg
                      className="h-12 w-12 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">¡Casi listo!</h2>
                  <p className="text-muted-foreground">
                    Revisa tu proyecto antes de publicarlo
                  </p>
                </div>

                <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-4">Resumen del Proyecto</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoría:</span>
                      <span className="font-medium">Tecnología</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meta:</span>
                      <span className="font-medium">5.000€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duración:</span>
                      <span className="font-medium">30 días</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-accent-foreground">
                    💡 <strong>Consejo:</strong> Los proyectos con descripciones detalladas 
                    y buenas imágenes reciben un 50% más de apoyo.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4 pt-6 border-t">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Anterior
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  className="ml-auto"
                  onClick={() => setStep(step + 1)}
                >
                  Siguiente
                </Button>
              ) : (
                <Button type="submit" className="ml-auto">
                  Publicar Proyecto
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateProject;
