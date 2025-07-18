

// Chart showing trend over past 7 days
function drawChart() {
  const ctx = document.getElementById("pollutionChart").getContext("2d");
  const labels = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString();
  });

  const pmData = labels.map(() => 10 + Math.random() * 50);
  const co2Data = labels.map(() => 350 + Math.random() * 100);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'PM2.5 (µg/m³)', data: pmData, borderColor: '#ff5722', fill: false, tension: 0.3 },
        { label: 'CO₂ (ppm)', data: co2Data, borderColor: '#4caf50', fill: false, tension: 0.3 }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: false }
      },
      plugins: {
        legend: {
          labels: {
            font: { size: 14 }
          }
        }
      }
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  drawChart();
  updatePollutionLevelsWithAPI();               // ✅ Run once
  setInterval(updatePollutionLevelsWithAPI, 300000);  // ✅ Repeat every 5 min
});





function updatePollutionLevelsWithAPI() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const apiKey = "3cab236649677c21cace71fee34f5556"; // 🔁 Replace with your real API key

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const pollution = data.list[0];
        document.getElementById("pm25").textContent = pollution.components.pm2_5.toFixed(2);
        document.getElementById("co2").textContent = pollution.components.co.toFixed(2);
        document.getElementById("nox").textContent = pollution.components.no2.toFixed(2);
      })
      .catch((err) => {
        console.error("Failed to fetch pollution data:", err);
      });
  });
}

// Refresh every 5 minutes (300000 ms)
setInterval(updatePollutionLevelsWithAPI, 300000);
updatePollutionLevelsWithAPI(); // Initial load
