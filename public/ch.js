
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
        formatter: function(val) {
          return moment(this.$data.time);
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
      },
      events: {
        animationEnd: function(chartCtx) {
          const newData1 = chartCtx.w.config.series[0].data.slice();
          newData1.shift();
          const newData2 = chartCtx.w.config.series[1].data.slice();
          newData2.shift();
          window.setTimeout(function() {
            chartCtx.updateOptions(
              {
                series: [
                  {
                    name: "Running",
                    data: newData1
                  },
                  {
                    name: "Waiting",
                    data: newData2
                  }
                ],
                subtitle: {
                  text: parseInt(getRandom() * Math.random()).toString()
                }
              },
              false,
              false
            );
          }, 300);
        }
      },
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
        name: "Running",
        data: mqtt.msg.dht22_1.device,
      },
      {
        name: "Waiting",
        data: mqtt.msg.dht22_1.device,
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
  
  