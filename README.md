# 🎯 Recruiter Platform - Coto Challenge

Plataforma web moderna para gestión y contacto de candidatos. Construida con React, TypeScript y Vite.

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install
```

### Ejecución

```bash
# Desarrollo
npm dev

# Build para producción
npm build

# Preview de producción
npm preview
```

## 🔐 Credenciales de Acceso

**Usuario Reclutador:**

- Email: `recruiter@coto.com`
- Password: `123456`

> **Nota:** Estas credenciales son únicamente para desarrollo y testing.

## ✨ Características

- **🔒 Autenticación** - Sistema de login seguro para reclutadores
- **👥 Gestión de Candidatos** - Búsqueda, filtrado y visualización de perfiles
- **💬 Sistema de Contacto** - Envío de mensajes personalizados por rol
- **📊 Historial** - Seguimiento de candidatos contactados
- **🎨 UI Moderna** - Interfaz responsive con animaciones fluidas
- **⚡ Performance** - Optimizado con React Query y lazy loading

## 🛠️ Stack Tecnológico

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **TanStack Query** - Data Fetching & Caching
- **React Hook Form + Zod** - Form Management & Validation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation

## 📁 Estructura del Proyecto

```
src/
├── app/           # Configuración de rutas y providers
├── auth/          # Lógica de autenticación
├── components/    # Componentes reutilizables
├── hooks/         # Custom hooks
├── pages/         # Páginas de la aplicación
├── services/      # API calls y servicios
└── types/         # Definiciones de tipos
```

## 🧹 Scripts Disponibles

```bash
npm dev       # Servidor de desarrollo
npm build     # Build de producción
npm preview   # Preview del build
npm lint      # Ejecutar ESLint
```

## 📝 Notas

- La aplicación usa localStorage para persistencia de sesión y historial
- El modo desarrollo corre por defecto en `http://localhost:5173`
- Compatible con navegadores modernos (ES2020+)

---

Desarrollado para Coto Ze!
