// Lista de nombres de posturas 
const nombresPosturas = {
  1: "Tadasana (Montaña)",
  2: "Adho Mukha Svanasana (Perro hacia abajo)",
  3: "Bhujangasana (Cobra)",
  4: "Balasana (Niño)",
  5: "Virabhadrasana I (Guerrero I)",
  6: "Virabhadrasana II (Guerrero II)",
  7: "Trikonasana (Triángulo)",
  8: "Setu Bandhasana (Puente)",
  9: "Paschimottanasana (Pinza)",
  10: "Uttanasana (Flexión de pie)",
  11: "Navasana (Barco)",
  12: "Savasana (Relajación final)"
};

// Rutinas según tiempo y nivel (15 combinaciones)
const rutinas = {
  "10": {
    "Principiante": [1, 2, 3, 4],
    "Intermedio": [5, 6, 7, 8],
    "Avanzado": [9, 10, 11, 12]
  },
  "15": {
    "Principiante": [2, 3, 4, 5],
    "Intermedio": [6, 7, 8, 9],
    "Avanzado": [10, 11, 12, 1]
  },
  "20": {
    "Principiante": [3, 4, 5, 6, 7],
    "Intermedio": [8, 9, 10, 11, 12],
    "Avanzado": [1, 2, 3, 4, 5]
  },
  "30": {
    "Principiante": [4, 5, 6, 7, 8, 9],
    "Intermedio": [10, 11, 12, 1, 2, 3],
    "Avanzado": [6, 7, 8, 9, 10, 11]
  },
  "45": {
    "Principiante": [5, 6, 7, 8, 9, 10],
    "Intermedio": [11, 12, 1, 2, 3, 4],
    "Avanzado": [7, 8, 9, 10, 11, 12]
  }
};

// Obtener parámetros
function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    tiempo: params.get("tiempo")?.replace(" min", "") || "10",
    nivel: params.get("nivel") || "Principiante"
  };
}

// Generar rutina en pantalla
function generarRutina() {
  const { tiempo, nivel } = getParams();
  const rutinaSeleccionada = rutinas[tiempo][nivel];

  const sessionInfo = `Duración: ${tiempo} minutos | Nivel: ${nivel}`;
  document.querySelector(".session-info").textContent = sessionInfo;

  const rutinaContainer = document.getElementById("rutina-detalles");
  rutinaContainer.innerHTML = "";

  const duraciones = {
    "10": "04:30",
    "15": "04:30",
    "20": "04:00",
    "30": "05:00",
    "45": "07:30"
  };
  const duracion = duraciones[tiempo] || "04:30";

  rutinaSeleccionada.forEach((posturaId, index) => {
    const nombrePostura = nombresPosturas[posturaId] || `Postura ${posturaId}`;
    const ejercicioHTML = `
      <div class="ejercicio-fila">
        <img src="assets/postura${posturaId}.jpg" alt="${nombrePostura}">
        <div class="info-ejercicio">
          <p class="titulo-ejercicio">Ejercicio ${index + 1}</p>
          <p class="nombre-postura">${nombrePostura}</p>
          <p class="duracion-ejercicio">Duración: ${duracion} min</p>
        </div>
        <button class="play-btn">▶</button>
      </div>
    `;
    rutinaContainer.innerHTML += ejercicioHTML;
  });
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", generarRutina);

// Botón para marcar como completada
document.querySelector(".complete-button").addEventListener("click", () => {
  let completadas = parseInt(localStorage.getItem("practicasCompletadas")) || 0;
  localStorage.setItem("practicasCompletadas", ++completadas);
  window.location.href = "dashboard.html";
});
