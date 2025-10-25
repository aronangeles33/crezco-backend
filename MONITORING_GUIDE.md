# 📊 MONITORING & MAINTENANCE GUIDE
# Guía completa de monitoreo y mantenimiento en producción

## 🎯 OVERVIEW
Esta guía detalla cómo monitorear y mantener Crezco en producción para garantizar:
- ✅ 99.9% de uptime
- ⚡ Performance óptimo
- 🔒 Seguridad continua
- 💰 Control de costos

---

## 📈 MÉTRICAS CLAVE A MONITOREAR

### 1. **Disponibilidad del Sistema**
```
- Uptime general: >99.9%
- Response time: <2 segundos
- Error rate: <0.1%
- Database response: <500ms
```

### 2. **Métricas de Usuario**
```
- Registros diarios: meta >10/día
- Proyectos creados: meta >5/día
- Donaciones completadas: meta >3/día
- Tasa de conversión: meta >15%
```

### 3. **Métricas de Performance**
```
- Carga de página: <3 segundos
- Time to Interactive: <5 segundos
- Core Web Vitals: todos en verde
- Memory usage: <80%
```

### 4. **Métricas de Seguridad**
```
- Failed login attempts: <10/hora
- Rate limit hits: <100/hora
- Suspicious requests: <5/día
- SSL certificate: >30 días restantes
```

---

## 🔧 HERRAMIENTAS DE MONITORING

### 1. **Uptime Monitoring**
```bash
# UptimeRobot (Gratis)
- https://uptimerobot.com
- Configura checks cada 5 minutos
- Alertas vía email/SMS

# Endpoints a monitorear:
- Frontend: https://crezco.app
- Backend API: https://api.crezco.app/health
- Admin Panel: https://crezco.app/admin
```

### 2. **Performance Monitoring**
```bash
# Google PageSpeed Insights
- https://pagespeed.web.dev
- Chequea semanalmente
- Core Web Vitals

# GTmetrix
- https://gtmetrix.com
- Análisis completo de performance
- Histórico de métricas
```

### 3. **Error Tracking**
```bash
# Sentry (Plan gratuito: 5K errores/mes)
npm install @sentry/nextjs @sentry/node

# Setup Frontend (crezco-app/pages/_app.tsx)
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
});

# Setup Backend (backend/src/server.js)
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
});
```

### 4. **Log Monitoring**
```bash
# LogTail (Plan gratuito: 1GB/mes)
- Logs centralizados
- Búsqueda y filtros
- Alertas personalizadas

# Setup en backend
npm install @logtail/node
const { Logtail } = require('@logtail/node');
const logtail = new Logtail(process.env.LOGTAIL_TOKEN);
```

---

## 📱 DASHBOARD DE MONITOREO

