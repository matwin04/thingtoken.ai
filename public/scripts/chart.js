async function fetchPriceData() {
    try {
        const response = await fetch('https://public-api.birdeye.so/public/price?address=Cuizqj9fDdanLNiRhtRE6aeTiHsBLPhm4eL8WYyZVLBG');
        const data = await response.json();
        const price = data.data.value;

        const ctx = document.getElementById('priceChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: [new Date().toLocaleTimeString()],
                datasets: [{
                    label: 'Token Price (SOL)',
                    data: [price],
                    borderColor: 'rgba(0, 194, 255, 1)',
                    backgroundColor: 'rgba(0, 194, 255, 0.2)',
                    tension: 0.25,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching price data:', error);
    }
}

fetchPriceData();