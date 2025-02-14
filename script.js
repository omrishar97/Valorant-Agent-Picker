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
    }

    button.addEventListener("click", generateRandomImage);

    resetButton.addEventListener("click", function () {
        imageContainer.innerHTML = "";
        nameContainer.innerHTML = "";
    });

    themeToggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem('theme', document.body.classList.contains("dark-theme") ? "dark-theme" : "");
    });

    if (localStorage.getItem('theme') === "dark-theme") {
        document.body.classList.add("dark-theme");
    }
});
