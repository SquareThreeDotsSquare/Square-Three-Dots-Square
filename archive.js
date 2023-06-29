function toggleImageSX(element) {
    var card = element.querySelector(".cardSX");
    card.style.display = card.style.display === "none" ? "block" : "none";
  }

function toggleImageDX(element) {
  var cardDX = element.querySelector(".cardDX");
  cardDX.style.display = cardDX.style.display === "none" ? "block" : "none";
}

function galleryToggle(element) {
  var galleryGrid = element.nextElementSibling;
  galleryGrid.classList.toggle("show");
}

// Hide all gallery grids initially
document.addEventListener("DOMContentLoaded", function() {
  var galleryGrids = document.querySelectorAll(".gallery-grid");
  for (var i = 0; i < galleryGrids.length; i++) {
    galleryGrids[i].classList.remove("show");
  }
});
/*** per tabella ***/

// Function to fetch images and descriptions from Google Drive
async function fetchImagesFromGoogleDrive() {
  const folderId = "1PzBNLdKGE8-Y59LFAhmWD_Ct5hLAiVRp"; // Replace with your actual folder ID
  const apiKey = "AIzaSyAf7w7I2wXpftJm0ucqH8IkB48CJoVll1Q"; // Replace with your actual API key

  const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const files = data.files;

    // Sort files by last modified time
    files.sort((a, b) => {
      return new Date(a.modifiedTime) - new Date(b.modifiedTime);
    });

    const archiveContainer = document.querySelector(".archive-container");

    // Loop through files and create grid items
    for (const file of files) {
      const fileNameParts = file.name.split("-");
      const eventTitle = fileNameParts[0].trim();
      const schoolName = fileNameParts[1].trim();
      const imageNumber = fileNameParts[2].trim();

      // Create grid item elements
      const timeElement = document.createElement("div");
      const cardElement = document.createElement("div");
      const imgElement = document.createElement("img");
      const descriptionElement = document.createElement("div");

      // Set attributes and classes
      timeElement.className = schoolName === "isia" ? "timeSX" : "timeDX";
      cardElement.className = schoolName === "isia" ? "cardSX" : "cardDX";
      imgElement.className = "img-hover";
      imgElement.src = `https://drive.google.com/uc?id=${file.id}`;
      descriptionElement.className = "description";

      // Retrieve description from Google Docs
      const description = await fetchDescriptionFromGoogleDocs(file.name);
      descriptionElement.textContent = description;

      // Append elements to the DOM
      cardElement.appendChild(imgElement);
      cardElement.appendChild(descriptionElement);
      timeElement.appendChild(cardElement);
      archiveContainer.appendChild(timeElement);
    }
  } catch (error) {
    console.error("Error fetching images from Google Drive:", error);
  }
}

// Function to fetch description from Google Docs
async function fetchDescriptionFromGoogleDocs(docName) {
  const apiKey = "AIzaSyAf7w7I2wXpftJm0ucqH8IkB48CJoVll1Q"; // Replace with your actual API key

  const apiUrl = `https://docs.googleapis.com/v1/documents?q=${docName}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const description = data.documents[0].body.content[1].paragraph.elements[0].textRun.content;
    
    return description;
  } catch (error) {
    console.error("Error fetching description from Google Docs:", error);
    return "";
  }
}

// Call the function to fetch images from Google Drive
//fetchImagesFromGoogleDrive();