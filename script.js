const preguntas = [
  {
    pregunta: '¿Cuál fue el primer alienígena en el que se transformó Ben Tennyson?',
    opciones: ['Fuego', 'Cuatro Brazos', 'XLR8', 'Diamante'],
    correcta: 0
  },
  {
    pregunta: '¿Quién creó originalmente el Omnitrix?',
    opciones: ['Vilgax', 'Azmuth', 'Max Tennyson', 'Profesor Paradox'],
    correcta: 1
  },
  {
    pregunta: '¿A qué organización secreta pertenecía el abuelo Max?',
    opciones: ['Los Caballeros Eternos', 'Los Plomeros', 'La Guardia Galáctica', 'Los Galvan'],
    correcta: 1
  },
  {
    pregunta: '¿Qué alienígena de la serie original es capaz de correr a velocidades supersónicas?',
    opciones: ['Bestia', 'Materia Gris', 'Insectoide', 'XLR8'],
    correcta: 3
  },
  {
    pregunta: '¿Cuál es el nombre completo de Ben 10?',
    opciones: ['Benjamin Kirby Tennyson', 'Benjamin Maxwell Tennyson', 'Benjamin Carl Tennyson', 'Benjamin Kevin Tennyson'],
    correcta: 0
  },
  {
    pregunta: 'Nicki Nicole ¿sí o no?',
    opciones: ['Sí', 'No'],
    correcta: 0
  }
];

const quiz = document.getElementById('quiz');
const final = document.getElementById('final');
const progreso = document.getElementById('progreso');
const pregunta = document.getElementById('pregunta');
const opciones = document.getElementById('opciones');
const siguiente = document.getElementById('siguiente');
const puntaje = document.getElementById('puntaje');
const reiniciar = document.getElementById('reiniciar');

let indice = 0;
let puntos = 0;

function mostrarPregunta() {
  const actual = preguntas[indice];
  progreso.textContent = `Pregunta ${indice + 1} de ${preguntas.length}`;
  pregunta.textContent = actual.pregunta;
  opciones.innerHTML = '';
  siguiente.hidden = true;

  actual.opciones.forEach((texto, i) => {
    const boton = document.createElement('button');
    boton.textContent = texto;
    boton.addEventListener('click', () => responder(i));
    opciones.appendChild(boton);
  });
}

function responder(elegida) {
  const correcta = preguntas[indice].correcta;
  const botones = opciones.querySelectorAll('button');

  botones.forEach((boton, i) => {
    boton.disabled = true;
    if (i === correcta) boton.classList.add('correcta');
  });

  if (elegida === correcta) {
    puntos++;
  } else {
    botones[elegida].classList.add('incorrecta');
  }

  const textoBoton = indice === preguntas.length - 1 ? 'Ver resultado' : 'Siguiente';
  siguiente.innerHTML = `${textoBoton} <i class="fa-solid fa-arrow-right"></i>`;
  siguiente.hidden = false;
}

siguiente.addEventListener('click', () => {
  indice++;
  if (indice < preguntas.length) {
    mostrarPregunta();
  } else {
    quiz.hidden = true;
    final.hidden = false;
    puntaje.textContent = `Tu puntaje: ${puntos} de ${preguntas.length}`;
  }
});

reiniciar.addEventListener('click', () => {
  indice = 0;
  puntos = 0;
  final.hidden = true;
  quiz.hidden = false;
  mostrarPregunta();
});

mostrarPregunta();