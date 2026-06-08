// frontend/js/crop_recommendation.js

// Load weather dynamically based on user's district
async function loadWeather() {
    try {
        const district = localStorage.getItem("district");

        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${district}&count=1`
        );

        const geoData = await geoResponse.json();

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation`
        );

        const data = await response.json();

        // Update input fields
        document.getElementById("temperature").value = data.current.temperature_2m;
        document.getElementById("humidity").value = data.current.relative_humidity_2m;
        document.getElementById("rainfall").value = data.current.precipitation;

        // Save values to localStorage for Yield page
        localStorage.setItem("temperature", data.current.temperature_2m);
        localStorage.setItem("humidity", data.current.relative_humidity_2m);
        localStorage.setItem("rainfall", data.current.precipitation);

    } catch (error) {
        console.error("Weather Error:", error);
    }
}

// Recommend crop and send data to backend
async function recommendCrop() {
    const user_id = localStorage.getItem("user_id");
    const state = localStorage.getItem("state");
    const district = localStorage.getItem("district");

    const soil_type = document.getElementById("soil").value;
    const season = document.getElementById("season").value;
    const crop_input = document.getElementById("crop_input").value;

    const location = district + ", " + state;
 
document.getElementById("location").value = location;

    // Read the values from input fields (already updated by loadWeather)
    const temperature = document.getElementById("temperature").value;
    const rainfall = document.getElementById("rainfall").value;
    const humidity = document.getElementById("humidity").value;

    const land_acres = document.getElementById("land_acres").value;
    const land_type = document.getElementById("land_type").value;

    if (!soil_type || !season || !crop_input || !land_acres || !land_type) {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id,
                soil_type,
                location,
                state,
                district,
                season,
                crop_input,
                temperature,
                rainfall,
                humidity,
                land_acres,
                land_type
            })
        });

        const result = await response.json();

        // Show result in crop recommendation page
        document.getElementById("results").innerHTML = `
            <div class="crop-item">
                <span class="crop-name">🌾 ${result.recommended_crop}</span>
                <span class="score">${result.predicted_yield} Tons/Acre</span>
            </div>
        `;

        document.getElementById("resultBox").style.display = "block";

        // Save data to localStorage for Yield page
        localStorage.setItem("recommended_crop", result.recommended_crop);
        localStorage.setItem("predicted_yield", result.predicted_yield);
        localStorage.setItem("temperature", temperature);
        localStorage.setItem("humidity", humidity);
        localStorage.setItem("rainfall", rainfall);
        localStorage.setItem("land_acres", land_acres);
        localStorage.setItem("location", location);

    } catch (error) {
        console.error(error);
        alert("Unable to connect to server");
    }
}

// Call weather API on page load
window.onload = async function () {
    const state = localStorage.getItem("state");
    const district = localStorage.getItem("district");
    const full_name = localStorage.getItem("full_name");

    document.getElementById("location").value = district + ", " + state;
    document.querySelector(".user-name").innerText = "👤 " + full_name;

    await loadWeather(); 
};