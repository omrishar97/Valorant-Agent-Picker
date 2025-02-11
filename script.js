document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById("image-container");
    const randomizeButton = document.getElementById("randomize-btn");
    
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const agents = data.agents;

            randomizeButton.addEventListener("click", function () {
                if (agents.length === 0) {
                    console.error("No agents found in data.json!");
                    return;
                }

                const randomIndex = Math.floor(Math.random() * agents.length);
                const randomAgent = agents[randomIndex];

                let imgElement = imageContainer.querySelector("img");
                if (!imgElement) {
                    imgElement = document.createElement("img");
                    imageContainer.appendChild(imgElement);
                }

                let nameElement = imageContainer.querySelector("p");
                if (!nameElement) {
                    nameElement = document.createElement("p");
                    nameElement.style.fontSize = "20px";
                    nameElement.style.fontWeight = "bold";
                    nameElement.style.textAlign = "center";
                    imageContainer.appendChild(nameElement);
                }

                imgElement.src = randomAgent.image;
                imgElement.alt = randomAgent.name;
                nameElement.textContent = randomAgent.name;
            });
        })
        .catch(error => console.error("Error fetching data.json:", error));
});
