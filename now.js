function init() {
  gapi.client.init({
    apiKey: 'AIzaSyAf7w7I2wXpftJm0ucqH8IkB48CJoVll1Q',
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
  }).then(function () {
    // Get the folder ID of the Google Drive folder
    var folderId = '1qFgnsftB_E_E_Julg4F5XmYo8Prx_IJ7';
    // List the files in the folder
    gapi.client.drive.files.list({
      q: "'" + folderId + "' in parents",
      fields: 'files(id, name, modifiedTime, webContentLink)'
    }).then(function(response) {
      // Get the array of files
      var files = response.result.files;
      if (files && files.length > 0) {
        // Create a variable to store the HTML output
        var output = '';
        // Loop through the files and create an image element for each one
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          // Get the file name, id and web content link
          var name = file.name;
          var id = file.id;
          var modifiedTime = file.modifiedTime;
          var link = file.webContentLink;
          // Create an image element with the link as the source
          output += '<img src="' + link + '" alt="' + name + '" id="' + id + '">';
        }
        // Get the div element where the images will be displayed
        var div = document.getElementById('images');
        var timeStamp = document.getElementById('time')
        // Set the inner HTML of the div to the output
        div.innerHTML = output;
        // Set a variable to store the current index of the image array
        var index = 0;
        // Set a function to cycle through the images every 7 seconds
        function cycleImages() {
          // Hide all the images
          for (var i = 0; i < files.length; i++) {
            var img = document.getElementById(files[i].id);
            img.style.display = 'none';
          }
          // Show the image at the current index
          var img = document.getElementById(files[index].id);
          img.style.display = 'block';
          // Increment the index by one
          index++;
          // If the index reaches the end of the array, reset it to zero
          if (index == files.length) {
            index = 0;
          }
        }
        // Call the function once to show the first image
        cycleImages();
        // Set an interval to call the function every 3 seconds
        setInterval(cycleImages, 7000);
      } else {
        // No files found
        console.log("no files",files);
      }
    });
  });
};
// Load the client library and call init()
gapi.load('client', init);






//old
// const pathImg = './images/nomeprogetto/';

// /*  Mettere qui le immagini, ora e luogo 
//     - Coppia e incolla { ---- }
//     - Cambia con il nome di salvataggio la nuova immagine
//     - Metti l'orario dell'immagine
//     - Metti il luogo dell'immagine esattamente così: isia || taipei
// */
// const images = [
//   {
//     img: "nomeprogetto_0.jpeg",
//     time: "12:30",
//     place: "isia"
//   },
//   {
//     img: "nomeprogetto_1.jpeg",
//     time: "12:34",
//     place: "taipei"
//   }
// ];





// /* NNON TOCCARE */
// const imageElement = document.getElementById("image");
// const didaContainer = document.getElementById("dida-container");
// const place = document.getElementById("dida-place");
// const time = document.getElementById("dida-time");

// let currentIndex = 0;

// // Función para mostrar la imagen actual
// function showCurrentImage() {

//   didaContainer.classList.remove("right")
//   didaContainer.classList.remove("left")
//   // Actualiza la fuente de la imagen con la imagen actual
//   imageElement.src = pathImg + images[currentIndex].img;
//   time.innerHTML = images[currentIndex].time;

//   if(images[currentIndex].place === 'isia') {
//     didaContainer.classList.add("left")
//     place.innerHTML = "ISIA U";
//   } else {
//     didaContainer.classList.add("right")
//     place.innerHTML = "adO/Aptive";
//   }

//   // Incrementa el índice de la imagen actual
//   currentIndex++;

//   // Verifica si se ha alcanzado el final de las imágenes y reinicia el índice si es necesario
//   if (currentIndex >= images.length) {
//       currentIndex = 0;
//   }
// }

// // Mostrar la primera imagen al cargar la página
// showCurrentImage();

// // Establecer la función para mostrar la imagen cada 7 segundos
// setInterval(showCurrentImage, 7000);
