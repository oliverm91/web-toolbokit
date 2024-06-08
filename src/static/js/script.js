function fetchData(displayType) {
    const param = document.getElementById('param').value;
    fetch(`/api/data?param=${param}`)
        .then(response => response.json())
        .then(data => {
            if (displayType === 'table') {
                displayTable(data.values);
            } else if (displayType === 'chart') {
                displayChart(data.values);
            }
        });
}

function displayTable(data) {
    let table = '<table><tr>';
    data.forEach(value => {
        table += `<td>${value}</td>`;
    });
    table += '</tr></table>';
    document.getElementById('data-display').innerHTML = table;
}

function displayChart(data) {
    const ctx = document.getElementById('data-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map((_, i) => `Item ${i + 1}`),
            datasets: [{
                label: 'Values',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}