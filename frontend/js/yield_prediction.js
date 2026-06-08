// yield_prediction.js

// Load weather for the given district
async function loadWeather() {
    try {
        const district = localStorage.getItem("district");
        if (!district) return;

        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${district}&count=1`
        );
        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) return;

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,precipitation`
        );
        const data = await response.json();

        // Some Open-Meteo responses use current_weather.temperature only
        const temperature = data.current_weather?.temperature ?? 0;
        const rainfall = data.hourly?.precipitation?.[0] ?? 0;
        const humidity = data.hourly?.relativehumidity_2m?.[0] ?? 0;

        document.getElementById("temperatureInfo").innerText = temperature + "°C";
        document.getElementById("rainfallInfo").innerText = rainfall + " mm";
        document.getElementById("humidityInfo").innerText = humidity + "%";

        // Save to localStorage for other pages
        localStorage.setItem("temperature", temperature);
        localStorage.setItem("rainfall", rainfall);
        localStorage.setItem("humidity", humidity);

    } catch (err) {
        console.error("Weather API Error:", err);
    }
}

// Run on page load
window.onload = async function () {
    const full_name = localStorage.getItem("full_name") ?? "User";
    const state = localStorage.getItem("state") ?? "";
    const district = localStorage.getItem("district") ?? "";
    const land_acres = localStorage.getItem("land_acres") ?? "";
    const land_type = localStorage.getItem("land_type") ?? "";
    const recommended_crop = localStorage.getItem("recommended_crop") ?? "";

    // Set user info
    document.querySelector(".user-name").innerText = "👤 " + full_name;

    
    document.getElementById("locationInfo").innerText = district + ", " + state;
    document.getElementById("landInfo").innerText = land_acres + " Acres";

    // Load weather and populate temperature, rainfall, 
    await loadWeather();

    // Set selected crop if any
    if (recommended_crop) {
        document.getElementById("crop").value = recommended_crop;
    }
};

// Predict yield button click
function predictYield() {
    const crop = document.getElementById("crop").value;
    if (!crop) {
        alert("Please select crop");
        return;
    }

    const landSize = Number(localStorage.getItem("land_acres") ?? 0);
    const predictedYield = Number(localStorage.getItem("predicted_yield") ?? 0);

    const totalProduction = (predictedYield * landSize).toFixed(2);

    document.getElementById("cropResult").innerText = crop;
    document.getElementById("acreYield").innerText = predictedYield + " Tons/Acre";
    document.getElementById("totalProduction").innerText = totalProduction + " Tons";

    // Random confidence for demo
    const confidence = Math.floor(90 + Math.random() * 8);
    document.getElementById("confidence").innerText = confidence + "%";

    document.getElementById("resultBox").style.display = "block";
}