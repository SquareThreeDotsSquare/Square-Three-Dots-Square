function init() {
  gapi.client.init({
    apiKey: 'AIzaSyAYlydeqET5qt17nPjbytGUC0fon0u6LLw',
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
  }).then(function () {
    // Get the folder ID of the Google Drive folder
    var folderId = '1-V9MFo9wQuX9e1HAyzKtw-8eUDz22y3P';
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