### 1. **Dashboard Principal**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Crezco - System Dashboard</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .metric { 
            display: inline-block; 
            margin: 10px; 
            padding: 20px; 
            border: 1px solid #ddd; 
            border-radius: 8px; 
            min-width: 200px;
        }
        .metric.good { border-color: #4CAF50; background: #f1f8e9; }
        .metric.warning { border-color: #FF9800; background: #fff3e0; }
        .metric.error { border-color: #f44336; background: #ffebee; }
        .metric h3 { margin: 0 0 10px 0; }
        .metric .value { font-size: 24px; font-weight: bold; }
        .metric .label { color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <h1>🚀 Crezco System Dashboard</h1>
    
    <div class="metric good" id="uptime">
        <h3>⚡ Uptime</h3>
        <div class="value" id="uptime-value">99.9%</div>
        <div class="label">Last 30 days</div>
    </div>
    
    <div class="metric good" id="response-time">
        <h3>⏱️ Response Time</h3>
        <div class="value" id="response-value">1.2s</div>
        <div class="label">Average</div>
    </div>
    
    <div class="metric good" id="users">
        <h3>👥 Active Users</h3>
        <div class="value" id="users-value">0</div>
        <div class="label">Last 24h</div>
    </div>
    
    <div class="metric warning" id="errors">
        <h3>❌ Errors</h3>
        <div class="value" id="errors-value">0</div>
        <div class="label">Last 24h</div>
    </div>
    
    <div class="metric good" id="donations">
        <h3>💰 Donations</h3>
        <div class="value" id="donations-value">$0</div>
        <div class="label">Last 24h</div>
    </div>
    
    <div class="metric good" id="projects">
        <h3>📋 New Projects</h3>
        <div class="value" id="projects-value">0</div>
        <div class="label">Last 24h</div>
    </div>

    <script>
        // Update metrics every 5 minutes
        async function updateMetrics() {
            try {
                // Check system health
                const healthResponse = await fetch('https://api.crezco.app/health');
                const healthData = await healthResponse.json();
                
                // Update uptime (simplified)
                document.getElementById('uptime-value').textContent = 
                    healthResponse.ok ? '99.9%' : '❌ Down';
                document.getElementById('uptime').className = 
                    healthResponse.ok ? 'metric good' : 'metric error';
                
                // Get response time
                const start = performance.now();
                await fetch('https://api.crezco.app/api/projects?limit=1');
                const responseTime = (performance.now() - start) / 1000;
                
                document.getElementById('response-value').textContent = 
                    responseTime.toFixed(1) + 's';
                document.getElementById('response-time').className = 
                    responseTime < 2 ? 'metric good' : 'metric warning';
                
                // Update other metrics (would need backend endpoints)
                // This is a simplified example
                
            } catch (error) {
                console.error('Error updating metrics:', error);
                document.getElementById('uptime-value').textContent = '❌ Error';
                document.getElementById('uptime').className = 'metric error';
            }
        }
        
        // Initial load
        updateMetrics();
        
        // Update every 5 minutes
        setInterval(updateMetrics, 5 * 60 * 1000);
        
        // Update timestamp
        setInterval(() => {
            document.title = `Crezco Dashboard - ${new Date().toLocaleTimeString()}`;
        }, 1000);
    </script>
</body>
</html>
```

---

## 🚨 SISTEMA DE ALERTAS

### 1. **Configuración de Alertas**
```javascript
// backend/src/middleware/alerting.js
const nodemailer = require('nodemailer');

class AlertSystem {
    constructor() {
        this.transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.ALERT_EMAIL,
                pass: process.env.ALERT_PASSWORD
            }
        });
        
        this.alertThresholds = {
            errorRate: 0.05, // 5%
            responseTime: 5000, // 5 seconds
            memoryUsage: 0.8, // 80%
            failedLogins: 10 // per hour
        };
    }
    
    async sendAlert(type, message, severity = 'warning') {
        const alertMessage = {
            from: process.env.ALERT_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: `🚨 Crezco Alert: ${type.toUpperCase()}`,
            html: `
                <h2>🚨 System Alert</h2>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Severity:</strong> ${severity}</p>
                <p><strong>Message:</strong> ${message}</p>
                <p><strong>Time:</strong> ${new Date().toISOString()}</p>
                <hr>
                <p>Check the dashboard: <a href="https://crezco.app/dashboard">System Dashboard</a></p>
            `
        };
        
        try {
            await this.transporter.sendMail(alertMessage);
            console.log(`Alert sent: ${type}`);
        } catch (error) {
            console.error('Failed to send alert:', error);
        }
    }
    
    checkErrorRate(errors, total) {
        const rate = errors / total;
        if (rate > this.alertThresholds.errorRate) {
            this.sendAlert('high_error_rate', 
                `Error rate is ${(rate * 100).toFixed(2)}% (${errors}/${total})`,
                'critical'
            );
        }
    }
    
    checkResponseTime(responseTime) {
        if (responseTime > this.alertThresholds.responseTime) {
            this.sendAlert('slow_response', 
                `Response time is ${responseTime}ms`,
                'warning'
            );
        }
    }
}

module.exports = new AlertSystem();
```

### 2. **Alertas Críticas**
```javascript
// Configurar alertas críticas
const criticalAlerts = {
    // Sistema down
    systemDown: {
        check: () => fetch('/health').catch(() => false),
        action: 'immediate_response',
        escalation: '5_minutes'
    },
    
    // Database down
    databaseDown: {
        check: () => mongoose.connection.readyState === 1,
        action: 'immediate_response',
        escalation: '2_minutes'
    },
    
    // Payment errors
    paymentErrors: {
        threshold: 3, // errors in 10 minutes
        action: 'urgent_review',
        escalation: '15_minutes'
    },
    
    // Security breach
    securityBreach: {
        indicators: [
            'multiple_failed_logins',
            'admin_access_attempt',
            'suspicious_patterns'
        ],
        action: 'immediate_lockdown',
        escalation: 'immediate'
    }
};
```

---

## 🔧 TAREAS DE MANTENIMIENTO

### 1. **Mantenimiento Diario** (5 min)
```bash
# Check list diario
□ Revisar dashboard de métricas
□ Verificar logs de errores
□ Confirmar backups automáticos
□ Revisar alertas del día anterior
□ Check de seguridad básico
```

### 2. **Mantenimiento Semanal** (30 min)
```bash
# Check list semanal
□ Análisis de performance completo
□ Revisión de métricas de usuario
□ Update de dependencias críticas
□ Revisión de logs de seguridad
□ Backup manual de verificación
□ Test de disaster recovery
```

### 3. **Mantenimiento Mensual** (2 horas)
```bash
# Check list mensual
□ Auditoría completa de seguridad
□ Optimización de base de datos
□ Revisión de costos de hosting
□ Update completo de dependencias
□ Test de carga y performance
□ Revisión de políticas de backup
□ Análisis de crecimiento y capacidad
```

---

## 💰 CONTROL DE COSTOS

### 1. **Monitoreo de Costos**
```javascript
// backend/src/utils/costMonitoring.js
class CostMonitor {
    constructor() {
        this.monthlyBudget = 100; // $100/mes
        this.alerts = {
            50: 'warning',   // 50% del presupuesto
            80: 'critical',  // 80% del presupuesto
            90: 'emergency'  // 90% del presupuesto
        };
    }
    
    async checkMonthlyCosts() {
        const costs = {
            vercel: await this.getVercelCosts(),
            railway: await this.getRailwayCosts(),
            mongodb: await this.getMongoDBCosts(),
            domain: 10, // Fixed monthly cost
        };
        
        const total = Object.values(costs).reduce((a, b) => a + b, 0);
        const percentage = (total / this.monthlyBudget) * 100;
        
        if (percentage > 90) {
            await this.sendCostAlert('emergency', total, percentage);
        } else if (percentage > 80) {
            await this.sendCostAlert('critical', total, percentage);
        } else if (percentage > 50) {
            await this.sendCostAlert('warning', total, percentage);
        }
        
        return { total, percentage, breakdown: costs };
    }
}
```

### 2. **Optimización de Costos**
```bash
# Estrategias de optimización
1. Caching agresivo para reducir requests de API
2. Optimización de imágenes (WebP, compression)
3. CDN para assets estáticos
4. Database query optimization
5. Monitoring de usage patterns
```

---

## 🔄 PLAN DE DISASTER RECOVERY

### 1. **Escenarios de Desastre**
```bash
# Escenario 1: Vercel down
- Backup hosting en Netlify configurado
- DNS switch automatizado
- RTO: 15 minutos

# Escenario 2: Railway down
- Backup en DigitalOcean configurado
- Database en MongoDB Atlas (independiente)
- RTO: 30 minutos

# Escenario 3: MongoDB Atlas down
- Backup automático cada 6 horas
- Restore process documentado
- RTO: 2 horas

# Escenario 4: Complete system failure
- Full backup restoration
- Infrastructure as Code (Terraform)
- RTO: 4 horas
```

### 2. **Recovery Procedures**
```bash
# Procedimiento de recuperación rápida
1. Assess the situation (5 min)
2. Activate backup systems (10 min)
3. Switch DNS if needed (5 min)
4. Notify stakeholders (immediate)
5. Monitor recovery (ongoing)
6. Post-incident review (24h later)
```

---

## 📊 REPORTING AUTOMÁTICO

### 1. **Reporte Diario**
```javascript
// backend/src/jobs/dailyReport.js
const generateDailyReport = async () => {
    const today = new Date();
    const yesterday = new Date(today - 24 * 60 * 60 * 1000);
    
    const metrics = {
        newUsers: await User.countDocuments({
            createdAt: { $gte: yesterday, $lt: today }
        }),
        newProjects: await Project.countDocuments({
            createdAt: { $gte: yesterday, $lt: today }
        }),
        totalDonations: await Donation.aggregate([
            { $match: { createdAt: { $gte: yesterday, $lt: today } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]),
        errors: await getErrorCount(yesterday, today),
        uptime: await getUptimePercentage(yesterday, today)
    };
    
    await sendDailyReport(metrics);
};
```

### 2. **Reporte Semanal**
```javascript
// Reporte semanal con tendencias
const generateWeeklyReport = async () => {
    const report = {
        growth: await calculateGrowthMetrics(),
        performance: await getPerformanceMetrics(),
        security: await getSecurityMetrics(),
        costs: await getCostAnalysis(),
        recommendations: await generateRecommendations()
    };
    
    await sendWeeklyReport(report);
};
```

---

## ⚡ OPTIMIZACIÓN CONTINUA

### 1. **Performance Optimization**
```bash
# Optimizaciones automáticas
- Image optimization (Next.js automatic)
- Code splitting y lazy loading
- API response caching
- Database query optimization
- CDN cache configuration
```

### 2. **Security Hardening**
```bash
# Mejoras de seguridad continuas
- Automated security updates
- Regular penetration testing
- OWASP compliance checks
- SSL certificate auto-renewal
- Access log analysis
```

---

## 📞 CONTACTOS DE EMERGENCIA

```
🚨 EMERGENCY CONTACTS

Primary Admin:
- Email: admin@crezco.app
- Phone: +1234567890

Technical Lead:
- Email: tech@crezco.app
- Phone: +1234567891

Hosting Support:
- Vercel: support@vercel.com
- Railway: team@railway.app
- MongoDB: support@mongodb.com

Domain Registrar:
- Support contact for domain issues
```

---

## ✅ CHECKLIST DE MONITORING

```bash
Daily Checks (5 min):
□ System uptime ✅
□ Error rates ✅
□ Basic functionality ✅
□ Payment processing ✅

Weekly Checks (30 min):
□ Performance analysis ✅
□ Security review ✅
□ Cost monitoring ✅
□ Backup verification ✅

Monthly Checks (2 hours):
□ Full security audit ✅
□ Capacity planning ✅
□ Update dependencies ✅
□ Disaster recovery test ✅
```

¡Con este sistema de monitoreo y mantenimiento tendrás un control completo sobre Crezco en producción! 🚀