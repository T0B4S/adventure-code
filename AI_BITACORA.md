# Bitácora de Desarrollo Asistido por IA

Proyecto: Adventure Code: El Desafío del Apunte  
Estudiante / Tech Lead: Tobias Capone Ascua  
Asignatura: Programación II  

---

## 1. Prompts Principales Utilizados

* **Arquitectura modular y consumo de datos externos:**  
  > *"Diseñar una estructura limpia de carpetas y componentes en React (con assets dentro de src, services, data y components) y crear un servicio asíncrono para consumir datos CSV publicados desde Google Sheets con un sistema de respaldo local (fallback)."*
* **Mecánica de ruleta rusa, vidas y estados del avatar:**  
  > *"Implementar la lógica de probabilidad de daño según dificultad en la ruleta, descontar vidas solo cuando ocurre el impacto real y sincronizar las poses del avatar (pensando, BANG por daño real, clic falso y heridas en GameOverView)."*
* **Integración progresiva de audio inmersivo (HTML5 Audio API):**  
  > *"Integrar efectos de sonido y música en loop mediante useRef y useEffect en cada etapa del juego (inicio, pantalla de carga, palanca, giro de ruleta, pensamiento, daño real/falso y cierre), respetando los nombres exactos de los archivos y calibrando los volúmenes."*

---

## 2. Bugs Documentados Generados por la IA y Solución Técnica

### Bug 1 (El más crítico): Desincronización del contador de vidas, cierre prematuro de partida y persistencia de estados entre `App.jsx` y `QuestionCard.jsx`
* **Descripción del Bug:**  
  Al responder incorrectamente una pregunta y activarse la probabilidad de daño (disparo real), el flujo de estados generado inicialmente por la IA presentaba fallos graves:
  1. Evaluaba la derrota (`lives === 0`) antes de completar el ciclo de renderizado del impacto y las animaciones del avatar (`BANG`), cortando la partida de golpe o desfasando el descuento de corazones en la barra superior.
  2. Al pasar a la siguiente ronda o reiniciar la partida, el componente `QuestionCard` conservaba estados residuales de la respuesta anterior (opciones bloqueadas o pose de daño activa) y no reiniciaba correctamente las vidas globales en `App.jsx`.
  3. El mapeo de columnas desde Google Sheets (`sheetService.js`) desplazaba las opciones múltiples cuando había celdas vacías o comas internas en las preguntas.

* **Explicación Técnica y Corrección (Código aplicado):**  
  Se centralizó la fuente de verdad de las vidas y el puntaje en `App.jsx` utilizando actualizaciones funcionales de estado (`prevLives => Math.max(0, prevLives - 1)`) y temporizadores controlados para permitir visualizar la reacción del avatar y escuchar el efecto sonoro antes de evaluar el cambio a `GameOverView` o volver a la ruleta. Asimismo, en `QuestionCard.jsx` se implementó un `useEffect` vinculado a la pregunta activa para resetear los estados locales:

```javascript
// Control de vidas y transición en App.jsx
const handleAnswerResult = (isCorrect, receivedDamage, pointsEarned) => {
  if (isCorrect) {
    setScore((prev) => prev + pointsEarned);
    setTimeout(() => setGameState("ROULETTE"), 1500);
    return;
  }

  if (receivedDamage) {
    // Descuento seguro evitando valores negativos y esperando la animación de BANG
    setLives((prevLives) => {
      const updatedLives = Math.max(0, prevLives - 1);
      setTimeout(() => {
        if (updatedLives === 0) {
          setGameState("GAME_OVER");
        } else {
          setGameState("ROULETTE");
        }
      }, 1800);
      return updatedLives;
    });
  } else {
    // Daño falso (clic): mantiene las vidas intactas y regresa a la ruleta
    setTimeout(() => setGameState("ROULETTE"), 1500);
  }
};

```

### Bug 2: Configuración de Tailwind CSS v4 en Vite

* **Descripción del Bug:**  
  Durante la configuración inicial del entorno con Tailwind CSS v4, se intentó utilizar la directiva clásica de PostCSS, lo que generaba conflictos de compilación en Vite.

* **Explicación Técnica y Corrección:**  
  Se reemplazó la configuración heredada por la integración nativa de Tailwind CSS v4 mediante `@import "tailwindcss";` en el CSS global.

### Bug 3: Ciclo de vida y volumen del audio

* **Descripción del Bug:**  
  Al integrar varias pistas, algunas se escuchaban demasiado fuerte y la música del menú no siempre se reanudaba correctamente al reiniciar la partida.

* **Explicación Técnica y Corrección:**  
  Los audios de cada pantalla se detienen y reinician al desmontarse. La música de inicio se conserva en `App.jsx` para poder reanudarla directamente desde la acción de reinicio. Los niveles actuales se ajustaron así:
  * Música de inicio: 0.1.
  * Música de carga y finales: 0.2.
  * Música de pensamiento: 0.15.
  * Efectos de palanca y daño: 0.25.
  * Sonido de giro de ruleta: 0.2.

  Estos valores corresponden a la propiedad `volume` de HTML Audio y no alteran el código de ejecución desde esta bitácora.

## 3. Reflexión Crítica sobre el Uso de IA

La inteligencia artificial resulta una herramienta muy útil para acelerar la estructura base y resolver problemas técnicos puntuales, pero utilizarla en exceso o delegar el desarrollo sin brindar el contexto y el nivel de detalle suficientes nunca permite llegar al resultado esperado. Si no se especifican con claridad las reglas del negocio, el ciclo de vida de los componentes y la arquitectura exacta, la IA introduce errores de lógica y desincronización de estados, haciendo indispensable el criterio técnico, el análisis propio y la depuración manual para lograr un producto funcional y de calidad.