document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("generateButton");
    const imageContainer = document.getElementById("imageContainer");
    const nameContainer = document.getElementById("nameContainer");
    const spinner = document.getElementById("loadingSpinner");
    const resetButton = document.getElementById("resetButton");
    const themeToggleButton = document.getElementById("theme-toggle");
    const roleFilter = document.getElementById("role-filter");
    const randomizeButton = document.getElementById("randomize-btn");
    let agents = [];

    // Fetch agent data from GitHub Pages
    fetch("https://omrishar97.github.io/Valorant-Agent-Picker/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(fetchedData => {
            if (fetchedData.agents && fetchedData.agents.length > 0) {
                agents = fetchedData.agents;
            } else {
                console.error("No agents found in data file.");
                alert("No agents found in the data file.");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Failed to load agent data. Check if data.json exists and is accessible.");
        });

    function generateRandomAgent() {
        if (agents.length === 0) {
            console.error("Agent data is empty!");
            return;
        }

        // Show loading spinner and disable buttons
        spinner.style.display = "block";
        button.disabled = true;
        randomizeButton.disabled = true;

        // Get selected role and filter agents
        const selectedRole = roleFilter.value;
        const filteredAgents = selectedRole === "all" ? agents : agents.filter(agent => agent.role === selectedRole);

        if (filteredAgents.length === 0) {
            imageContainer.innerHTML = "";
            nameContainer.innerHTML = "<p>No agents found for this role.</p>";
            spinner.style.display = "none";
            button.disabled = false;
            randomizeButton.disabled = false;
            return;
        }

        // Pick a random agent
        const randomAgent = filteredAgents[Math.floor(Math.random() * filteredAgents.length)];

        // Create and preload image
        const img = new Image();
        img.src = randomAgent.src;
        img.alt = randomAgent.name;
        img.loading = "lazy";
        img.width = 300;
        img.height = 300;

        img.onerror = function () {
            console.error("Image failed to load:", img.src);
            imageContainer.innerHTML = "<p>Failed to load agent image.</p>";
            spinner.style.display = "none";
            button.disabled = false;
            randomizeButton.disabled = false;
        };

        // Animation effect
        imageContainer.classList.add("shuffle");

        img.onload = function () {
            console.log("Image loaded successfully:", img.src);

            // Fade-in effect
            img.classList.add("loaded");

            // Clear previous content and append new image and name
            imageContainer.innerHTML = "";
            nameContainer.innerHTML = `<p>${randomAgent.name}</p>`;
            imageContainer.appendChild(img);

            // Remove shuffle class after animation
            setTimeout(() => {
                imageContainer.classList.remove("shuffle");
            }, 500);

            // Hide spinner and re-enable buttons
            spinner.style.display = "none";
            button.disabled = false;
            randomizeButton.disabled = false;
        };

        // Show placeholder while loading
        imageContainer.innerHTML = "<p>Loading...</p>";
    }

    function resetAgent() {
        imageContainer.innerHTML = "";
        nameContainer.innerHTML = "";
    }

    function toggleTheme() {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark-theme" : "");
    }

    // Event listeners (check if elements exist before adding listeners)
    if (button) button.addEventListener("click", generateRandomAgent);
    if (randomizeButton) randomizeButton.addEventListener("click", generateRandomAgent);
    if (resetButton) resetButton.addEventListener("click", resetAgent);
    if (themeToggleButton) themeToggleButton.addEventListener("click", toggleTheme);
});
