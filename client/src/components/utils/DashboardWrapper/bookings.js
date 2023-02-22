export const bookingData = {
  options: {
    chart: {
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: "rgba(255, 164, 2, .3)",
      type: "solid",
    },
    states: {
    normal: {
        filter: {
            type: 'none',
            value: 0,
        }
    },
      hover: {
      colors:"#000",
        filter: {
            type: 'none',
            value: 0,
        }
      },
      
    active: {
        allowMultipleDataPointsSelection: false,
        filter: {
            type: 'none',
            value: 0,
        }
    },
},
    grid: {
      show: true,
      borderColor: "rgba(0,0,0,.1)",
      strokeDashArray: 2,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      row: {
        colors: undefined,
        opacity: 0.5,
      },
      column: {
        colors: undefined,
        opacity: 0.5,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
        color: "rgba(0,0,0,.5)",
      },
      axisTicks: {
        show: true,
        color: "rgba(0,0,0,.1)",
      },
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
      ],
    },
  },
  series: [
    {
      name: "Series 1",
      data: [45, 52, 38, 45, 19, 23, 2],
    },
  ],
};
