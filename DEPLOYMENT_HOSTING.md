# 🌐 HOSTING Y DOMINIO - Guía de Configuración

## 🎯 Opciones Recomendadas

### **OPCIÓN A: Vercel + Railway (Recomendado)**
**✅ Pros**: Fácil, gratis hasta cierto límite, CI/CD automático
**⚠️ Contras**: Límites en plan gratuito

#### Frontend (Vercel)
1. **Registrarse**: https://vercel.com
2. **Conectar GitHub**: Importar repositorio
3. **Configurar build**:
   ```bash
   Framework: Next.js
   Root Directory: crezco-app
   Build Command: npm run build
   Output Directory: .next
   ```

#### Backend (Railway)
1. **Registrarse**: https://railway.app
2. **Deploy from GitHub**
3. **Configurar**:
   ```bash
   Root Directory: backend
   Start Command: node src/server.js
   Port: 3001
   ```

### **OPCIÓN B: DigitalOcean Droplets**
**✅ Pros**: Control total, escalable
**⚠️ Contras**: Requiere más configuración

#### Droplet Recomendado
```bash
Servidor: Ubuntu 22.04 LTS
RAM: 2GB (mínimo)
CPU: 1 vCPU
Storage: 50GB SSD
Precio: ~$12/mes
```

### **OPCIÓN C: AWS/Google Cloud**
**✅ Pros**: Máxima escalabilidad
**⚠️ Contras**: Más complejo, puede ser costoso

---

## 🔗 Dominio

### **Registradores Recomendados**
1. **Namecheap** - $8-12/año
2. **Cloudflare** - $8-10/año + CDN gratis
3. **GoDaddy** - $12-15/año

### **Sugerencias de Dominio**
```
crezco.es (ideal)
crezco.app
crezcoplatform.com
mycrezco.com
crezco.io
```

---

## ⚙️ Configuración Inicial

### **1. Comprar Dominio**
```bash
# Ejemplo: crezco.app
1. Ir a Namecheap/Cloudflare
2. Buscar "crezco.app"
3. Comprar (1 año mínimo)
4. Configurar DNS más tarde
```

### **2. Configurar Hosting**

#### Si eliges Vercel + Railway:
```bash
# Frontend (Vercel)
1. https://vercel.com/new
2. Import Git Repository
3. Configurar: crezco-app/
4. Deploy

# Backend (Railway)
1. https://railway.app/new
2. Deploy from GitHub repo
3. Configurar: backend/
4. Configurar variables de entorno
```

### **3. SSL Automático**
✅ Vercel: SSL automático
✅ Railway: SSL automático
✅ Cloudflare: SSL gratis

---

## 💰 Costos Estimados

### **Plan Inicial (Startup)**
```
Dominio: $10/año
Vercel Pro: $20/mes (si excedes límites)
Railway: $5-20/mes (según uso)
MongoDB Atlas: $9/mes (M10)
Cloudflare: Gratis
TOTAL: ~$50-70/mes
```

### **Plan Escalado (Growth)**
```
DigitalOcean Droplet: $24/mes (4GB)
MongoDB Atlas: $25/mes (M20)
Cloudflare Pro: $20/mes
Backup storage: $5/mes
TOTAL: ~$75/mes
```

---

## 🚀 Proceso de Deploy

### **Método A: Automatizado (Vercel/Railway)**
```bash
1. git push origin main
2. Deploy automático
3. Configurar dominios custom
4. ✅ Listo
```

### **Método B: Manual (VPS)**
```bash
# 1. Conectar al servidor
ssh root@tu-servidor.com

# 2. Instalar dependencias
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx pm2

# 3. Clonar repositorio
git clone https://github.com/tu-usuario/crezco.git
cd crezco

# 4. Configurar backend
cd backend
npm install
pm2 start src/server.js --name "crezco-backend"

# 5. Configurar frontend
cd ../crezco-app
npm install
npm run build
pm2 start npm --name "crezco-frontend" -- start

# 6. Configurar Nginx
sudo nano /etc/nginx/sites-available/crezco
# (configuración de proxy)
```

---

## 📝 Checklist de Configuración

### **Dominio y DNS** ✅
- [ ] Dominio comprado
- [ ] DNS configurado
- [ ] Subdominio API configurado
- [ ] SSL habilitado

### **Frontend** ✅
- [ ] Deploy en Vercel/hosting
- [ ] Variables de entorno configuradas
- [ ] Dominio custom configurado
- [ ] Build optimizado

### **Backend** ✅
- [ ] Deploy en Railway/VPS
- [ ] Variables de entorno configuradas
- [ ] Puerto configurado correctamente
- [ ] PM2/supervisor configurado

### **Monitoreo** ✅
- [ ] Uptime monitoring
- [ ] Error tracking
- [ ] Performance monitoring

---

## 🔧 Troubleshooting Común

### **Error: Cannot connect to backend**
```bash
✅ Verificar variables NEXT_PUBLIC_API_URL
✅ Verificar CORS en backend
✅ Verificar que backend esté corriendo
```

### **Error: Database connection**
```bash
✅ Verificar MONGODB_URI
✅ Verificar whitelist IP en MongoDB Atlas
✅ Verificar credentials
```

### **Error: SSL certificate**
```bash
✅ Esperar 24-48h para propagación DNS
✅ Verificar configuración en hosting
✅ Force HTTPS en configuración
```

---

## 📞 Soporte y Recursos

### **Documentación**
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app
- MongoDB Atlas: https://docs.atlas.mongodb.com

### **Comunidades**
- Next.js Discord
- Railway Discord
- MongoDB Community

---

**Tiempo estimado**: 2-4 horas
**Dificultad**: Media
**Costo mensual**: $50-70