
async function loadWeatherDashboard() {
    try {
        const district = localStorage.getItem("district");
        if (!district) return;

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

        document.getElementById("temperatureCard").innerText =
            data.current.temperature_2m + "°C";

        document.getElementById("humidityCard").innerText =
            data.current.relative_humidity_2m + "%";

        document.getElementById("rainfallCard").innerText =
            data.current.precipitation + " mm";

        // Save in localStorage for other pages
        localStorage.setItem(
            "temperature",
            data.current.temperature_2m
        );

        localStorage.setItem(
            "humidity",
            data.current.relative_humidity_2m
        );

        localStorage.setItem(
            "rainfall",
            data.current.precipitation
        );

    } catch (error) {
        console.error("Weather Error:", error);
    }
}

async function loadRecentPredictions() {
    try {
        const user_id = localStorage.getItem("user_id");
        if (!user_id) return;

        const response = await fetch(`http://127.0.0.1:5000/history/${user_id}`);
        const data = await response.json();

        const table = document.getElementById("recentPredictionsTable");
        table.innerHTML = ""; // Clear old rows

        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.created_at}</td>
                <td>${item.recommended_crop}</td>
                <td>${item.predicted_yield} Tons/Acre</td>
            `;
            table.appendChild(row);
        });

    } catch (error) {
        console.error("History Error:", error);
    }
}

// Run on page load
window.onload = async function () {
    // User info
    const full_name = localStorage.getItem("full_name");
    const state = localStorage.getItem("state");
    const district = localStorage.getItem("district");
    const land_acres = localStorage.getItem("land_acres");
    const land_type = localStorage.getItem("land_type");

    if (full_name) {
        document.querySelector(".user-name").innerText = "👤 " + full_name;
        document.querySelector(".welcome-card h2").innerText = `Welcome, ${full_name} 👋`;
    }

    if (state && district && land_acres && land_type) {
        document.getElementById("user-location").innerHTML = `
            📍 ${state} > ${district}<br>
            🌱 ${land_acres} Acres • ${land_type}
        `;
    }

    // Load weather and recent predictions
    await loadWeatherDashboard();
    await loadRecentPredictions();
};