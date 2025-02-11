document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("generateButton");
    const imageContainer = document.getElementById("imageContainer");
    const nameContainer = document.getElementById("nameContainer");
    const spinner = document.getElementById("loadingSpinner");
    const resetButton = document.getElementById("resetButton");
    const toggleThemeButton = document.getElementById("toggleTheme");

    let data = []; // Placeholder for the fetched data

    // Fetch data from the JSON file once the page is loaded
    fetch('data.json')
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData.agents; // Update to use the 'agents' key
            console.log("Fetched data: ", data);  // Debug: Check if data is loaded properly
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            spinner.style.display = "none"; // Hide spinner if there's an error
        });

    // Function to fetch and display a random image and name from the data
    function generateRandomImage() {
        if (data.length === 0) {
            console.error("Data is empty, unable to generate random agent.");
            return;
        }

        spinner.style.display = "block";  // Show loading spinner
        imageContainer.innerHTML = "";   // Clear previous agent image
        nameContainer.innerText = "";    // Clear previous name

        button.disabled = true;  // Disable the button to prevent multiple clicks

        // Get a random agent from the 'agents' array
        const randomAgent = data[Math.floor(Math.random() * data.length)];
        console.log("Random Agent: ", randomAgent);  // Debug: Log the selected agent

        // Create an image element for the random agent
        const img = new Image();
        img.src = randomAgent.src;  // Set the source from the random agent
        img.alt = randomAgent.name; // Use the name as the alt text

        // Handle image loading error (e.g., if the file doesn't exist)
        img.onerror = function() {
            console.error("Image failed to load:", randomAgent.src);
            img.src = 'fallback_image_url.jpg';  // Fallback image URL
            img.alt = 'Image failed to load';
        };

        img.onload = function() {
            imageContainer.innerHTML = ""; // Clear any previous images
            nameContainer.innerHTML = "";  // Clear any previous names
            imageContainer.appendChild(img);  // Append the new image
            const name = document.createElement("p");
            name.textContent = randomAgent.name; // Set the name text
            nameContainer.appendChild(name);  // Append the name

            spinner.style.display = "none"; // Hide loading spinner
            button.disabled = false;  // Re-enable the button
        };
    }

    // Set up the button click listener to trigger the image generation
    button.addEventListener("click", generateRandomImage);

    // Reset button functionality
    resetButton.addEventListener("click", function() {
        imageContainer.innerHTML = "";
        nameContainer.innerHTML = "";
    });

    // Toggle dark/light theme
    toggleThemeButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-theme");
    });
});
