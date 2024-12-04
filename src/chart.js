import Chart from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(annotationPlugin);

import { calculateOption1Cost } from "./calculateOption1Cost.js";
import { calculateOption2Cost } from "./calculateOption2Cost.js";
import { calculateOption3Cost } from "./calculateOption3Cost.js";

let costChart;

export function renderChart({
  costOptions1,
  costOptions2,
  costOptions3,
  consumedRange,
  storedEnergy,
  storedEenergyAfterDeduction,
  energyConsumedGrid,
}) {
  const ctx = document.getElementById("costChart").getContext("2d");
  if (costChart) {
    costChart.destroy(); // Destroy the old chart instance before creating a new one
  }

  costChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: consumedRange,
      datasets: [
        {
          label: "Variantas 1",
          data: costOptions1,
          borderColor: "rgb(239 68 68)",
          fill: false,
          pointStyle: false,
        },
        {
          label: "Variantas 2",
          data: costOptions2,
          borderColor: "rgb(59 130 246)",
          fill: false,
          pointStyle: false,
        },
        {
          label: "Variantas 3",
          data: costOptions3,
          borderColor: "rgb(34 197 94)",
          fill: false,
          pointStyle: false,
        },
      ],
    },
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: "Kaina (€)",
          },
          beginAtZero: true,
        },
        x: {
          title: {
            display: true,
            text: "Suvartota elektros energija iš tinklo (kWh)",
          },
        },
      },

      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          display: false,
        },
        annotation: {
          annotations: [
            {
              type: "line",
              borderColor: "black",
              borderWidth: 2,
              borderDash: [10, 5],
              scaleID: "x",
              value: storedEnergy,
            },
            {
              type: "line",
              scaleID: "x",
              value: storedEenergyAfterDeduction,
              borderColor: "black",
              borderWidth: 1,
              borderDash: [10, 5],
            },
            {
              type: "line",
              scaleID: "x",
              value: energyConsumedGrid,
              borderColor: "red",
              borderWidth: 1,
            },
          ],
        },
      },
    },
  });
}

export function updateChart({
  energyStored,
  energyConsumedGrid,
  solarCapacity,
  priceStandard,
  priceSurplus,
  priceRetrieval,
  priceForCapacity,
  percentageFromStored,
  monthsInYear,
  energyConsumedGridMax,
  surplusMax,
}) {
  const consumedRange = [];
  const costOptions1 = [];
  const costOptions2 = [];
  const costOptions3 = [];

  for (
    let energyConsumedGridChart = 0;
    energyConsumedGridChart <= energyConsumedGridMax;
    energyConsumedGridChart += energyConsumedGridMax / 10
  ) {
    costOptions1.push(
      calculateOption1Cost({
        energyStored,
        energyConsumedGrid: energyConsumedGridChart,
        priceStandard,
        priceSurplus,
        surplusMax,
        priceRetrieval,
      }).result
    );
    costOptions2.push(
      calculateOption2Cost({
        energyStored,
        energyConsumedGrid: energyConsumedGridChart,
        priceStandard,
        priceSurplus,
        surplusMax,
        solarCapacity,
        priceForCapacity,
        monthsInYear,
      }).result
    );
    costOptions3.push(
      calculateOption3Cost({
        energyStored,
        energyConsumedGrid: energyConsumedGridChart,
        priceStandard,
        priceSurplus,
        surplusMax,
        percentageFromStored,
      }).result
    );

    consumedRange.push(energyConsumedGridChart.toFixed(0));
  }

  renderChart({
    costOptions1,
    costOptions2,
    costOptions3,
    consumedRange,
    storedEnergy: energyStored / 1000,
    storedEenergyAfterDeduction:
      (energyStored * (1 - percentageFromStored / 100)) / 1000,
    energyConsumedGrid: energyConsumedGrid / 1000,
  });
}
