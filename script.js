// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("generateButton");
    const imageContainer = document.getElementById("imageContainer");
    const nameContainer = document.getElementById("nameContainer");

    // Function to fetch and display a random image and name from the data
    function generateRandomImage() {
        fetch('data.json')
            .then(response => response.json())  // Parse the JSON from the file
            .then(data => {
                // Get a random image object from the images array
                const randomImage = data.images[Math.floor(Math.random() * data.images.length)];

                // Create an image element for the random image
                const img = document.createElement("img");
                img.src = randomImage.src;  // Set the source from the random image
                img.alt = randomImage.name; // Use the name as the alt text
                img.style.width = "780px"; // Set the width of the image (optional)
                img.style.height = "auto"; // Keep the aspect ratio

                // Create a text element for the agent name
                const name = document.createElement("p");
                name.textContent = randomImage.name; // Set the name text

                // Clear previous image and name, then append the new ones
                imageContainer.innerHTML = ""; // Clear previous image
                nameContainer.innerHTML = "";   // Clear previous name
                imageContainer.appendChild(img);
                nameContainer.appendChild(name);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Set up the button click listener to trigger the image generation
    button.addEventListener("click", generateRandomImage);
});
