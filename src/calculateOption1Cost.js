export function calculateOption1Cost({
  energyStored,
  energyConsumedGrid,
  priceStandard,
  priceSurplus,
  surplusMax,
  priceRetrieval,
}) {
  const energyReducedkWh = Math.min(energyStored, energyConsumedGrid);
  const energyAfterConsumptionkWh = energyConsumedGrid - energyStored;
  const energyStandardkWh = Math.max(energyAfterConsumptionkWh, 0);
  const energySurpluskWh = Math.min(
    Math.max(energyAfterConsumptionkWh, -surplusMax),
    0
  );

  const energyReducedPrice = energyReducedkWh * priceRetrieval;
  const energyStandardPrice = energyStandardkWh * priceStandard;
  const energySurplusPrice = energySurpluskWh * priceSurplus;

  const result = energyReducedPrice + energyStandardPrice + energySurplusPrice;

  return {
    result,
    energyReducedkWh,
    energyStandardkWh,
    energySurpluskWh,
    energyReducedPrice,
    energyStandardPrice,
    energySurplusPrice,
  };
}
