var ctx = document.getElementById("myChart");
var testData = [101, 59, 80, -90, 56, -30, 40];

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                cubicInterpolationMode: 'monotone',
                fill: true,
                backgroundColor: "rgba(128,203,196,0.4)",
                borderColor: "rgba(0,150,136,1)",
                borderCapStyle: 'round',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(0,150,136,1)",
                pointBackgroundColor: "rgba(128,203,196,1)",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(0,121,107,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: testData,
                spanGaps: false,
            }
        ]
    },
    options: {
        title: {
            text: 'Balance',
            display: true
        },
        legend: {
            display: false
        }
    }
});

var ctx1 = document.getElementById("myChart1");
var testData1 = [10, 39, 8, -90, -29, -30, 40];

var myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                cubicInterpolationMode: 'monotone',
                fill: true,
                backgroundColor: "rgba(255,213,79,0.4)",
                borderColor: "rgba(255,193,7,1)",
                borderCapStyle: 'round',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255,193,7,1)",
                pointBackgroundColor: "rgba(255,213,79,1)",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(255,193,7 ,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: testData1,
                spanGaps: false
            }
        ]
    },
    options: {
        title: {
            text: 'Expenditure',
            display: true
        },
        legend: {
            display: false
        }
    }
});