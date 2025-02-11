// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("generateButton");
    const imageContainer = document.getElementById("imageContainer");
    const nameContainer = document.getElementById("nameContainer");
    const spinner = document.getElementById("loadingSpinner");
    const resetButton = document.getElementById("resetButton");
    const toggleThemeButton = document.getElementById("toggleTheme");

    // Preload images to improve performance
    const preloadImages = (images) => {
        images.forEach(image => {
            const img = new Image();
            img.src = image.src; // Preload the image
        });
    };

    // Fetch data from the JSON file once the page is loaded
    let data = []; // Placeholder for the fetched data
    fetch('data.json')
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData.agents; // Update to use the 'agents' key
            preloadImages(data); // Preload images
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to fetch and display a random image and name from the data
    function generateRandomImage() {
        spinner.style.display = "block";  // Show loading spinner
        imageContainer.innerHTML = "";   // Clear previous agent image
        nameContainer.innerText = "";    // Clear previous name

        // Disable the button to prevent multiple clicks
        button.disabled = true;

        // Get a random agent from the 'agents' array
        const randomAgent = data[Math.floor(Math.random() * data.length)];

        // Create an image element for the random agent
        const img = new Image();
        img.src = randomAgent.src;  // Set the source from the random agent
        img.alt = randomAgent.name; // Use the name as the alt text

        // Add error handling for broken images
        img.onerror = function() {
            img.src = 'fallback_image_url.jpg';  // Fallback image URL
            img.alt = 'Image failed to load';
        };

        // Create a text element for the agent name
        const name = document.createElement("p");
        name.textContent = randomAgent.name; // Set the name text

        // Clear previous image and name, then append the new ones
        imageContainer.innerHTML = ""; // Clear previous image
        nameContainer.innerHTML = "";   // Clear previous name
        imageContainer.appendChild(img);
        nameContainer.appendChild(name);

        // Add classes to trigger transitions
        img.classList.add("show");
        name.classList.add("show");

        // Hide loading spinner and re-enable button
        spinner.style.display = "none";
        button.disabled = false;

        // Save the selected agent's name to localStorage
        localStorage.setItem("lastAgent", randomAgent.name);
    }

    // Set up the button click listener to trigger the image generation
    button.addEventListener("click", generateRandomImage);

    // Reset button functionality
    resetButton.addEventListener("click", function() {
        imageContainer.innerHTML = "";
        nameContainer.innerHTML = "";
        // Optionally, reset the image or text to a default state
    });

    // Show last selected agent from localStorage if available
    const lastAgent = localStorage.getItem("lastAgent");
    if (lastAgent) {
        nameContainer.innerText = lastAgent;
    }

    // Toggle dark/light theme
    toggleThemeButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-theme");
    });
});
