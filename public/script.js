const topic = 'sander/camera'
const broker = 'ws://broker.hivemq.com:8000/mqtt'
let msg = {
  "device": "camera",
  "time": "20:12:19",
  "dht22_1": {
    "temperature": 27.2,
    "humidity": 47.4,
    "heat_index": 27.441
  },
  "dht22_2": {
    "temperature": 27.2,
    "humidity": 47.4,
    "heat_index": 27.441
  },
  "bme680": {
    "temperature": 26.15,
    "humidity": 51.077,
    "pressure": 1008.19,
    "gas_resistance": 70.364,
    "circa_altitude": 42.38071
  }
}

Vue.use(VueMqtt.default, broker)

new Vue({
  el: '#telemetry',
  data: {
    log: {},

  },
  mounted() {
    this.$mqtt.subscribe(topic)
  },
  mqtt: {
    [topic]: function (message) {

      msg = JSON.parse(message);
      //console.log(msg)

      if (msg.dht22_1.status || msg.dht22_2.status == "err sensor") {
        //todo --> display an error inside the sensor indicator
      }

      this.$data.log = msg
    }
  }
});

window.Apex = {
  chart: {
    foreColor: "#fff",
    toolbar: {
      show: false
    }
  },
  colors: ["#FCCF31", "#17ead9", "#f02fc2"],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: "#40475D"
  },
  xaxis: {
    axisTicks: {
      color: "#333"
    },
    axisBorder: {
      color: "#333"
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      gradientToColors: ["#F55555", "#6078ea", "#6094ea"]
    }
  },
  tooltip: {
    theme: "dark",
    x: {
      formatter: function (val) {
        return moment(new Date(val)).format("HH:mm:ss");
      }
    }
  },
  yaxis: {
    opposite: true,
    labels: {
      offsetX: -10
    }
  }
};


var options = {
  chart: {
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: '97%',
        margin: 5, // margin is in pixels
        shadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: '#999',
          opacity: 1,
          blur: 2
        }
      },
      dataLabels: {
        name: {
          show: true
        },
        value: {
          offsetY: 10,
          fontSize: '22px'
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91]
    },
  },
  series: [msg.dht22_1.humidity],
  labels: ['Humidity sensor 1'],

}

var radial1 = new ApexCharts(
  document.querySelector("#humi1"),
  options
);

radial1.render();


var options = {
  chart: {
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: '97%',
        margin: 5, // margin is in pixels
        shadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: '#999',
          opacity: 1,
          blur: 2
        }
      },
      dataLabels: {
        name: {
          show: true
        },
        value: {
          offsetY: 10,
          fontSize: '22px'
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91]
    },
  },
  series: [msg.dht22_1.humidity],
  labels: ['Humidity sensor 2'],

}

var radial1 = new ApexCharts(
  document.querySelector("#humi2"),
  options
);

radial1.render();

var options = {
  chart: {
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: '97%',
        margin: 5, // margin is in pixels
        shadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: '#999',
          opacity: 1,
          blur: 2
        }
      },
      dataLabels: {
        name: {
          show: true
        },
        value: {
          offsetY: 10,
          fontSize: '22px'
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91]
    },
  },
  series: [msg.bme680.humidity],
  labels: ['Humidity sensor 3'],

}

var radial1 = new ApexCharts(
  document.querySelector("#humi3"),
  options
);

radial1.render();


var options = {
  chart: {
    height: 350,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: '22px',
        },
        value: {
          fontSize: '16px',
          formatter: function (val) {
            return val
          },
        },
        total: {
          show: true,
          label: 'Temperature 1',
          formatter: function (val) {
            return msg.dht22_1.temperature
          },
        }
      }
    }
  },
  series: [msg.dht22_1.temperature, msg.dht22_1.heat_index],
  labels: ['temp 1', 'perc temp 1'],

}

var temp1 = new ApexCharts(
  document.querySelector("#temp1"),
  options
);

temp1.render();

var options = {
  chart: {
    height: 350,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: '22px',
        },
        value: {
          fontSize: '16px',
          formatter: function (val) {
            return val
          },
        },
        total: {
          show: true,
          label: 'Temperature 2',
          formatter: function (val) {
            return msg.dht22_2.temperature
          },
        }
      }
    }
  },
  series: [msg.dht22_2.temperature, msg.dht22_2.heat_index],
  labels: ['temp 2', 'perc temp 2'],

}

var temp1 = new ApexCharts(
  document.querySelector("#temp2"),
  options
);

temp1.render();


var options = {
  chart: {
    height: 350,
    type: 'radialBar',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
       hollow: {
        margin: 0,
        size: '70%',
        background: '#fff',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24
        }
      },
      track: {
        background: '#fff',
        strokeWidth: '67%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35
        }
      },

      dataLabels: {
        showOn: 'always',
        name: {
          offsetY: -10,
          show: true,
          color: '#888',
          fontSize: '17px'
        },
        value: {
          formatter: function(val) {
            return parseInt(val);
          },
          color: '#111',
          fontSize: '36px',
          show: true,
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#ABE5A1'],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  series: [msg.bme680.temperature],
  stroke: {
    lineCap: 'round'
  },
  labels: ['Temperature 3'],

}

var temp3 = new ApexCharts(
  document.querySelector("#temp3"),
  options
);

temp3.render();



var options = {
  chart: {
    height: 300,
    type: 'line',
    stacked: false,
  },
  stroke: {
    width: [0, 2, 5],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  colors: ['#3A5794', '#A5C351', '#E14A84'],
  series: [{
    name: 'gas resistance',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  }, {
    name: 'pressure',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  },
  ],
  fill: {
    opacity: [0.85, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },
  labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    min: 0
  },
  tooltip: {
    shared: true,
    intersect: false,

  },
  legend: {
    labels: {
      useSeriesColors: true
    },
    markers: {
      customHTML: [
        function () {
          return ''
        }, function () {
          return ''
        }, function () {
          return ''
        }
      ]
    }
  }
}

var chart = new ApexCharts(
  document.querySelector("#test2"),
  options
);

chart.render();


var optionsArea = {
  chart: {
    id: 'yt',
    group: 'social',
    type: 'area',
	height: 300
  },
  colors: ['#00E396'],
  series: [
    {
      name: [msg.time],
      data: [msg.bme680.circa_altitude]
    }
  ],

  yaxis: {
    labels: {
      minWidth: 40
    }
  }
}

var chartArea = new ApexCharts(
  document.querySelector("#test1"),
  optionsArea
);

chartArea.render();
