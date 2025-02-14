document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("generateButton");
    const imageContainer = document.getElementById("imageContainer");
    const nameContainer = document.getElementById("nameContainer");
    const spinner = document.getElementById("loadingSpinner");
    const resetButton = document.getElementById("resetButton");
    const themeToggleButton = document.getElementById("theme-toggle");
    const roleFilter = document.getElementById("role-filter"); // Get role filter dropdown
    let agents = [];

    // Fetch agent data
    fetch('data.json')
        .then(response => response.json())
        .then(fetchedData => {
            if (fetchedData.agents && fetchedData.agents.length > 0) {
                agents = fetchedData.agents;
            } else {
                alert("No agents found in the data file.");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to load agent data. Please try again later.');
        });

    function generateRandomImage() {
        if (agents.length === 0) {
            console.error("Data is empty!"); // Debugging
            return;
        }

        spinner.style.display = "block";
        button.disabled = true;

        const selectedRole = roleFilter.value; // Get selected role
        const filteredAgents = selectedRole === "all" ? agents : agents.filter(agent => agent.role === selectedRole);

        if (filteredAgents.length === 0) {
            imageContainer.innerHTML = "";
            nameContainer.innerHTML = "<p>No agents found for this role.</p>";
            spinner.style.display = "none";
            button.disabled = false;
            return;
        }

        const randomAgent = filteredAgents[Math.floor(Math.random() * filteredAgents.length)];

        const img = new Image();
        img.src = randomAgent.src;
        img.alt = randomAgent.name;
        img.loading = "lazy";
        img.width = 300;
        img.height = 300;

        img.onerror = function () {
            console.error("Image failed to load:", img.src);
            imageContainer.innerHTML = "<p>Failed to load agent image.</p>";
        };

        // Add shuffle class for animation
        imageContainer.classList.add("shuffle");

        img.onload = function () {
            console.log("Image loaded successfully:", img.src);

            // Add fade-in effect
            img.classList.add("loaded");

            // Clear image and name before appending
            imageContainer.innerHTML = "";
            nameContainer.innerHTML = "";

            // Append new image and name
            imageContainer.appendChild(img);
            nameContainer.innerHTML = `<p>${randomAgent.name}</p>`;

            // Remove shuffle class after animation ends
            imageContainer.classList.remove("shuffle");

            // Hide spinner and enable button
            spinner.style.display = "none";
            button.disabled = false;
        };

        // Placeholder while image is loading
        imageContainer.innerHTML = "<p>Loading...</p>";
    }

    // Event listeners for the buttons and theme toggle
    button.addEventListener("click", generateRandomImage);

    resetButton.addEventListener("click", function () {
        imageContainer.innerHTML = "";
        nameContainer.innerHTML = "";
    });

    themeToggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem('theme', document.body.classList.contains("dark-theme") ? "dark-theme" : "");
    });

    // Preload image function for optimization
    function preloadImage(src) {
        const img = new Image();
        img.src = src;
    }

    // This function is for the role-based filtering (assuming role-filter is a dropdown)
    function pickRandomAgent() {
        const selectedRole = document.getElementById("role-filter").value;
        const filteredAgents = agents.filter(agent => agent.role.toLowerCase() === selectedRole.toLowerCase() || selectedRole === "");

        if (filteredAgents.length === 0) {
            document.getElementById("agentImage").src = "";
            document.getElementById("agentName").textContent = "No agents found for this role.";
            document.getElementById("loadingSpinner").style.display = "none"; // Hide spinner here
            document.getElementById("randomize-btn").disabled = false;
            return;
        }

        const randomAgent = filteredAgents[Math.floor(Math.random() * filteredAgents.length)];
        document.getElementById("agentName").textContent = randomAgent.name;

        const agentImage = document.getElementById("agentImage");
        agentImage.style.opacity = 0; // Fade out the image
        agentImage.src = randomAgent.src;

        // Error handling: show a default image if the image fails to load
        agentImage.onerror = function() {
            agentImage.src = "default-image.jpg"; // replace with your fallback image
        };

        // Preload the image before displaying it
        preloadImage(randomAgent.src);

        // Fade in the image after it has loaded
        agentImage.onload = function() {
            agentImage.style.opacity = 1;
            document.getElementById("loadingSpinner").style.display = "none";
            document.getElementById("randomize-btn").disabled = false;
        };

        document.getElementById("loadingSpinner").style.display = "inline-block";
        document.getElementById("randomize-btn").disabled = true; // Disable button while loading
    }

    // Add event listeners for agent randomizing
    document.getElementById("randomize-btn").addEventListener("click", pickRandomAgent);

    // Reset agent function
    function resetAgent() {
        document.getElementById("agentImage").src = "";
        document.getElementById("agentName").textContent = "";
    }

    // Call this function at the end
    addEventListeners();

    // Additional helper functions for theme and agent selection
    function addEventListeners() {
        document.getElementById("randomize-btn").addEventListener("click", pickRandomAgent);
        document.getElementById("resetButton").addEventListener("click", resetAgent);
        document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
    }

    function toggleTheme() {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem('theme', document.body.classList.contains("dark-theme") ? "dark-theme" : "");
    }
});
