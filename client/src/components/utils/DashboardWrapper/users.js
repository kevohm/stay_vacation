export const usersData = {
  options: {
    chart: {
      type: "area",
    },
    dataLabels: {
      enabled: false,
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
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: ["rgba(255, 164, 2, 1)"],
      width: 3,
      dashArray: 0,
    },
    fill: {
      colors: "rgba(255, 164, 2, .35)",
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 85, 100],
      },
    },
    colors: ["rgba(255, 164, 2, 1)"],
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