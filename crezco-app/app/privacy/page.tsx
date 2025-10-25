'use client'

import Link from 'next/link'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 md:p-12 mb-8">
            <div className="text-5xl mb-4">🔒</div>
            <h1 className="text-4xl font-bold mb-4">
              Política de Privacidad
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Cómo protegemos y gestionamos tus datos personales
            </p>
            <div className="flex items-center gap-4 text-blue-100 text-sm">
              <span>📅 Última actualización: 16 de Octubre de 2025</span>
              <span>•</span>
              <span>⏱️ 12 min lectura</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm border p-8 md:p-12 prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="font-semibold text-blue-800 mb-2">🛡️ Tu privacidad es importante:</p>
              <p className="text-blue-800 text-sm">
                Esta política explica qué datos recopilamos, por qué, cómo los usamos y tus derechos. 
                Cumplimos con el <strong>RGPD</strong> (Reglamento General de Protección de Datos de la UE).
              </p>
            </div>

            <h2>📋 Índice de Contenidos</h2>
            <ol>
              <li><a href="#quien">Quién somos</a></li>
              <li><a href="#que-datos">Qué datos recopilamos</a></li>
              <li><a href="#como">Cómo recopilamos datos</a></li>
              <li><a href="#por-que">Por qué usamos tus datos</a></li>
              <li><a href="#base-legal">Base legal del procesamiento</a></li>
              <li><a href="#compartir">Con quién compartimos tus datos</a></li>
              <li><a href="#seguridad">Cómo protegemos tus datos</a></li>
              <li><a href="#retencion">Cuánto tiempo guardamos tus datos</a></li>
              <li><a href="#cookies">Cookies y tecnologías similares</a></li>
              <li><a href="#derechos">Tus derechos (RGPD)</a></li>
              <li><a href="#menores">Privacidad de menores</a></li>
              <li><a href="#internacional">Transferencias internacionales</a></li>
              <li><a href="#cambios">Cambios a esta política</a></li>
              <li><a href="#contacto">Contacto y reclamaciones</a></li>
            </ol>

            <hr />

            <h2 id="quien">1. Quién somos 🏢</h2>
            <p>
              <strong>Impulso Crezco S.L.</strong> es el responsable del tratamiento de tus datos personales.
            </p>
            <ul className="list-none">
              <li><strong>Nombre legal:</strong> Impulso Crezco S.L.</li>
              <li><strong>CIF:</strong> B-12345678</li>
              <li><strong>Dirección:</strong> Calle Innovación 123, 28001 Madrid, España</li>
              <li><strong>Email de privacidad:</strong> privacidad@impulsocrezco.com</li>
              <li><strong>DPO (Delegado de Protección de Datos):</strong> dpo@impulsocrezco.com</li>
            </ul>

            <p>
              Cuando uses nuestra plataforma (web, apps móviles, servicios), procesaremos tus datos 
              personales de acuerdo con esta política y el RGPD.
            </p>

            <h2 id="que-datos">2. Qué datos recopilamos 📊</h2>

            <h3>2.1. Datos que proporcionas directamente</h3>

            <h4>Al crear cuenta:</h4>
            <ul>
              <li><strong>Información básica:</strong> Nombre completo, email, contraseña (encriptada), fecha de nacimiento</li>
              <li><strong>Perfil opcional:</strong> Biografía, foto de perfil, ubicación, enlaces a redes sociales</li>
            </ul>

            <h4>Al verificar identidad (creadores):</h4>
            <ul>
              <li><strong>Documentos:</strong> DNI, pasaporte o documento equivalente</li>
              <li><strong>Información bancaria:</strong> IBAN, nombre del titular de la cuenta</li>
              <li><strong>Selfie de verificación:</strong> Para comparar con documento</li>
              <li><strong>Dirección fiscal:</strong> Para cumplimiento tributario</li>
            </ul>

            <h4>Al crear un proyecto:</h4>
            <ul>
              <li><strong>Contenido del proyecto:</strong> Título, descripción, imágenes, videos</li>
              <li><strong>Información financiera:</strong> Meta de financiamiento, uso de fondos</li>
              <li><strong>Plan de ejecución:</strong> Timeline, riesgos, recompensas</li>
            </ul>

            <h4>Al apoyar un proyecto:</h4>
            <ul>
              <li><strong>Información de pago:</strong> Procesada por Stripe (nosotros NO guardamos tarjetas)</li>
              <li><strong>Dirección de envío:</strong> Si el proyecto ofrece recompensas físicas</li>
              <li><strong>Monto y fecha:</strong> Del apoyo realizado</li>
            </ul>

            <h4>Al comunicarte:</h4>
            <ul>
              <li><strong>Mensajes:</strong> Comentarios en proyectos, mensajes directos, tickets de soporte</li>
              <li><strong>Feedback:</strong> Encuestas, reseñas, sugerencias</li>
            </ul>

            <h3>2.2. Datos que recopilamos automáticamente</h3>

            <h4>Datos técnicos:</h4>
            <ul>
              <li><strong>Dispositivo:</strong> Tipo, modelo, sistema operativo, versión de navegador</li>
              <li><strong>Conexión:</strong> Dirección IP, ISP, ubicación aproximada (ciudad/país)</li>
              <li><strong>Uso:</strong> Páginas visitadas, tiempo en página, clics, scrolling</li>
              <li><strong>Cookies:</strong> Identificadores únicos, preferencias (ver sección 9)</li>
            </ul>

            <h4>Datos de comportamiento:</h4>
            <ul>
              <li><strong>Actividad:</strong> Proyectos visitados, búsquedas realizadas, favoritos</li>
              <li><strong>Interacciones:</strong> Comentarios, likes, compartidos</li>
              <li><strong>Historial de apoyos:</strong> Proyectos que has apoyado, cantidades</li>
            </ul>

            <h3>2.3. Datos de terceros</h3>
            <ul>
              <li><strong>Redes sociales:</strong> Si te registras con Google/Facebook, recibimos: nombre, email, foto (solo lo que autorices)</li>
              <li><strong>Credcamers:</strong> Si un Credcamer te capta, puede proporcionar información básica tuya con tu consentimiento</li>
            </ul>

            <h2 id="como">3. Cómo recopilamos datos 🔍</h2>
            <ul>
              <li><strong>Formularios web:</strong> Registro, creación de proyectos, contacto</li>
              <li><strong>Cookies y scripts:</strong> Google Analytics, Hotjar (comportamiento)</li>
              <li><strong>APIs de terceros:</strong> Stripe (pagos), Google/Facebook (login social)</li>
              <li><strong>Emails:</strong> Si nos escribes, guardamos el contenido</li>
              <li><strong>Logs de servidor:</strong> Registros automáticos de accesos</li>
            </ul>

            <h2 id="por-que">4. Por qué usamos tus datos 🎯</h2>

            <h3>4.1. Proporcionar el servicio</h3>
            <ul>
              <li>✅ Crear y gestionar tu cuenta</li>
              <li>✅ Procesar publicación de proyectos</li>
              <li>✅ Facilitar apoyos y pagos</li>
              <li>✅ Enviar notificaciones importantes (confirmaciones, actualizaciones)</li>
              <li>✅ Proporcionar soporte técnico</li>
            </ul>

            <h3>4.2. Mejorar y personalizar</h3>
            <ul>
              <li>📈 Analizar cómo usas la plataforma</li>
              <li>🎨 Personalizar recomendaciones de proyectos</li>
              <li>🐛 Detectar y corregir bugs</li>
              <li>🚀 Desarrollar nuevas funcionalidades</li>
            </ul>

            <h3>4.3. Seguridad y prevención de fraude</h3>
            <ul>
              <li>🛡️ Verificar identidad (KYC/AML)</li>
              <li>🚨 Detectar actividades sospechosas</li>
              <li>🔒 Proteger contra hackeos y spam</li>
              <li>⚖️ Cumplir con obligaciones legales</li>
            </ul>

            <h3>4.4. Comunicación y marketing</h3>
            <ul>
              <li>📧 Enviarte emails transaccionales (obligatorios)</li>
              <li>📢 Enviarte newsletters (opcional, puedes cancelar)</li>
              <li>🎉 Informarte de proyectos que pueden interesarte</li>
              <li>📊 Realizar encuestas de satisfacción</li>
            </ul>

            <h2 id="base-legal">5. Base legal del procesamiento ⚖️</h2>
            <p>Según el RGPD, procesamos tus datos bajo estas bases legales:</p>

            <h3>a) Ejecución de contrato</h3>
            <p>
              Necesitamos procesar tus datos para cumplir nuestros 
              <Link href="/terms" className="text-blue-600 hover:underline"> Términos y Condiciones</Link> 
              (proporcionar el servicio de crowdfunding).
            </p>

            <h3>b) Consentimiento</h3>
            <p>
              Para marketing, cookies no esenciales, y compartir datos con terceros opcionales. 
              Puedes retirar consentimiento en cualquier momento.
            </p>

            <h3>c) Interés legítimo</h3>
            <p>
              Para mejorar el servicio, prevenir fraude, y analizar uso de la plataforma 
              (siempre que no viole tus derechos).
            </p>

            <h3>d) Obligación legal</h3>
            <p>
              Para cumplir con leyes (anti-lavado de dinero, tributarias, responder a autoridades).
            </p>

            <h2 id="compartir">6. Con quién compartimos tus datos 🤝</h2>

            <h3>6.1. Proveedores de servicios (procesadores)</h3>
            <p>Compartimos datos con proveedores que nos ayudan a operar la plataforma:</p>

            <table className="w-full border-collapse my-6 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Proveedor</th>
                  <th className="border p-2 text-left">Propósito</th>
                  <th className="border p-2 text-left">Datos compartidos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2"><strong>Stripe</strong></td>
                  <td className="border p-2">Procesamiento de pagos</td>
                  <td className="border p-2">Nombre, email, monto, tarjeta (directo a Stripe)</td>
                </tr>
                <tr>
                  <td className="border p-2"><strong>MongoDB Atlas</strong></td>
                  <td className="border p-2">Base de datos</td>
                  <td className="border p-2">Toda la información de cuenta/proyectos</td>
                </tr>
                <tr>
                  <td className="border p-2"><strong>Google Analytics</strong></td>
                  <td className="border p-2">Análisis de uso</td>
                  <td className="border p-2">IP anonimizada, comportamiento, dispositivo</td>
                </tr>
                <tr>
                  <td className="border p-2"><strong>SendGrid</strong></td>
                  <td className="border p-2">Envío de emails</td>
                  <td className="border p-2">Email, nombre, contenido del mensaje</td>
                </tr>
                <tr>
                  <td className="border p-2"><strong>Cloudflare</strong></td>
                  <td className="border p-2">CDN y seguridad</td>
                  <td className="border p-2">IP, logs de acceso</td>
                </tr>
                <tr>
                  <td className="border p-2"><strong>AWS S3</strong></td>
                  <td className="border p-2">Almacenamiento de archivos</td>
                  <td className="border p-2">Imágenes/videos de proyectos</td>
                </tr>
              </tbody>
            </table>

            <p className="text-sm text-gray-600 italic">
              Todos estos proveedores tienen acuerdos de procesamiento de datos (DPA) y cumplen con RGPD.
            </p>

            <h3>6.2. Otros usuarios (información pública)</h3>
            <p>Algunos datos son públicos por naturaleza del servicio:</p>
            <ul>
              <li><strong>Perfil público:</strong> Nombre, foto, biografía, proyectos creados</li>
              <li><strong>Proyectos:</strong> Todo el contenido del proyecto es público</li>
              <li><strong>Comentarios:</strong> Tus comentarios públicos en proyectos</li>
              <li><strong>Credcamer stats:</strong> Si eres Credcamer, tu ranking y estadísticas son públicas</li>
            </ul>

            <p className="font-semibold text-red-600">
              ❌ NUNCA compartimos públicamente: Email, teléfono, dirección, información de pago, historial de apoyos
            </p>

            <h3>6.3. Autoridades y cumplimiento legal</h3>
            <p>Podemos compartir datos si:</p>
            <ul>
              <li>⚖️ Lo requiere una orden judicial</li>
              <li>🚨 Hay investigación criminal</li>
              <li>💰 Obligaciones tributarias</li>
              <li>🛡️ Proteger seguridad de usuarios</li>
            </ul>

            <h3>6.4. Transferencia de negocio</h3>
            <p>
              Si Impulso Crezco es adquirida, fusionada o vendida, tus datos pueden transferirse al 
              nuevo propietario (te notificaremos).
            </p>

            <h3>6.5. NUNCA vendemos datos</h3>
            <p className="bg-green-50 p-4 rounded-lg font-semibold text-green-800">
              ✅ NUNCA vendemos, alquilamos o intercambiamos tu información personal con terceros para 
              marketing directo. Tu confianza es nuestro activo más valioso.
            </p>

            <h2 id="seguridad">7. Cómo protegemos tus datos 🔐</h2>

            <h3>7.1. Medidas técnicas</h3>
            <ul>
              <li><strong>Encriptación:</strong> HTTPS/TLS en toda la comunicación web</li>
              <li><strong>Passwords:</strong> Hasheados con bcrypt (nunca guardamos en texto plano)</li>
              <li><strong>Base de datos:</strong> Encriptación en reposo (AES-256)</li>
              <li><strong>Backups:</strong> Encriptados y geográficamente distribuidos</li>
              <li><strong>Firewall:</strong> Protección contra ataques DDoS y bots</li>
              <li><strong>2FA:</strong> Autenticación de dos factores (opcional pero recomendada)</li>
            </ul>

            <h3>7.2. Medidas organizativas</h3>
            <ul>
              <li><strong>Acceso limitado:</strong> Solo empleados autorizados acceden a datos personales</li>
              <li><strong>Confidencialidad:</strong> Todo el personal firma acuerdos de confidencialidad</li>
              <li><strong>Auditorías:</strong> Revisiones de seguridad trimestrales</li>
              <li><strong>Formación:</strong> Capacitación anual en protección de datos para el equipo</li>
              <li><strong>Logs de acceso:</strong> Monitoreamos quién accede a qué datos</li>
            </ul>

            <h3>7.3. Notificación de brechas</h3>
            <p>
              Si ocurre una brecha de seguridad que afecte tus datos:
            </p>
            <ul>
              <li>📧 Te notificaremos en menos de 72 horas</li>
              <li>🇪🇺 Notificaremos a la Agencia Española de Protección de Datos (AEPD)</li>
              <li>📋 Publicaremos informe transparente de lo ocurrido</li>
              <li>🔧 Tomaremos medidas correctivas inmediatas</li>
            </ul>

            <h2 id="retencion">8. Cuánto tiempo guardamos tus datos ⏳</h2>

            <table className="w-full border-collapse my-6 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Tipo de dato</th>
                  <th className="border p-2 text-left">Periodo de retención</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2"><strong>Cuenta activa</strong></td>
                  <td className="border p-2">Mientras esté activa + 2 años de inactividad</td>
                </tr>
                <tr>
                  <td className="border p-2"><strong>Proyectos</strong></td>
                  <td className="border p-2">Permanente (son contenido público)</td>
                </tr>
                <tr>
                  <td className="border p-2"><strong>Transacciones</strong></td>
                  <td className="border p-2">6 años (obligación legal tributaria)</td>
                </tr>
                <tr>
                  <td className="border p-2"><strong>Documentos KYC</strong></td>
                  <td className="border p-2">5 años (obligación legal AML)</td>
                </tr>
                <tr>
                  <td className="border p-2"><strong>Logs técnicos</strong></td>
                  <td className="border p-2">90 días</td>
                </tr>
                <tr>
                  <td className="border p-2"><strong>Cookies analíticas</strong></td>
                  <td className="border p-2">24 meses</td>
                </tr>
                <tr>
                  <td className="border p-2"><strong>Mensajes de soporte</strong></td>
                  <td className="border p-2">3 años desde resolución</td>
                </tr>
              </tbody>
            </table>

            <p>Después de estos periodos, los datos se eliminan o anonimizan de forma irreversible.</p>

            <h2 id="cookies">9. Cookies y tecnologías similares 🍪</h2>

            <h3>9.1. Qué son las cookies</h3>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas 
              nuestro sitio. Nos ayudan a recordar tus preferencias y mejorar tu experiencia.
            </p>

            <h3>9.2. Tipos de cookies que usamos</h3>

            <h4>🔴 Estrictamente necesarias (no requieren consentimiento)</h4>
            <ul>
              <li><strong>Sesión:</strong> Mantiene tu login activo</li>
              <li><strong>Seguridad:</strong> CSRF tokens, prevención de ataques</li>
              <li><strong>Carrito:</strong> Recordar proyecto que estás apoyando</li>
            </ul>

            <h4>🟡 Funcionales (opcionales)</h4>
            <ul>
              <li><strong>Preferencias:</strong> Idioma, tema oscuro/claro</li>
              <li><strong>Reproductor de video:</strong> Volumen, calidad</li>
            </ul>

            <h4>🟢 Analíticas (opcionales, requieren consentimiento)</h4>
            <ul>
              <li><strong>Google Analytics:</strong> Páginas visitadas, tiempo, flujo de navegación</li>
              <li><strong>Hotjar:</strong> Mapas de calor, grabaciones de sesión (anónimas)</li>
            </ul>

            <h4>🔵 Marketing (opcionales, requieren consentimiento)</h4>
            <ul>
              <li><strong>Facebook Pixel:</strong> Para remarketing (mostrar anuncios relevantes)</li>
              <li><strong>Google Ads:</strong> Para medir efectividad de campañas</li>
            </ul>

            <h3>9.3. Cómo gestionar cookies</h3>
            <ul>
              <li>⚙️ <strong>Banner de cookies:</strong> Al visitar por primera vez, puedes aceptar/rechazar</li>
              <li>🔧 <strong>Configuración de navegador:</strong> Puedes bloquear todas las cookies (puede afectar funcionalidad)</li>
              <li>🔗 <strong>Herramientas:</strong> 
                <ul>
                  <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Opt-out de Google Analytics</a></li>
                  <li><a href="https://www.hotjar.com/policies/do-not-track/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Opt-out de Hotjar</a></li>
                </ul>
              </li>
            </ul>

            <h2 id="derechos">10. Tus derechos (RGPD) ✊</h2>
            <p>Según el RGPD, tienes los siguientes derechos sobre tus datos personales:</p>

            <h3>1️⃣ Derecho de acceso</h3>
            <p>
              Puedes solicitar una copia de todos los datos que tenemos sobre ti. Te los enviaremos en 
              formato JSON descargable en menos de 30 días.
            </p>

            <h3>2️⃣ Derecho de rectificación</h3>
            <p>
              Puedes corregir información inexacta o incompleta desde tu perfil. Para cambios mayores, 
              contáctanos.
            </p>

            <h3>3️⃣ Derecho de supresión ("derecho al olvido")</h3>
            <p>
              Puedes solicitar que eliminemos tus datos. Excepciones:
            </p>
            <ul>
              <li>❌ Proyectos públicos (son contenido de archivo público)</li>
              <li>❌ Transacciones (obligación legal de 6 años)</li>
              <li>❌ Disputas legales pendientes</li>
            </ul>

            <h3>4️⃣ Derecho de limitación del tratamiento</h3>
            <p>
              Puedes solicitar que "congelemos" tus datos (no los eliminamos pero dejamos de usarlos 
              activamente) mientras resolvemos una disputa.
            </p>

            <h3>5️⃣ Derecho de portabilidad</h3>
            <p>
              Puedes obtener tus datos en formato estructurado (JSON/CSV) para transferirlos a otra 
              plataforma.
            </p>

            <h3>6️⃣ Derecho de oposición</h3>
            <p>
              Puedes oponerte a:
            </p>
            <ul>
              <li>📧 Marketing directo (link de "Cancelar suscripción" en emails)</li>
              <li>📊 Procesamiento basado en interés legítimo</li>
              <li>🎯 Perfilado automatizado</li>
            </ul>

            <h3>7️⃣ Derecho a no ser sujeto de decisiones automatizadas</h3>
            <p>
              NO tomamos decisiones significativas (aprobar proyectos, suspender cuentas) basadas 
              únicamente en algoritmos. Siempre hay revisión humana.
            </p>

            <h3>Cómo ejercer tus derechos</h3>
            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <p className="font-semibold mb-2">📧 Envía un email a:</p>
              <p className="text-lg"><strong>privacidad@impulsocrezco.com</strong></p>
              <p className="text-sm mt-2">
                Incluye: nombre completo, email registrado, derecho que deseas ejercer, y copia de tu 
                documento de identidad (para verificar identidad).
              </p>
              <p className="text-sm font-semibold mt-2">
                Responderemos en menos de 30 días (gratis).
              </p>
            </div>

            <h2 id="menores">11. Privacidad de menores 👶</h2>
            <p>
              Impulso Crezco está destinado a mayores de <strong>18 años</strong>. Si tienes entre 
              14-17 años, puedes usar la plataforma solo con supervisión de un padre/tutor.
            </p>

            <p>
              <strong>NO recopilamos intencionalmente</strong> datos de menores de 14 años. Si descubrimos 
              que un menor de 14 creó una cuenta, la eliminaremos inmediatamente.
            </p>

            <p>
              Si eres padre/tutor y crees que tu hijo menor de 14 tiene una cuenta, contáctanos a 
              <strong> privacidad@impulsocrezco.com</strong>.
            </p>

            <h2 id="internacional">12. Transferencias internacionales 🌍</h2>

            <h3>Dónde almacenamos datos</h3>
            <ul>
              <li>🇪🇺 <strong>Servidores primarios:</strong> Alemania (MongoDB Atlas EU-Central-1)</li>
              <li>🇺🇸 <strong>Servicios de terceros:</strong> Algunos proveedores (Stripe, Google) tienen servidores en EE.UU.</li>
            </ul>

            <h3>Protección de transferencias</h3>
            <p>
              Para transferencias fuera de la UE, usamos mecanismos aprobados por RGPD:
            </p>
            <ul>
              <li>✅ <strong>Cláusulas Contractuales Estándar (SCC):</strong> Contratos aprobados por la Comisión Europea</li>
              <li>✅ <strong>Privacy Shield (sucesor):</strong> Para empresas estadounidenses certificadas</li>
              <li>✅ <strong>Anonimización:</strong> Cuando es posible, enviamos datos anonimizados</li>
            </ul>

            <h2 id="cambios">13. Cambios a esta política 🔄</h2>
            <p>
              Podemos actualizar esta política ocasionalmente. Si son cambios sustanciales:
            </p>
            <ul>
              <li>📧 Te notificaremos por email con 30 días de anticipación</li>
              <li>📢 Publicaremos aviso destacado en la plataforma</li>
              <li>🗓️ La fecha de "Última actualización" cambiará</li>
            </ul>

            <p>
              Puedes ver el historial completo de cambios en: 
              <a href="/privacy/changelog" className="text-blue-600 hover:underline"> /privacy/changelog</a>
            </p>

            <h2 id="contacto">14. Contacto y reclamaciones 📞</h2>

            <h3>Contacto general de privacidad</h3>
            <ul className="list-none">
              <li>📧 <strong>Email:</strong> privacidad@impulsocrezco.com</li>
              <li>👤 <strong>DPO:</strong> dpo@impulsocrezco.com</li>
              <li>📍 <strong>Dirección postal:</strong> Impulso Crezco S.L., Attn: Privacidad, Calle Innovación 123, 28001 Madrid, España</li>
            </ul>

            <h3>Reclamaciones ante autoridades</h3>
            <p>
              Si no estás satisfecho con cómo manejamos tu privacidad, tienes derecho a presentar una 
              reclamación ante la autoridad de protección de datos:
            </p>

            <div className="bg-gray-100 p-6 rounded-lg my-6">
              <p className="font-semibold mb-2">🇪🇸 Agencia Española de Protección de Datos (AEPD)</p>
              <ul className="list-none text-sm">
                <li>🌐 Web: <a href="https://www.aepd.es" target="_blank" rel="noopener" className="text-blue-600 hover:underline">www.aepd.es</a></li>
                <li>📧 Email: info@aepd.es</li>
                <li>📞 Teléfono: +34 901 100 099</li>
                <li>📍 Dirección: C/ Jorge Juan, 6, 28001 Madrid</li>
              </ul>
            </div>

            <hr className="my-8" />

            <h2>Resumen en lenguaje simple 💡</h2>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-blue-200">
              <h3 className="text-lg font-bold mb-4">En pocas palabras:</h3>
              <ul className="space-y-2">
                <li>✅ Recopilamos solo datos necesarios para que funcione la plataforma</li>
                <li>✅ Protegemos tus datos con encriptación y seguridad avanzada</li>
                <li>✅ NUNCA vendemos tu información a terceros</li>
                <li>✅ Puedes acceder, corregir o eliminar tus datos cuando quieras</li>
                <li>✅ Cumplimos 100% con RGPD y leyes de privacidad de la UE</li>
                <li>✅ Eres dueño de tu contenido, nosotros solo lo mostramos</li>
                <li>✅ Usamos cookies para mejorar tu experiencia (puedes rechazarlas)</li>
                <li>✅ Si tienes dudas, escríbenos a privacidad@impulsocrezco.com</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
              <p className="font-semibold text-green-800 mb-2">🤝 Nuestro compromiso</p>
              <p className="text-green-800">
                Tu confianza es la base de nuestra comunidad. Nos tomamos la privacidad MUY en serio y 
                trabajamos constantemente para proteger tus datos. Si tienes cualquier pregunta o 
                preocupación, estamos aquí para ayudarte.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Volver al Inicio
              </Link>
              <Link
                href="/terms"
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/faq"
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Preguntas Frecuentes
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
