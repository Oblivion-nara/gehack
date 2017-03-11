var ctx = document.getElementById("myChart");
var balance = [0,0];

function DataPoint(name, value, date) {
    this.name = name;
    this.value = value;
    this.date = date;
    if (value < 0) {
        this.tooltip = name+": -£" + Math.abs(value);
    }
    else {
        this.tooltip = name+": £" + Math.abs(value);
    }
}

DataPoint.prototype.toString = function () {
    return this.date;
};

var difDataPoints = [];

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: difDataPoints,
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
                data: balance,
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
            display: false,
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem) {
                    return difDataPoints[tooltipItem.index].tooltip;
                }
            }
        }
    }
});

var ctx1 = document.getElementById("myChart1");
var balanceDif;

var myChart1 = new Chart(ctx1, {
    type: 'line',
    labels: difDataPoints,
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
                data: balanceDif,
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
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem) {
                    return difDataPoints[tooltipItem.index].tooltip;
                }
            }
        }
    }
});