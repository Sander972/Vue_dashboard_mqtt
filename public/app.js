document.addEventListener("DOMContentLoaded", function () {    //wait all index is loaded

  const topic = 'sander/camera'
  const broker = 'ws://broker.hivemq.com:8000/mqtt'
  let msg = {
    "device": "camera",
    "time": "20:12:19",
    "dht22_1": {
      "temperature": 27.2,
      "humidity": 47.4,
      "heat index": 27.441
    },
    "dht22_2": {
      "status": "err sensor"
    },
    "bme680": {
      "temperature": 26.15,
      "humidity": 51.077,
      "pressure": 1008.19,
      "gas resistance": 70.364,
      "circa altitude": 42.38071
    }
  };

  Vue.use(VueMqtt.default, broker)

  new Vue({
    el: '#telemetry',
    data: {
      device: {},
      time: {},
      h1: {},
      t1: {},
      hi1: {},
      h2: {},
      t2: {},
      hi2: {},
      h3: {},
      t3: {},
      p1: {},
      gs1: {},
      alt1: {},
      log: {},

    },
    mounted() {
      this.$mqtt.subscribe(topic)
    },
    mqtt: {
      [topic]: function (message) {

        msg = JSON.parse(message);
        //console.log(msg)


        this.$data.device = msg.device
        this.$data.time = msg.time

        if (msg.dht22_1.status || msg.dht22_2.status == "err sensor") {
          //todo --> display an error inside the sensor indicator
        }

        this.$data.h1 = msg.dht22_1.humidity
        this.$data.t1 = msg.dht22_1.temperature
        this.$data.hi1 = msg.dht22_1.heat_index
        this.$data.h2 = msg.dht22_1.humidity
        this.$data.t2 = msg.dht22_1.temperature
        this.$data.hi2 = msg.dht22_1.heat_index
        this.$data.h3 = msg.dht22_1.humidity
        this.$data.t3 = msg.dht22_1.temperature
        this.$data.p1 = msg.dht22_1.pressure
        this.$data.gs1 = msg.dht22_1.gas_resistance
        this.$data.alt1 = msg.dht22_1.circa_altitude

        this.$data.log = msg
      }
    }




  });
  //console.log(msg)


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
          return moment(msg.time);
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

  var optionsLine = {
    chart: {
      height: 350,
      type: "line",
      stacked: true,
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000
        }
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22
      },/*
      events: {
        animationEnd: function (chartCtx) {

          window.setTimeout(function () {
            chartCtx.updateOptions(
              {
                series: [
                  {
                    name: "dht22_1.temperature",
                    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
                  },
                  {
                    name: "dht22_2.temperature",
                    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
                  }
                ],
                subtitle: {
                  //text: parseInt(getRandom() * Math.random()).toString()
                }
              },
              false,
              false
            );
          }, 300);
        }
      },*/
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight",
      width: 5
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 0
      }
    },
    series: [
      {
        name: "temp1",
        data: msg.dht22_1.temperature
      },
      {
        name: "temp2",
        data: msg.dht22_2.temperature
      }
    ],
    xaxis: {
      type: "datetime",
      range: 2700000
    },
    title: {
      text: "Processes",
      align: "left",
      style: {
        fontSize: "12px"
      }
    },
    subtitle: {
      text: "20",
      floating: true,
      align: "right",
      offsetY: 0,
      style: {
        fontSize: "22px"
      }
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: false
      },
      position: "top",
      offsetY: -33,
      offsetX: 60
    }
  };

  var chartLine = new ApexCharts(
    document.querySelector("#linechart"),
    optionsLine
  );
  chartLine.render();



});

