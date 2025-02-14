document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("generateButton");
    const imageContainer = document.getElementById("imageContainer");
    const nameContainer = document.getElementById("nameContainer");
    const spinner = document.getElementById("loadingSpinner");
    const resetButton = document.getElementById("resetButton");
    const themeToggleButton = document.getElementById("theme-toggle");
    let data = [];

    // Fetch agent data with proper error handling
    fetch('data.json')
        .then(response => response.json())
        .then(fetchedData => {
            if (fetchedData.agents && fetchedData.agents.length > 0) {
                data = fetchedData.agents;
            } else {
                alert("No agents found in the data file.");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to load agent data. Please try again later.');
        });

    function generateRandomImage() {
        if (data.length === 0) {
            console.error("Data is empty!"); // Debugging
            return;
        }

        spinner.style.display = "block";
        button.disabled = true;

        const randomAgent = data[Math.floor(Math.random() * data.length)];
        console.log("Selected agent:", randomAgent); // Debugging
        console.log("Image path:", randomAgent.src); // Debugging: Log the image path

        const img = new Image();
        img.src = randomAgent.src;
        img.alt = randomAgent.name;
        img.loading = "lazy";
        img.width = 300;
        img.height = 300;

     img.onerror = function() {
    console.error("Image failed to load:", img.src); // Debugging
};



        img.onload = function() {
            console.log("Image loaded successfully:", img.src); // Debugging: Confirm image loads
            imageContainer.innerHTML = "";
            nameContainer.innerHTML = "";
            imageContainer.appendChild(img);
            nameContainer.innerHTML = `<p>${randomAgent.name}</p>`;
            spinner.style.display = "none";
            button.disabled = false;
        };
    }

    button.addEventListener("click", generateRandomImage);

    resetButton.addEventListener("click", function() {
        imageContainer.innerHTML = "";
        nameContainer.innerHTML = "";
    });

    themeToggleButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem('theme', document.body.classList.contains("dark-theme") ? "dark-theme" : "");
    });

    if (localStorage.getItem('theme') === "dark-theme") {
        document.body.classList.add("dark-theme");
    }
});
