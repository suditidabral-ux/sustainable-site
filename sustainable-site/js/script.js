function initMap() {
  const mapCenter = { lat: 28.6667, lng: 77.2167 }; // East Delhi coords
  const map = new google.maps.Map(document.getElementById("map"), {
    center: mapCenter,
    zoom: 12,
  });

  // Example sensors (replace with real data)
  const sensors = [
    { position: { lat: 28.6788, lng: 77.2340 }, title: "Sensor 1" },
    { position: { lat: 28.6572, lng: 77.2370 }, title: "Sensor 2" },
  ];

  sensors.forEach(s => new google.maps.Marker({ position: s.position, map, title: s.title }));
}

// Dummy pollution values
function updateLiveValues() {
  const data = {
    pm25: (10 + Math.random() * 50).toFixed(1),
    co2: (350 + Math.random() * 100).toFixed(1),
    nox: (0.5 + Math.random() * 1.5).toFixed(2)
  };
  document.getElementById("pm25").textContent = data.pm25;
  document.getElementById("co2").textContent = data.co2;
  document.getElementById("nox").textContent = data.nox;
}

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

// On page load
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  updateLiveValues();
  drawChart();
  // Refresh live values every 15 seconds
  setInterval(updateLiveValues, 15000);
});
