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
document.getElementById("generateButton").addEventListener("click", function() {
    // Show loading spinner
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("imageContainer").innerHTML = ""; // Clear previous agent image
    document.getElementById("nameContainer").innerText = ""; // Clear previous name
    
    // Disable the button
    document.getElementById("generateButton").disabled = true;

    // Generate random agent
    setTimeout(function() {
        const randomIndex = Math.floor(Math.random() * agents.length);
        const selectedAgent = agents[randomIndex];

        // Display the agent's image and name
        document.getElementById("imageContainer").innerHTML = `<img src="${selectedAgent.image}" alt="${selectedAgent.name}">`;
        document.getElementById("nameContainer").innerText = selectedAgent.name;

        // Hide loading spinner and re-enable button
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("generateButton").disabled = false;
    }, 1000); // Simulate a 1 second loading time

document.getElementById("generateButton").addEventListener("click", function() {
    // Show loading spinner
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("imageContainer").innerHTML = ""; // Clear previous agent image
    document.getElementById("nameContainer").innerText = ""; // Clear previous name
    
    // Disable the button
    document.getElementById("generateButton").disabled = true;

    // Generate random agent
    setTimeout(function() {
        const randomIndex = Math.floor(Math.random() * agents.length);
        const selectedAgent = agents[randomIndex];

        // Display the agent's image and name
        const imgElement = `<img src="${selectedAgent.image}" alt="${selectedAgent.name}">`;
        document.getElementById("imageContainer").innerHTML = imgElement;
        document.getElementById("nameContainer").innerText = selectedAgent.name;

        // Add classes for transition effect
        document.querySelector("#imageContainer img").classList.add("show");
        document.querySelector("#nameContainer").classList.add("show");

        // Hide loading spinner and re-enable button
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("generateButton").disabled = false;
    }, 1000); // Simulate a 1 second loading time
});

