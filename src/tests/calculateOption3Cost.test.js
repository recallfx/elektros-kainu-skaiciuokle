import { describe, expect, test } from "vitest";
import { calculateOption3Cost } from "../calculateOption3Cost.js";

describe("calculateOption3Cost", () => {
  const priceStandard = 3;
  const priceSurplus = 2;

  test("should correctly calculate cost no stored and comsumed from grid", () => {
    const energyStored = 0;
    const energyConsumedGrid = 1;
    const percentageFromStored = 50;

    const {
      result,
      energyAfterDeductionkWh,
      energyAfterConsumptionkWh,
      energySurpluskWh,
      energyStandardkWh,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption3Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      percentageFromStored,
    });

    expect(result).toBe(energyConsumedGrid * priceStandard);
    expect(energyAfterDeductionkWh).toBe(0);
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid);
    expect(energyStandardkWh).toBe(energyConsumedGrid);
    expect(energySurpluskWh).toBe(0);
    expect(energyStandardPrice).toBe(energyStandardkWh * priceStandard);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost comsumed from grid, but stored energy", () => {
    const energyStored = 10;
    const energyConsumedGrid = 0;
    const percentageFromStored = 30;

    const {
      result,
      energyAfterDeductionkWh,
      energyAfterConsumptionkWh,
      energySurpluskWh,
      energyStandardkWh,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption3Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      percentageFromStored,
    });

    expect(result).toBe(0);
    expect(energyAfterDeductionkWh).toBe(
      energyStored * (1 - percentageFromStored / 100)
    );
    expect(energyAfterConsumptionkWh).toBe(-energyAfterDeductionkWh);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(-0);
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(-0);
  });

  test("should correctly calculate if no stored or consumed", () => {
    const energyStored = 0;
    const energyConsumedGrid = 0;
    const percentageFromStored = 50;

    const {
      result,
      energyAfterDeductionkWh,
      energyAfterConsumptionkWh,
      energySurpluskWh,
      energyStandardkWh,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption3Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      percentageFromStored,
    });

    expect(result).toBe(0);
    expect(energyAfterDeductionkWh).toBe(0);
    expect(energyAfterConsumptionkWh).toBe(0);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(0);
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for consumed from grid", () => {
    const energyStored = 0;
    const energyConsumedGrid = 1;
    const percentageFromStored = 50;

    const {
      result,
      energyAfterDeductionkWh,
      energyAfterConsumptionkWh,
      energySurpluskWh,
      energyStandardkWh,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption3Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      percentageFromStored,
    });

    expect(result).toBe(energyConsumedGrid * priceStandard);
    expect(energyAfterDeductionkWh).toBe(0);
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid);
    expect(energyStandardkWh).toBe(energyConsumedGrid);
    expect(energySurpluskWh).toBe(0);
    expect(energyStandardPrice).toBe(energyStandardkWh * priceStandard);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost when stored and consumed equal", () => {
    const energyStored = 10;
    const energyConsumedGrid = 10;
    const percentageFromStored = 50;

    const {
      result,
      energyAfterDeductionkWh,
      energyAfterConsumptionkWh,
      energySurpluskWh,
      energyStandardkWh,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption3Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      percentageFromStored,
    });

    expect(result).toBe(
      (energyConsumedGrid - energyStored * (1 - percentageFromStored / 100)) *
        priceStandard
    );
    expect(energyAfterDeductionkWh).toBe(
      energyStored * (1 - percentageFromStored / 100)
    );
    expect(energyAfterConsumptionkWh).toBe(
      energyConsumedGrid - energyAfterDeductionkWh
    );
    expect(energyStandardkWh).toBe(energyAfterConsumptionkWh);
    expect(energySurpluskWh).toBe(0);
    expect(energyStandardPrice).toBe(energyStandardkWh * priceStandard);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for consumed grid and stored energy is excessive", () => {
    const surplusMax = 10;
    const energyStored = 30;
    const energyConsumedGrid = 0;
    const percentageFromStored = 30;

    const {
      result,
      energyAfterDeductionkWh,
      energyAfterConsumptionkWh,
      energySurpluskWh,
      energyStandardkWh,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption3Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax,
      percentageFromStored,
    });

    expect(result).toBe(surplusMax * -priceSurplus);
    expect(energyAfterDeductionkWh).toBe(
      energyStored * (1 - percentageFromStored / 100)
    );
    expect(energyAfterConsumptionkWh).toBe(-energyAfterDeductionkWh);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(-surplusMax);
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(energySurpluskWh * priceSurplus);
  });

  test("should correctly calculate cost for consumed grid more", () => {
    const energyStored = 10;
    const energyConsumedGrid = 20;
    const percentageFromStored = 50;

    const {
      result,
      energyAfterDeductionkWh,
      energyAfterConsumptionkWh,
      energySurpluskWh,
      energyStandardkWh,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption3Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      percentageFromStored,
    });

    expect(result).toBe(
      (energyConsumedGrid - energyStored * (1 - percentageFromStored / 100)) *
        priceStandard
    );
    expect(energyAfterDeductionkWh).toBe(
      energyStored * (1 - percentageFromStored / 100)
    );
    expect(energyAfterConsumptionkWh).toBe(
      energyConsumedGrid - energyAfterDeductionkWh
    );
    expect(energyStandardkWh).toBe(energyAfterConsumptionkWh);
    expect(energySurpluskWh).toBe(0);
    expect(energyStandardPrice).toBe(energyStandardkWh * priceStandard);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for stored more", () => {
    const energyStored = 20;
    const energyConsumedGrid = 1;
    const percentageFromStored = 50;

    const {
      result,
      energyAfterDeductionkWh,
      energyAfterConsumptionkWh,
      energySurpluskWh,
      energyStandardkWh,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption3Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 100,
      percentageFromStored,
    });

    expect(result).toBe(
      (energyConsumedGrid - energyStored * (1 - percentageFromStored / 100)) *
        priceSurplus
    );
    expect(energyAfterDeductionkWh).toBe(
      energyStored * (1 - percentageFromStored / 100)
    );
    expect(energyAfterConsumptionkWh).toBe(
      energyConsumedGrid - energyAfterDeductionkWh
    );
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(energyAfterConsumptionkWh);
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(energySurpluskWh * priceSurplus);
  });
});
