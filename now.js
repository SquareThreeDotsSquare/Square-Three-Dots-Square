const pathImg = './images/nomeprogetto/';

/*  Mettere qui le immagini, ora e luogo 
    - Coppia e incolla { ---- }
    - Cambia con il nome di salvataggio la nuova immagine
    - Metti l'orario dell'immagine
    - Metti il luogo dell'immagine esattamente così: isia || taipei
*/
const images = [
  {
    img: "nomeprogetto_0.jpeg",
    time: "12:30",
    place: "isia"
  },
  {
    img: "nomeprogetto_1.jpeg",
    time: "12:34",
    place: "taipei"
  }
];





/* NNON TOCCARE */
const imageElement = document.getElementById("image");
const didaContainer = document.getElementById("dida-container");
const place = document.getElementById("dida-place");
const time = document.getElementById("dida-time");

let currentIndex = 0;

// Función para mostrar la imagen actual
function showCurrentImage() {

  didaContainer.classList.remove("right")
  didaContainer.classList.remove("left")
  // Actualiza la fuente de la imagen con la imagen actual
  imageElement.src = pathImg + images[currentIndex].img;
  time.innerHTML = images[currentIndex].time;

  if(images[currentIndex].place === 'isia') {
    didaContainer.classList.add("left")
    place.innerHTML = "ISIA U";
  } else {
    didaContainer.classList.add("right")
    place.innerHTML = "adO/Aptive";
  }

  // Incrementa el índice de la imagen actual
  currentIndex++;

  // Verifica si se ha alcanzado el final de las imágenes y reinicia el índice si es necesario
  if (currentIndex >= images.length) {
      currentIndex = 0;
  }
}

// Mostrar la primera imagen al cargar la página
showCurrentImage();

// Establecer la función para mostrar la imagen cada 7 segundos
setInterval(showCurrentImage, 7000);
