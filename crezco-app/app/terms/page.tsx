'use client'

import Link from 'next/link'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-8 md:p-12 mb-8">
            <div className="text-5xl mb-4">📜</div>
            <h1 className="text-4xl font-bold mb-4">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Impulso Crezco - Plataforma de Crowdfunding
            </p>
            <div className="flex items-center gap-4 text-gray-300 text-sm">
              <span>📅 Última actualización: 16 de Octubre de 2025</span>
              <span>•</span>
              <span>⏱️ 15 min lectura</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm border p-8 md:p-12 prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="font-semibold text-blue-800 mb-2">📌 Importante:</p>
              <p className="text-blue-800 text-sm">
                Al usar Impulso Crezco, aceptas estos términos en su totalidad. Si no estás de acuerdo, 
                por favor no uses nuestra plataforma. Te recomendamos leer estos términos detenidamente.
              </p>
            </div>

            <h2>📋 Índice de Contenidos</h2>
            <ol>
              <li><a href="#definiciones">Definiciones</a></li>
              <li><a href="#aceptacion">Aceptación de Términos</a></li>
              <li><a href="#servicios">Descripción de Servicios</a></li>
              <li><a href="#cuentas">Cuentas de Usuario</a></li>
              <li><a href="#creadores">Obligaciones de los Creadores</a></li>
              <li><a href="#apoyadores">Obligaciones de los Apoyadores</a></li>
              <li><a href="#credcamer">Sistema Credcamer</a></li>
              <li><a href="#pagos">Pagos y Comisiones</a></li>
              <li><a href="#propiedad">Propiedad Intelectual</a></li>
              <li><a href="#privacidad">Privacidad y Datos</a></li>
              <li><a href="#prohibiciones">Conductas Prohibidas</a></li>
              <li><a href="#responsabilidad">Limitación de Responsabilidad</a></li>
              <li><a href="#disputas">Resolución de Disputas</a></li>
              <li><a href="#modificaciones">Modificaciones</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ol>

            <hr />

            <h2 id="definiciones">1. Definiciones 📖</h2>
            <p>Para efectos de estos términos, se entiende por:</p>
            <ul>
              <li><strong>"Impulso Crezco", "Plataforma", "nosotros", "nos":</strong> La plataforma de crowdfunding operada por Impulso Crezco S.L., empresa registrada en España.</li>
              <li><strong>"Usuario", "tú", "tu":</strong> Cualquier persona que accede o usa nuestra plataforma.</li>
              <li><strong>"Creador":</strong> Usuario que publica un proyecto para recaudar fondos.</li>
              <li><strong>"Apoyador":</strong> Usuario que contribuye financieramente a un proyecto.</li>
              <li><strong>"Credcamer":</strong> Usuario con rol especial que capta y ayuda a preparar proyectos.</li>
              <li><strong>"Proyecto":</strong> Campaña de crowdfunding publicada en la plataforma.</li>
              <li><strong>"Apoyo", "Contribución":</strong> Aporte financiero realizado por un Apoyador a un Proyecto.</li>
              <li><strong>"Meta":</strong> Cantidad de financiamiento objetivo de un Proyecto.</li>
              <li><strong>"Recompensa":</strong> Beneficio ofrecido por un Creador a cambio de un Apoyo.</li>
            </ul>

            <h2 id="aceptacion">2. Aceptación de Términos ✅</h2>
            <h3>2.1. Acuerdo Vinculante</h3>
            <p>
              Al crear una cuenta, publicar un proyecto, realizar un apoyo, o usar cualquier servicio de 
              Impulso Crezco, aceptas estar legalmente obligado por estos Términos y Condiciones, así como 
              nuestra <Link href="/privacy" className="text-purple-600 hover:underline">Política de Privacidad</Link>.
            </p>

            <h3>2.2. Edad Mínima</h3>
            <p>
              Debes tener al menos <strong>18 años</strong> para usar Impulso Crezco. Si tienes entre 14-17 años, 
              puedes usar la plataforma solo con supervisión y consentimiento de un padre o tutor legal.
            </p>

            <h3>2.3. Capacidad Legal</h3>
            <p>
              Al aceptar estos términos, declaras que:
            </p>
            <ul>
              <li>Tienes capacidad legal para celebrar contratos vinculantes</li>
              <li>No estás prohibido por ley de usar servicios de crowdfunding</li>
              <li>Cumples con todas las leyes aplicables en tu jurisdicción</li>
            </ul>

            <h2 id="servicios">3. Descripción de Servicios 🌐</h2>
            <h3>3.1. Qué Ofrecemos</h3>
            <p>
              Impulso Crezco es una plataforma que <strong>conecta</strong> a creadores con apoyadores. 
              Facilitamos el proceso de crowdfunding, pero <strong>NO somos</strong>:
            </p>
            <ul>
              <li>❌ Una institución financiera o banco</li>
              <li>❌ Un asesor de inversiones</li>
              <li>❌ Garantes del éxito de los proyectos</li>
              <li>❌ Responsables de la entrega de recompensas</li>
            </ul>

            <h3>3.2. Modelo "Todo o Nada"</h3>
            <p>
              Operamos bajo el modelo "Todo o Nada": si un proyecto NO alcanza el 100% de su meta antes 
              de la fecha límite, <strong>todos los apoyadores son reembolsados automáticamente</strong> 
              y el creador no recibe ningún fondo.
            </p>

            <h3>3.3. Disponibilidad del Servicio</h3>
            <p>
              Nos esforzamos por mantener la plataforma disponible 24/7, pero NO garantizamos:
            </p>
            <ul>
              <li>Acceso ininterrumpido (puede haber mantenimiento)</li>
              <li>Libre de errores o bugs</li>
              <li>Compatibilidad con todo hardware/software</li>
            </ul>

            <h2 id="cuentas">4. Cuentas de Usuario 👤</h2>
            <h3>4.1. Registro</h3>
            <p>Para crear una cuenta necesitas proporcionar:</p>
            <ul>
              <li>Email válido (verificado)</li>
              <li>Nombre completo (real, no seudónimos)</li>
              <li>Contraseña segura</li>
              <li>Aceptación de estos términos</li>
            </ul>

            <h3>4.2. Verificación de Identidad</h3>
            <p>
              Para <strong>crear proyectos</strong>, debemos verificar tu identidad mediante:
            </p>
            <ul>
              <li>Documento de identidad válido (DNI, pasaporte)</li>
              <li>Selfie de verificación</li>
              <li>Información bancaria (para recibir fondos)</li>
            </ul>
            <p>
              Esto cumple con regulaciones anti-lavado de dinero (AML) y conoce-a-tu-cliente (KYC).
            </p>

            <h3>4.3. Seguridad de la Cuenta</h3>
            <p>Eres responsable de:</p>
            <ul>
              <li>✅ Mantener tu contraseña segura y confidencial</li>
              <li>✅ Todas las actividades bajo tu cuenta</li>
              <li>✅ Notificarnos inmediatamente si detectas acceso no autorizado</li>
            </ul>

            <h3>4.4. Una Cuenta por Persona</h3>
            <p>
              Solo puedes tener <strong>UNA cuenta</strong>. Crear múltiples cuentas (excepto para 
              empresas/organizaciones legítimas) es motivo de suspensión.
            </p>

            <h3>4.5. Suspensión y Terminación</h3>
            <p>Podemos suspender o eliminar tu cuenta si:</p>
            <ul>
              <li>Violas estos términos</li>
              <li>Proporcionas información falsa</li>
              <li>Realizas actividades fraudulentas</li>
              <li>No usas tu cuenta por más de 2 años (inactiva)</li>
            </ul>

            <h2 id="creadores">5. Obligaciones de los Creadores 📝</h2>
            <h3>5.1. Veracidad de la Información</h3>
            <p>Como creador, garantizas que:</p>
            <ul>
              <li>✅ Toda la información del proyecto es verdadera y precisa</li>
              <li>✅ Tienes derechos sobre todo el contenido publicado</li>
              <li>✅ El proyecto es legal y viable</li>
              <li>✅ Usarás los fondos según lo declarado</li>
            </ul>

            <h3>5.2. Contenido del Proyecto</h3>
            <p>Tu proyecto debe incluir:</p>
            <ul>
              <li>Descripción clara del proyecto</li>
              <li>Meta de financiamiento realista</li>
              <li>Desglose detallado del uso de fondos</li>
              <li>Riesgos y desafíos (transparencia)</li>
              <li>Timeline de ejecución</li>
            </ul>

            <h3>5.3. Comunicación con Apoyadores</h3>
            <p>Debes:</p>
            <ul>
              <li>📢 Publicar actualizaciones regulares (mínimo cada 15 días)</li>
              <li>💬 Responder preguntas en menos de 72 horas</li>
              <li>⚠️ Notificar inmediatamente cualquier problema o retraso</li>
              <li>📦 Cumplir con la entrega de recompensas prometidas</li>
            </ul>

            <h3>5.4. Uso de Fondos</h3>
            <p>Los fondos recaudados DEBEN usarse exclusivamente para:</p>
            <ul>
              <li>Desarrollar y ejecutar el proyecto según lo descrito</li>
              <li>Producir y entregar las recompensas prometidas</li>
              <li>Costos operativos directamente relacionados</li>
            </ul>

            <h3>5.5. Prohibiciones para Creadores</h3>
            <p>NO puedes:</p>
            <ul>
              <li>❌ Ofrecer participación accionaria (equity)</li>
              <li>❌ Prometer retornos de inversión garantizados</li>
              <li>❌ Recaudar fondos para préstamos o deudas personales</li>
              <li>❌ Publicar proyectos de terceros sin autorización</li>
              <li>❌ Manipular métricas (comprar apoyos falsos)</li>
            </ul>

            <h2 id="apoyadores">6. Obligaciones de los Apoyadores 💰</h2>
            <h3>6.1. Naturaleza del Apoyo</h3>
            <p>Al apoyar un proyecto, entiendes que:</p>
            <ul>
              <li>NO es una compra garantizada (es apoyo a un proyecto en desarrollo)</li>
              <li>NO es una inversión con retorno financiero</li>
              <li>El creador puede enfrentar retrasos o dificultades</li>
              <li>Las recompensas pueden variar respecto al concepto inicial</li>
            </ul>

            <h3>6.2. Compromiso Financiero</h3>
            <p>Cuando apoyas un proyecto:</p>
            <ul>
              <li>💳 Tu tarjeta se cobra <strong>inmediatamente</strong></li>
              <li>🔒 El apoyo es <strong>vinculante</strong> (solo cancelable hasta 48h antes del fin)</li>
              <li>💸 Si el proyecto alcanza su meta, NO puedes solicitar reembolso</li>
              <li>🔄 Si NO alcanza la meta, recibes reembolso completo (5-7 días)</li>
            </ul>

            <h3>6.3. Comunicación Respetuosa</h3>
            <p>Debes:</p>
            <ul>
              <li>✅ Comunicarte respetuosamente con creadores</li>
              <li>✅ Comprender que son personas reales (no corporaciones)</li>
              <li>❌ No acosar, amenazar o insultar</li>
            </ul>

            <h2 id="credcamer">7. Sistema Credcamer 🎯</h2>
            <h3>7.1. Rol del Credcamer</h3>
            <p>Los Credcamers son usuarios que:</p>
            <ul>
              <li>Descubren proyectos prometedores antes del lanzamiento</li>
              <li>Ayudan a creadores a preparar sus campañas</li>
              <li>Completan el "wizard de captación" en nombre del creador</li>
              <li>Ganan puntos según el desempeño del proyecto</li>
            </ul>

            <h3>7.2. Responsabilidades del Credcamer</h3>
            <p>Como Credcamer, te comprometes a:</p>
            <ul>
              <li>✅ Verificar la veracidad de la información proporcionada</li>
              <li>✅ No captar tu propio proyecto (conflicto de interés)</li>
              <li>✅ Mantener confidencialidad de información sensible</li>
              <li>✅ Actuar con honestidad e integridad</li>
              <li>❌ No recibir pagos externos del creador por captación</li>
            </ul>

            <h3>7.3. Sistema de Puntos</h3>
            <p>Los puntos del Credcamer:</p>
            <ul>
              <li>NO son dinero (son métricas de desempeño)</li>
              <li>Se convierten en premios mensuales según ranking</li>
              <li>NO son transferibles ni vendibles</li>
              <li>Pueden ser revocados por mal comportamiento</li>
            </ul>

            <h2 id="pagos">8. Pagos y Comisiones 💳</h2>
            <h3>8.1. Comisiones de Plataforma</h3>
            <p>Cobramos las siguientes comisiones (solo sobre proyectos exitosos):</p>
            <ul>
              <li><strong>5%</strong> de comisión de plataforma</li>
              <li><strong>2.9% + €0.30</strong> por transacción (comisión de procesador Stripe)</li>
            </ul>
            <p><strong>Ejemplo:</strong> Si recaudas €10,000, recibes €9,180 netos.</p>

            <h3>8.2. Procesamiento de Pagos</h3>
            <p>Usamos <strong>Stripe</strong> como procesador de pagos. Al usar nuestra plataforma, 
            también aceptas los <a href="https://stripe.com/legal" target="_blank" rel="noopener" className="text-purple-600 hover:underline">Términos de Servicio de Stripe</a>.</p>

            <h3>8.3. Transferencia de Fondos a Creadores</h3>
            <p>Los fondos se transfieren:</p>
            <ul>
              <li>⏱️ Entre 5-7 días laborables después del fin de campaña exitosa</li>
              <li>🏦 A la cuenta bancaria registrada y verificada</li>
              <li>💶 Solo cuentas SEPA (zona euro)</li>
            </ul>

            <h3>8.4. Reembolsos</h3>
            <p>Reembolsos automáticos si:</p>
            <ul>
              <li>El proyecto NO alcanza su meta</li>
              <li>El proyecto es cancelado por el creador</li>
              <li>El proyecto es suspendido por fraude</li>
            </ul>

            <h3>8.5. Impuestos</h3>
            <p>
              TÚ eres responsable de declarar y pagar todos los impuestos aplicables en tu jurisdicción. 
              Proporcionamos facturas, pero NO somos asesores fiscales.
            </p>

            <h2 id="propiedad">9. Propiedad Intelectual 📄</h2>
            <h3>9.1. Contenido del Usuario</h3>
            <p>Tú conservas todos los derechos sobre el contenido que publicas. Sin embargo, nos otorgas una 
            <strong> licencia mundial, no exclusiva, libre de regalías</strong> para:</p>
            <ul>
              <li>Mostrar tu proyecto en nuestra plataforma</li>
              <li>Promocionarlo en redes sociales y marketing</li>
              <li>Crear miniaturas y versiones optimizadas</li>
              <li>Almacenar backups</li>
            </ul>

            <h3>9.2. Marca Impulso Crezco</h3>
            <p>
              "Impulso Crezco", nuestro logo, diseño y elementos visuales son propiedad exclusiva nuestra. 
              NO puedes usarlos sin permiso escrito.
            </p>

            <h3>9.3. Violaciones de Copyright</h3>
            <p>
              Si crees que alguien usa tu contenido sin permiso, contáctanos a 
              <strong> copyright@impulsocrezco.com</strong> con evidencia clara.
            </p>

            <h2 id="privacidad">10. Privacidad y Datos 🔒</h2>
            <p>
              El manejo de tus datos personales está regido por nuestra 
              <Link href="/privacy" className="text-purple-600 hover:underline"> Política de Privacidad</Link>, 
              que cumple con el <strong>RGPD</strong> (Reglamento General de Protección de Datos de la UE).
            </p>

            <h3>Resumen de tus derechos:</h3>
            <ul>
              <li>✅ Acceder a tus datos</li>
              <li>✅ Rectificar información incorrecta</li>
              <li>✅ Eliminar tu cuenta y datos</li>
              <li>✅ Exportar tus datos</li>
              <li>✅ Oponerte al procesamiento</li>
            </ul>

            <h2 id="prohibiciones">11. Conductas Prohibidas 🚫</h2>
            <p>Está estrictamente prohibido:</p>

            <h3>11.1. Proyectos Prohibidos</h3>
            <ul>
              <li>❌ Contenido ilegal, fraudulento o engañoso</li>
              <li>❌ Armas, explosivos, drogas ilegales</li>
              <li>❌ Esquemas piramidales o multinivel</li>
              <li>❌ Contenido de odio, discriminación o violencia</li>
              <li>❌ Pornografía o contenido sexual explícito</li>
              <li>❌ Préstamos, deudas personales, apuestas</li>
              <li>❌ Criptomonedas, ICOs, tokens</li>
            </ul>

            <h3>11.2. Actividades Prohibidas</h3>
            <ul>
              <li>❌ Fraude o suplantación de identidad</li>
              <li>❌ Manipulación de métricas (apoyos falsos)</li>
              <li>❌ Spam o marketing no solicitado</li>
              <li>❌ Hackear, vulnerar la seguridad</li>
              <li>❌ Scraping automatizado sin permiso</li>
              <li>❌ Crear múltiples cuentas falsas</li>
            </ul>

            <h3>11.3. Consecuencias</h3>
            <p>Violar estas prohibiciones resulta en:</p>
            <ul>
              <li>⚠️ Suspensión inmediata de cuenta</li>
              <li>🚫 Eliminación de proyectos</li>
              <li>💸 Pérdida de fondos recaudados</li>
              <li>⚖️ Acciones legales si aplica</li>
            </ul>

            <h2 id="responsabilidad">12. Limitación de Responsabilidad ⚖️</h2>
            <h3>12.1. No Garantizamos</h3>
            <p>NO garantizamos ni somos responsables de:</p>
            <ul>
              <li>❌ El éxito de ningún proyecto</li>
              <li>❌ La calidad de proyectos o recompensas</li>
              <li>❌ El comportamiento de usuarios (creadores/apoyadores)</li>
              <li>❌ Pérdidas financieras derivadas de proyectos fallidos</li>
              <li>❌ Disponibilidad ininterrumpida del servicio</li>
            </ul>

            <h3>12.2. Uso Bajo Tu Propio Riesgo</h3>
            <p>
              El uso de Impulso Crezco es <strong>"TAL CUAL"</strong> y <strong>"SEGÚN DISPONIBILIDAD"</strong>. 
              Asumes todos los riesgos asociados con:
            </p>
            <ul>
              <li>Crear o apoyar proyectos</li>
              <li>Interactuar con otros usuarios</li>
              <li>Compartir información personal</li>
            </ul>

            <h3>12.3. Límite de Responsabilidad</h3>
            <p>
              Nuestra responsabilidad máxima hacia ti NO excederá la cantidad de <strong>comisiones que 
              hayas pagado</strong> en los últimos 12 meses (o €100, lo que sea mayor).
            </p>

            <h3>12.4. Indemnización</h3>
            <p>Aceptas indemnizarnos contra cualquier reclamación, pérdida o daño derivado de:</p>
            <ul>
              <li>Tu violación de estos términos</li>
              <li>Tu violación de derechos de terceros</li>
              <li>Tu uso indebido de la plataforma</li>
            </ul>

            <h2 id="disputas">13. Resolución de Disputas 🤝</h2>
            <h3>13.1. Entre Usuarios</h3>
            <p>
              Disputas entre creadores y apoyadores (ej. recompensas no entregadas) deben resolverse 
              <strong> directamente entre las partes</strong>. Ofrecemos mediación voluntaria, pero NO 
              somos árbitros obligatorios.
            </p>

            <h3>13.2. Con Impulso Crezco</h3>
            <p>Si tienes una disputa con nosotros:</p>
            <ol>
              <li><strong>Contacto informal:</strong> Escríbenos a legal@impulsocrezco.com</li>
              <li><strong>Negociación:</strong> Intentaremos resolver en 30 días</li>
              <li><strong>Mediación:</strong> Si no se resuelve, mediación ante entidad certificada</li>
              <li><strong>Arbitraje:</strong> Como última opción, arbitraje vinculante en Madrid, España</li>
            </ol>

            <h3>13.3. Ley Aplicable</h3>
            <p>
              Estos términos se rigen por las <strong>leyes de España</strong>. Los tribunales de 
              <strong> Madrid</strong> tienen jurisdicción exclusiva.
            </p>

            <h2 id="modificaciones">14. Modificaciones de los Términos 🔄</h2>
            <h3>14.1. Derecho a Modificar</h3>
            <p>
              Podemos modificar estos términos en cualquier momento. Si son cambios significativos:
            </p>
            <ul>
              <li>📧 Te notificaremos por email con 30 días de anticipación</li>
              <li>📢 Publicaremos aviso en la plataforma</li>
              <li>🗓️ La fecha de "Última actualización" cambiará</li>
            </ul>

            <h3>14.2. Aceptación de Cambios</h3>
            <p>
              Continuar usando la plataforma después de los cambios significa que <strong>aceptas los 
              nuevos términos</strong>. Si no estás de acuerdo, debes dejar de usar el servicio.
            </p>

            <h2 id="contacto">15. Información de Contacto 📞</h2>
            <p><strong>Impulso Crezco S.L.</strong></p>
            <ul className="list-none">
              <li>📍 Dirección: Calle Innovación 123, 28001 Madrid, España</li>
              <li>📧 Email general: hola@impulsocrezco.com</li>
              <li>⚖️ Email legal: legal@impulsocrezco.com</li>
              <li>🛡️ Email privacidad: privacidad@impulsocrezco.com</li>
              <li>📞 Teléfono: +34 912 345 678</li>
              <li>🆔 CIF: B-12345678</li>
            </ul>

            <hr className="my-8" />

            <h2>Disposiciones Finales ✍️</h2>

            <h3>Divisibilidad</h3>
            <p>
              Si alguna disposición de estos términos es inválida, el resto continúa en pleno vigor.
            </p>

            <h3>Renuncia</h3>
            <p>
              Nuestra falta de ejercicio de un derecho NO constituye renuncia a ese derecho.
            </p>

            <h3>Acuerdo Completo</h3>
            <p>
              Estos términos, junto con la Política de Privacidad, constituyen el acuerdo completo entre 
              tú y nosotros respecto al uso de la plataforma.
            </p>

            <h3>Idioma</h3>
            <p>
              La versión en español de estos términos es la oficial. Traducciones son solo de referencia.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
              <p className="font-semibold text-green-800 mb-2">✅ Gracias por leer</p>
              <p className="text-green-800">
                Sabemos que los términos legales son densos, pero es importante que entiendas tus derechos 
                y obligaciones. Si tienes preguntas, nuestro equipo legal está disponible en 
                <strong> legal@impulsocrezco.com</strong>
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Volver al Inicio
              </Link>
              <Link
                href="/privacy"
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/faq"
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Preguntas Frecuentes
              </Link>
            </div>
          </div>

          {/* Quick summary box */}
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-purple-200">
            <h3 className="text-xl font-bold mb-4">📌 Resumen Rápido (no vinculante)</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-2">✅ Tus Derechos:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Usar la plataforma libremente</li>
                  <li>Conservar derechos de tu contenido</li>
                  <li>Cancelar apoyo hasta 48h antes</li>
                  <li>Reembolso si proyecto falla</li>
                  <li>Privacidad de tus datos (RGPD)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">📋 Tus Obligaciones:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Ser mayor de 18 años</li>
                  <li>Proporcionar información veraz</li>
                  <li>Cumplir promesas (creadores)</li>
                  <li>Respetar a otros usuarios</li>
                  <li>No realizar actividades ilegales</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4 italic">
              * Este resumen es solo orientativo. El documento completo arriba es el legalmente vinculante.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
