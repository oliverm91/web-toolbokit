Vue.component('chart-component', {
    props: ['xData', 'yData'],
    template: '<canvas id="data-chart"></canvas>',
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            const ctx = document.getElementById('data-chart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.xData,
                    datasets: [{
                        label: 'Values',
                        data: this.yData,
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
    },
    watch: {
        xData() {
            this.renderChart();
        },
        yData() {
            this.renderChart();
        }
    }
});