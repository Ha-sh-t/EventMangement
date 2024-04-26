// Fake data for budgeted and actual expenses
var events = ['Event A', 'Event B', 'Event C', 'Event D', 'Event E'];
var budgeted_expenses = [
    [8000, 6000, 7000, 9000, 7500], // Fake data for Event A
    [7500, 5500, 6500, 8000, 7000], // Fake data for Event B
    [9000, 6500, 7500, 9500, 8000], // Fake data for Event C
    [8500, 6200, 7200, 9200, 7800], // Fake data for Event D
    [9500, 7000, 8000, 10000, 8500], // Fake data for Event E
];
var actual_expenses = [
    [7800, 5500, 7200, 9200, 7300], // Fake data for Event A
    [7300, 5000, 6800, 8800, 7000], // Fake data for Event B
    [8500, 6200, 7200, 9500, 7800], // Fake data for Event C
    [8000, 6000, 7000, 9000, 7500], // Fake data for Event D
    [9200, 6800, 7500, 9800, 8200], // Fake data for Event E
];

// Function to update chart based on selected time period
function updateChart(timePeriod) {
    var selectedData = [];
    switch (timePeriod) {
        case 'week':
            selectedData = budgeted_expenses.map(eventData => eventData);
            break;
        case 'month':
            selectedData = budgeted_expenses.map(eventData => eventData.reduce((a, b) => a + b) / eventData.length);
            break;
        case 'year':
            selectedData = budgeted_expenses.map(eventData => eventData.reduce((a, b) => a + b));
            break;
        default:
            selectedData = budgeted_expenses.map(eventData => eventData);
            break;
    }

    chart.updateSeries([{
        name: 'Budgeted Expenses',
        data: selectedData
    }]);
}

var barChartOptions = {
    series: [{
        name: 'Budgeted Expenses',
        data: budgeted_expenses.map(eventData => eventData[0]) // Default to week view
    }],
    chart: {
        height: 270,
        type: 'bar',
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            dataLabels: {
                position: 'top', // top, center, bottom
            },
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val;
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ["#304758"]
        }
    },
    xaxis: {
        categories: events,
        title: {
            style: {
                color: "#ffffff",
            },
        },
    },
    yaxis: {
        title: {
            text: "Expenses ($)",
            style: {
                color: "#f5f7ff"
            },
        },
    }
};

var chart1 = new ApexCharts(document.querySelector("#bar-chart1"), barChartOptions);
chart1.render();

// Dropdown menu event listener
document.getElementById('time-period-select').addEventListener('change', function () {
    var selectedTimePeriod = this.value;
    updateChart(selectedTimePeriod);
});


  // var chart = new ApexCharts(document.querySelector("#bar-chart1"), barChartOptions);
  // chart.render();



  var barChartOptions = {
    series: [{
    name: 'Response',
    data: [2.3, 3.1, 4.0, 8.1, 4.0]
  }],
    chart: {
    height: 270,
   
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val ;
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ["#304758"]
    }
  },

xaxis: {
    categories: ['Laptop', 'Phone', 'Monitor', 'Camera', 'Speaker'],
    title:{
    style:{
    color: "f5f7ff",
    },
    },
},

  yaxis: {
    title: {
        text:"count",
        style: {
            color: "#f5f7ff"
        },
    },
  }
  };

  var chart2 = new ApexCharts(document.querySelector("#bar-chart2"), barChartOptions);
  chart2.render();  
  



  var pieChartOptions = {
  
    series: [44, 55, 13, 43, 22],
    chart: {
    width: 300,
    height:180,
    type: 'pie',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 100
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chart3 = new ApexCharts(document.getElementById("#pie-chart1"), pieChartOptions);
  chart3.render();





  var pieChartOptions = {
    series: [44, 55, 13, 43, 22],
    chart: {
        width: 300,
        height:180,
    type: 'pie',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chart4 = new ApexCharts(document.querySelector("#pie-chart2"), pieChartOptions);
  chart4.render();

  var pieChartOptions = {
    series: [44, 55, 13, 43, 22],
    chart: {
        width: 300,
        height:180,
    type: 'pie',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chart5 = new ApexCharts(document.querySelector("#pie-chart3"), pieChartOptions);
  chart5.render();