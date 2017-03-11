var ctx = document.getElementById("myChart");
var balance = [];
var balanceDif = [];

function DataPoint(desc, value, date) {
    this.desc = desc;
    this.value = value;
    this.date = date;
    if (value < 0) {
        var text = " Total: -£" + Math.abs(value)+","+desc;
        this.tooltip = (text).substr(0, text.length-1);
    }
    else {
        var text = " Total: £" + Math.abs(value)+","+desc;
        this.tooltip = (text).substr(0, text.length-1);
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
                    var t = difDataPoints[tooltipItem.index].tooltip.split(',');
                    return t;
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
            text: 'Income',
            display: true
        },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem) {
                    var t = difDataPoints[tooltipItem.index].tooltip.split(',');
                    return t;
                }
            }
        }
    }
});