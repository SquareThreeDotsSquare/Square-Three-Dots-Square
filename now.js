function init() {
  // Initialize the Google API client library with your API key and discovery document
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
          output += '<img src="' + link + '" alt="' + name + '" id="' + id + '" class="image">';
          // Create a div element with the time creation of the photo as the content
          output += '<div id="time-' + id + '" class="time">' + modifiedTime.slice(11,16) + '</div>';
          // Create a div element with the text based on the file name as the content
          output += '<div id="text-' + id + '" class="text">';
          if (name == "ISIA.jpg") {
            output += "ISIA U";
          } else if (name == "TAIPEI.jpg") {
            output += "adO/Aptive";
          }
          output += '</div>';
        }
        // Get the div element where the images and info will be displayed
        var div = document.getElementById('images');
        // Set the inner HTML of the div to the output
        div.innerHTML = output;
        // Set a variable to store the current index of the image array
        var index = 0;
        // Set a function to cycle through the images every 7 seconds
        function cycleImages() {
          // Hide all the images and info
          for (var i = 0; i < files.length; i++) {
            var img = document.getElementById(files[i].id);
            var time = document.getElementById('time-' + files[i].id);
            var text = document.getElementById('text-' + files[i].id);
            img.style.display = 'none';
            time.style.display = 'none';
            text.style.display = 'none';
          }

          // Show the image and info at the current index
          var img = document.getElementById(files[index].id);
          var time = document.getElementById('time-' + files[index].id);
          var text = document.getElementById('text-' + files[index].id);
          img.style.display = 'block';
          time.style.display = 'block';
          text.style.display = 'block';
          
          // Increment the index by one
          index++;
         
          // If the index reaches the end of the array, reset it to zero
          if (index == files.length) {
            index = 0;
          }
        }
        // Call the function once to show the first image and info
        cycleImages();
        // Set an interval to call the function every 7 seconds
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



//apiKey: 'AIzaSyAf7w7I2wXpftJm0ucqH8IkB48CJoVll1Q',
//var folderId = '1qFgnsftB_E_E_Julg4F5XmYo8Prx_IJ7';


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
