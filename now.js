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
          output += '<div id="time-' + id + '" class="' + (name === "TAIPEI.jpg" ? "timeDX" : "time") + '">' + modifiedTime.slice(11, 16) + '</div>';
          // Create a div element with the text based on the file name as the content
          output += '<div id="text-' + id + '" class="' + (name === "TAIPEI.jpg" ? "textDX" : "text") + '">';
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

          for (var i = 0; i < files.length; i++) {
            var img = document.getElementById(files[i].id);
            var time = document.getElementById('time-' + files[i].id);
            var text = document.getElementById('text-' + files[i].id);
            img.style.display = 'none';
            time.style.display = 'none';
            text.style.display = 'none';
          }
        

          var img = document.getElementById(files[index].id);
          var time = document.getElementById('time-' + files[index].id);
          var text = document.getElementById('text-' + files[index].id);
          img.style.display = 'block';
          time.style.display = 'block';
          text.style.display = 'block';
        

          var modifiedTime = new Date(files[index].modifiedTime);
          modifiedTime.setHours(modifiedTime.getHours() + 0);
        

          var hours = modifiedTime.getHours().toString().padStart(2, '0');
          var minutes = modifiedTime.getMinutes().toString().padStart(2, '0');
          var formattedTime = hours + ':' + minutes;
        

          time.textContent = formattedTime;
        

          index++;
        

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
        console.log("No files", files);
      }
    });
  });
}
// Load the client library and call init()
gapi.load('client', init);


//apiKey: 'AIzaSyAf7w7I2wXpftJm0ucqH8IkB48CJoVll1Q',
//var folderId = '1qFgnsftB_E_E_Julg4F5XmYo8Prx_IJ7';