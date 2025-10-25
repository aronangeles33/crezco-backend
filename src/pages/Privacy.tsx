const Privacy = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Información que Recopilamos</h2>
            <p>
              En CREZCO recopilamos diferentes tipos de información para proporcionar y mejorar nuestros servicios:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Información de cuenta (nombre, email, ubicación)</li>
              <li>Información de proyectos y transacciones</li>
              <li>Datos de uso y preferencias</li>
              <li>Información técnica (dirección IP, tipo de navegador)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Uso de la Información</h2>
            <p>Utilizamos tu información para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proporcionar y mantener nuestros servicios</li>
              <li>Procesar transacciones y pagos</li>
              <li>Comunicarnos contigo sobre tu cuenta y actualizaciones</li>
              <li>Mejorar y personalizar tu experiencia</li>
              <li>Prevenir fraudes y garantizar la seguridad</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Compartir Información</h2>
            <p>
              No vendemos tu información personal. Podemos compartir información con:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proveedores de servicios de pago (cumpliendo con PSD2)</li>
              <li>Servicios de análisis y hosting</li>
              <li>Autoridades legales cuando sea requerido por ley</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Seguridad de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información, 
              incluyendo encriptación, acceso restringido y auditorías regulares de seguridad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Tus Derechos (RGPD)</h2>
            <p>Conforme al RGPD, tienes derecho a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar información inexacta</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Solicitar la portabilidad de tus datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies</h2>
            <p>
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso 
              de la plataforma y personalizar contenido. Puedes controlar las cookies a través de 
              la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Retención de Datos</h2>
            <p>
              Conservamos tu información personal durante el tiempo necesario para cumplir con los 
              propósitos descritos en esta política, a menos que la ley requiera un período de retención más largo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Menores de Edad</h2>
            <p>
              Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos 
              intencionalmente información de menores de edad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta política de privacidad periódicamente. Te notificaremos sobre 
              cambios significativos publicando la nueva política en esta página.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contacto</h2>
            <p>
              Para ejercer tus derechos o preguntas sobre privacidad, contáctanos en: 
              <br />
              <strong>Email:</strong> privacidad@crezco.es
              <br />
              <strong>Dirección:</strong> Madrid, España
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

export default Privacy;
