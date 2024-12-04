import {
	createApp,
	ref,
	computed,
	watchEffect,
} from "vue/dist/vue.esm-bundler.js";
import "./style.css";
import { updateChart } from "./chart.js";

import { calculateOption1Cost } from "./calculateOption1Cost.js";
import { calculateOption2Cost } from "./calculateOption2Cost.js";
import { calculateOption3Cost } from "./calculateOption3Cost.js";

import {
	priceStandardConst,
	priceRetrievalConst,
	priceForCapacityConst,
	percentageFromStoredConst,
	surplusMaxConst,
	priceSurplusConst,
} from "../constants.js";

createApp({
	setup() {
		const showSettings = ref(false);
		// Max values
		const energyConsumedSolarMax = 10000;
		const energyStoredMax = 10000;
		const energyConsumedGridMax = 10000;
		const solarCapacityMax = 60;

		const priceStandardInput = ref(priceStandardConst);
		const priceRetrievalInput = ref(priceRetrievalConst);
		const priceForCapacityInput = ref(priceForCapacityConst);
		const percentageFromStoredInput = ref(percentageFromStoredConst);
		const monthsInYearInput = ref(12);
		const priceSurplusInput = ref(priceSurplusConst);
		const surplusMaxInput = ref(surplusMaxConst);

		const priceStandard = computed(() => priceStandardInput.value || 0);
		const priceRetrieval = computed(() => priceRetrievalInput.value || 0);
		const priceForCapacity = computed(() => priceForCapacityInput.value || 0);
		const percentageFromStored = computed(
			() => percentageFromStoredInput.value || 0,
		);
		const monthsInYear = computed(() => monthsInYearInput.value || 0);
		const priceSurplus = computed(() => priceSurplusInput.value || 0);
		const surplusMax = computed(() => surplusMaxInput.value || 0);

		// Input values with default values
		const energyStoredInput = ref(5000);
		const energyConsumedSolarInput = ref(5000);
		const energyConsumedGridInput = ref(5000);
		const solarCapacityInput = ref(10);

		const energyStored = computed(() => energyStoredInput.value || 0);
		const energyConsumedSolar = computed(
			() => energyConsumedSolarInput.value || 0,
		);
		const energyConsumedGrid = computed(
			() => energyConsumedGridInput.value || 0,
		);
		const solarCapacity = computed(() => solarCapacityInput.value || 0);

		const energyConsumed = computed(
			() => energyConsumedSolar.value + energyConsumedGrid.value,
		);
		const energyProduced = computed(
			() => energyConsumedSolar.value + energyStored.value,
		);

		const energySufficiency = computed(() =>
			energyConsumed.value > 0
				? (energyConsumedSolar.value / energyConsumed.value) * 100
				: 0,
		);
		const energyBalance = computed(
			() => energyStored.value - energyConsumedGrid.value,
		);
		const costStandard = computed(
			() =>
				(energyConsumedSolar.value + energyConsumedGrid.value) *
				priceStandard.value,
		);
		const costOption1 = computed(
			() =>
				calculateOption1Cost({
					energyStored: energyStored.value,
					energyConsumedGrid: energyConsumedGrid.value,
					priceStandard: priceStandard.value,
					priceSurplus: priceSurplus.value,
					surplusMax: surplusMax.value,
					priceRetrieval: priceRetrieval.value,
				}).result,
		);
		const costOption2 = computed(
			() =>
				calculateOption2Cost({
					energyStored: energyStored.value,
					energyConsumedGrid: energyConsumedGrid.value,
					priceStandard: priceStandard.value,
					priceSurplus: priceSurplus.value,
					surplusMax: surplusMax.value,
					solarCapacity: solarCapacity.value,
					priceForCapacity: priceForCapacity.value,
					monthsInYear: monthsInYear.value,
				}).result,
		);
		const costOption3 = computed(
			() =>
				calculateOption3Cost({
					energyStored: energyStored.value,
					energyConsumedGrid: energyConsumedGrid.value,
					priceStandard: priceStandard.value,
					priceSurplus: priceSurplus.value,
					surplusMax: surplusMax.value,
					percentageFromStored: percentageFromStored.value,
				}).result,
		);

		const bestOptionText = computed(() => {
			const bestOption = Math.min(
				costOption1.value,
				costOption2.value,
				costOption3.value,
			);

			if (
				bestOption === costOption1.value &&
				bestOption === costOption2.value &&
				bestOption === costOption3.value
			) {
				return "Visi variantai kainuoja vienodai";
			}
      
      if (bestOption === costOption1.value) {
				return "1 variantas yra pigiausias";
			}
      
      if (bestOption === costOption2.value) {
				return "2 variantas yra pigiausias";
			}
      
      if (bestOption === costOption3.value) {
				return "3 variantas yra pigiausias";
			}
      
      return "Nėra pigiausio varianto";		
		});

		watchEffect(() =>
			updateChart({
				energyStored: energyStored.value,
				energyConsumedGrid: energyConsumedGrid.value,
				solarCapacity: solarCapacity.value,
				priceStandard: priceStandard.value,
				priceSurplus: priceSurplus.value,
				priceRetrieval: priceRetrieval.value,
				priceForCapacity: priceForCapacity.value,
				percentageFromStored: percentageFromStored.value,
				monthsInYear: monthsInYear.value,
				surplusMax: surplusMax.value,
				energyConsumedGridMax,
			}),
		);

		return {
			showSettings,

			energyConsumedSolarMax,
			energyStoredMax,
			energyConsumedGridMax,
			solarCapacityMax,

			priceStandardInput,
			priceSurplusInput,
			surplusMaxInput,
			priceRetrievalInput,
			priceForCapacityInput,
			percentageFromStoredInput,

			energyStoredInput,
			energyConsumedSolarInput,
			energyConsumedGridInput,
			energyConsumed,
			solarCapacityInput,

			energyProduced,
			energySufficiency,
			energyBalance,
			costStandard,
			costOption1,
			costOption2,
			costOption3,
			bestOptionText,
		};
	},
}).mount("#app");
