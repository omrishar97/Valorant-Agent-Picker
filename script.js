// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("generateButton");
    const imageContainer = document.getElementById("imageContainer");
    const nameContainer = document.getElementById("nameContainer");
    const spinner = document.getElementById("loadingSpinner");
    const searchInput = document.getElementById("searchInput");
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
            data = fetchedData.images; // Save the images data to use later
            preloadImages(data); // Preload images
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to fetch and display a random image and name from the data
    function generateRandomImage() {
        spinner.style.display = "block";  // Show loading spinner
        imageContainer.innerHTML = "";   // Clear previous agent image
        nameContainer.innerText = "";    // Clear previous name

        // Disable the button
        button.disabled = true;

        // Get a random image object from the images array
        const randomImage = data[Math.floor(Math.random() * data.length)];

        // Create an image element for the random image
        const img = new Image();
        img.src = randomImage.src;  // Set the source from the random image
        img.alt = randomImage.name; // Use the name as the alt text

        // Add error handling
        img.onerror = function() {
            img.src = 'fallback_image_url.jpg';  // Set a fallback image
            img.alt = 'Image failed to load';
        };

        // Create a text element for the agent name
        const name = document.createElement("p");
        name.textContent = randomImage.name; // Set the name text

        // Clear previous image and name, then append the new ones
        imageContainer.innerHTML = ""; // Clear previous image
        nameContainer.innerHTML = "";   // Clear previous name
        imageContainer.appendChild(img);
        nameContainer.appendChild(name);

        // Hide loading spinner and re-enable button
        spinner.style.display = "none";
        button.disabled = false;

        // Save the selected agent's name to localStorage
        localStorage.setItem("lastAgent", randomImage.name);
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

    // Search functionality
    searchInput.addEventListener("input", function(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredAgents = data.filter(agent => agent.name.toLowerCase().includes(searchTerm));

        // Update display with filtered agents
        if (filteredAgents.length > 0) {
            const randomImage = filteredAgents[Math.floor(Math.random() * filteredAgents.length)];
            nameContainer.innerText = randomImage.name;
            imageContainer.innerHTML = `<img src="${randomImage.src}" alt="${randomImage.name}">`;
        } else {
            nameContainer.innerText = "No agent found";
            imageContainer.innerHTML = "";
        }
    });

    // Toggle dark/light theme
    toggleThemeButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-theme");
    });
});
