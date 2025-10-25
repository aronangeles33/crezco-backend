const Terms = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Aceptación de Términos</h2>
            <p>
              Al acceder y utilizar CREZCO, aceptas estar legalmente vinculado por estos términos y condiciones. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Descripción del Servicio</h2>
            <p>
              CREZCO es una plataforma de micromecenazgo que conecta a creadores de proyectos con personas 
              interesadas en apoyar iniciativas innovadoras. Facilitamos las transacciones entre ambas partes 
              pero no somos responsables del éxito o fracaso de los proyectos publicados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Responsabilidades de los Usuarios</h2>
            <p>Los usuarios se comprometen a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proporcionar información veraz y actualizada</li>
              <li>Mantener la confidencialidad de sus credenciales de acceso</li>
              <li>No utilizar la plataforma para actividades ilegales o fraudulentas</li>
              <li>Respetar los derechos de propiedad intelectual de otros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Proyectos y Donaciones</h2>
            <p>
              Los creadores de proyectos son responsables de cumplir con las promesas hechas a sus patrocinadores. 
              CREZCO actúa únicamente como intermediario y no garantiza el cumplimiento de los proyectos financiados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Tarifas y Pagos</h2>
            <p>
              CREZCO cobra una comisión sobre los fondos recaudados exitosamente. Los detalles específicos 
              de las tarifas se comunican claramente durante el proceso de creación del proyecto.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de CREZCO, incluyendo diseño, textos, gráficos y software, está protegido 
              por derechos de autor y otras leyes de propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
              significativos serán notificados a los usuarios con antelación razonable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contacto</h2>
            <p>
              Para preguntas sobre estos términos, puedes contactarnos en: legal@crezco.es
            </p>
          </section>

          <p className="text-sm italic pt-8">
            Última actualización: Octubre 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
