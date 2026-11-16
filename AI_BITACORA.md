# Bitácora de Desarrollo Asistido por IA

Proyecto: Adventure Code: El Desafío del Apunte  
Estudiante / Tech Lead: Tobias Capone Ascua  
Asignatura:Programación II  

---

## 1. Prompts Principales Utilizados

* **Arquitectura modular:**  
  > *"Diseñar una estructura limpia de carpetas y componentes en React (con assets dentro de src, services, data y components) para un juego web interactivo."*
* **Integración de datos externa:**  
  > *"Crear un servicio asíncrono en React para consumir datos CSV publicados desde una planilla de Google Sheets con un sistema de respaldo local (fallback)."*

---

## 2. Bug Documentado Generado por la IA y Solución Técnica

### Descripción del Bug:
Durante la configuración inicial del entorno con Tailwind CSS v4, se intentó utilizar la directiva clásica de PostCSS que generaba conflictos de compilación en Vite.

### Explicación Técnica y Corrección:
Las versiones recientes de Tailwind CSS operan de forma directa mediante la integración nativa y la directiva `@import "tailwindcss";` en el archivo CSS global, eliminando la necesidad de archivos de configuración obsoletos y optimizando el rendimiento de compilación.

---

## 3. Reflexión Crítica sobre el Uso de IA

El uso de la inteligencia artificial me permite estructurar con rapidez la arquitectura modular y la máquina de estados del proyecto, facilitando la separación de responsabilidades entre la lógica del juego, los servicios de datos y la interfaz visual. No obstante, se require y es obligatorio la validación humana constante para adaptar configuraciones modernas de herramientas como Vite y Tailwind.