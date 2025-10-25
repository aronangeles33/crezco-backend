# 🔍 DEBUG AUTENTICACIÓN

## Paso 1: Verificar estado de Clerk en consola del navegador

Abre la consola (F12) y pega esto:

```javascript
// Ver si Clerk está cargado
console.log('Clerk loaded:', window.Clerk);

// Ver usuario actual
if (window.Clerk?.user) {
  console.log('✅ Usuario Clerk:', {
    id: window.Clerk.user.id,
    email: window.Clerk.user.primaryEmailAddress?.emailAddress,
    firstName: window.Clerk.user.firstName,
    fullName: window.Clerk.user.fullName
  });
} else {
  console.log('❌ No hay usuario en window.Clerk');
}

// Intentar obtener token manualmente
if (window.Clerk?.session) {
  window.Clerk.session.getToken().then(token => {
    if (token) {
      console.log('✅ Token obtenido:', token.substring(0, 50) + '...');
      console.log('Token length:', token.length);
    } else {
      console.log('❌ Token es null');
    }
  }).catch(err => {
    console.error('❌ Error obteniendo token:', err);
  });
} else {
  console.log('❌ No hay sesión en window.Clerk');
}
```

## Paso 2: Ver qué headers se están enviando

En la consola, ve a la pestaña **Network** → Busca la petición `POST /api/projects` → Click derecho → Copy → Copy as cURL

Pégalo aquí para ver si el header `Authorization` está presente.

## Paso 3: Verificar AuthSync

En `Providers.tsx`, el componente `AuthSync` debería estar ejecutándose. Busca en la consola:
- "✅ Token de Clerk obtenido y sincronizado"
- "⚠️ Usuario logueado pero sin token"
- "ℹ️ Usuario no logueado, limpiando token"

Si NO aparece NINGUNO, significa que AuthSync no se está ejecutando.

## Paso 4: Solución rápida - Obtener token manualmente

Si nada funciona, pega esto en la consola para obtener el token manualmente y guardarlo:

```javascript
// Obtener token y guardarlo manualmente
window.Clerk.session.getToken().then(token => {
  console.log('Token obtenido:', token.substring(0, 50) + '...');
  
  // Guardarlo en localStorage (temporal)
  localStorage.setItem('clerk_token', token);
  
  console.log('✅ Token guardado en localStorage');
  console.log('Ahora intenta crear el proyecto de nuevo');
});
```

Luego, agrega esto TEMPORALMENTE al inicio de tu `api.ts`:

```typescript
// TEMPORAL - leer token de localStorage
const storedToken = typeof window !== 'undefined' ? localStorage.getItem('clerk_token') : null;
if (storedToken) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
}
```

## Paso 5: Verificar que el backend reciba el token

En la terminal del backend, debería aparecer cuando hagas una petición:
- `✅ Nuevo usuario creado: aronangeles33@gmail.com`
- O si ya existe: Log de la petición exitosa

Si aparece:
- `❌ Error de autenticación: ...` → El token es inválido
- `No autorizado. Token no proporcionado.` → El token NO se está enviando

---

## 🎯 SOLUCIÓN INMEDIATA

**Para que funcione AHORA**, haz esto:

1. Abre consola del navegador (F12)
2. Pega este código:

```javascript
// Ver token
window.Clerk.session.getToken().then(token => {
  console.log('Tu token:');
  console.log(token);
  
  // Copiarlo al portapapeles
  navigator.clipboard.writeText(token);
  console.log('✅ Token copiado al portapapeles');
});
```

3. El token se copia automáticamente
4. Luego agrega este código en `api.ts` línea 15 (DESPUÉS de crear apiClient):

```typescript
// DEBUG - Token hardcoded temporal
if (typeof window !== 'undefined') {
  const token = 'PEGA_AQUI_TU_TOKEN';
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
```

5. Reemplaza `'PEGA_AQUI_TU_TOKEN'` con el token que copiaste

Esto hará que funcione temporalmente mientras arreglamos AuthSync.
