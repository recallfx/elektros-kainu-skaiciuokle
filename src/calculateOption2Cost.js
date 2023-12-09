export function calculateOption2Cost({
  energyStored,
  energyConsumedGrid,
  priceStandard,
  priceSurplus,
  surplusMax,
  solarCapacity,
  priceForCapacity,
  monthsInYear,
}) {
  const energyAfterConsumptionkWh = energyConsumedGrid - energyStored;
  const energyStandardkWh = Math.max(energyAfterConsumptionkWh, 0);
  const energySurpluskWh = Math.min(
    Math.max(energyAfterConsumptionkWh, -surplusMax),
    0
  );

  if (solarCapacity > 0) {
    const solarCapacityPrice = solarCapacity * priceForCapacity * monthsInYear;
    const energyStandardPrice = energyStandardkWh * priceStandard;
    const energySurplusPrice = energySurpluskWh * priceSurplus;

    const result =
      solarCapacityPrice + energyStandardPrice + energySurplusPrice;

    return {
      result,
      energyAfterConsumptionkWh,
      energyStandardkWh,
      energySurpluskWh,

      solarCapacityPrice,
      energyStandardPrice,
      energySurplusPrice,
    };
  }

  const result = energyStandardkWh * priceStandard;

  return {
    result,
    energyAfterConsumptionkWh,
    energyStandardkWh,
    energySurpluskWh,

    solarCapacityPrice: 0,
    energyStandardPrice: 0,
    energySurplusPrice: 0,
  };
}
