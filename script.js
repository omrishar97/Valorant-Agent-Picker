/* script.js */
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("generateButton");
    const imageContainer = document.getElementById("imageContainer");
    const nameContainer = document.getElementById("nameContainer");
    const spinner = document.getElementById("loadingSpinner");
    const resetButton = document.getElementById("resetButton");
    const themeToggleButton = document.getElementById("theme-toggle");
    let data = [];

    fetch('data.json')
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData.agents || [];
        })
        .catch(error => console.error('Error fetching data:', error));

    function generateRandomImage() {
        if (data.length === 0) return;
        
        spinner.style.display = "block";
        button.disabled = true;
        
        const randomAgent = data[Math.floor(Math.random() * data.length)];
        const img = new Image();
        img.src = randomAgent.src;
        img.alt = randomAgent.name;

        img.onerror = function() {
            img.src = 'fallback_image_url.jpg';
            img.alt = 'Image failed to load';
        };

        img.onload = function() {
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
