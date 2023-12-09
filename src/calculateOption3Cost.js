export function calculateOption3Cost({
  energyStored,
  energyConsumedGrid,
  priceStandard,
  priceSurplus,
  surplusMax,
  percentageFromStored,
}) {
  const energyAfterDeductionkWh = energyStored * (1 - (percentageFromStored / 100));
  const energyAfterConsumptionkWh =
    energyConsumedGrid - energyAfterDeductionkWh;
  const energySurpluskWh = Math.min(
    Math.max(energyAfterConsumptionkWh, -surplusMax),
    0
  );
  const energyStandardkWh = Math.max(energyAfterConsumptionkWh, 0);
  const energySurplusPrice = energySurpluskWh * priceSurplus;
  const energyStandardPrice = energyStandardkWh * priceStandard;

  const result = energyStandardPrice + energySurplusPrice;

  return {
    result,
    energyAfterDeductionkWh,
    energyAfterConsumptionkWh,
    energySurpluskWh,
    energyStandardkWh,
    energyStandardPrice,
    energySurplusPrice,
  };
}
