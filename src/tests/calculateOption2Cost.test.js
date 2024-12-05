import { describe, expect, test } from "vitest";
import { calculateOption2Cost } from "../calculateOption2Cost.js";

describe("calculateOption2Cost", () => {
  const priceStandard = 3;
  const priceSurplus = 2;
  const priceForCapacity = 4;
  const monthsInYear = 10;

  test("should correctly calculate cost no stored and comsumed from grid", () => {
    const energyStored = 0;
    const energyConsumedGrid = 1;
    const solarCapacity = 0;

    const {
      result,
      energyAfterConsumptionkWh,
      energyStandardkWh,
      energySurpluskWh,

      solarCapacityPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption2Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      solarCapacity,
      priceForCapacity,
      monthsInYear,
    });

    expect(result).toBe(energyConsumedGrid * priceStandard);
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid);
    expect(energyStandardkWh).toBe(energyConsumedGrid);
    expect(energySurpluskWh).toBe(0);
    expect(solarCapacityPrice).toBe(0);
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost no solar capacity and no comsumed from grid, but stored energy", () => {
    const energyStored = 1;
    const energyConsumedGrid = 0;
    const solarCapacity = 0;

    const {
      result,
      energyAfterConsumptionkWh,
      energyStandardkWh,
      energySurpluskWh,

      solarCapacityPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption2Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      solarCapacity,
      priceForCapacity,
      monthsInYear,
    });

    expect(result).toBe(0);
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid - energyStored);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(-0);
    expect(solarCapacityPrice).toBe(0);
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for solar capacity", () => {
    const energyStored = 0;
    const energyConsumedGrid = 0;
    const solarCapacity = 1;

    const {
      result,
      energyAfterConsumptionkWh,
      energyStandardkWh,
      energySurpluskWh,

      solarCapacityPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption2Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      solarCapacity,
      priceForCapacity,
      monthsInYear,
    });

    expect(result).toBe(solarCapacity * priceForCapacity * monthsInYear);
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid - energyStored);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(energyConsumedGrid - energyStored);
    expect(solarCapacityPrice).toBe(
      solarCapacity * priceForCapacity * monthsInYear
    );
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for solar capacity and consumed from grid", () => {
    const energyStored = 0;
    const energyConsumedGrid = 1;
    const solarCapacity = 1;

    const {
      result,
      energyAfterConsumptionkWh,
      energyStandardkWh,
      energySurpluskWh,

      solarCapacityPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption2Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      solarCapacity,
      priceForCapacity,
      monthsInYear,
    });

    expect(result).toBe(
      solarCapacity * priceForCapacity * monthsInYear +
        energyConsumedGrid * priceStandard
    );
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid - energyStored);
    expect(energyStandardkWh).toBe(energyConsumedGrid);
    expect(energySurpluskWh).toBe(0);
    expect(solarCapacityPrice).toBe(
      solarCapacity * priceForCapacity * monthsInYear
    );
    expect(energyStandardPrice).toBe(energyConsumedGrid * priceStandard);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for solar capacity and only stored", () => {
    const energyStored = 1;
    const energyConsumedGrid = 0;
    const solarCapacity = 1;

    const {
      result,
      energyAfterConsumptionkWh,
      energyStandardkWh,
      energySurpluskWh,

      solarCapacityPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption2Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      solarCapacity,
      priceForCapacity,
      monthsInYear,
    });

    expect(result).toBe(
      solarCapacity * priceForCapacity * monthsInYear +
        energyConsumedGrid * priceStandard
    );
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid - energyStored);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(-0);
    expect(solarCapacityPrice).toBe(
      solarCapacity * priceForCapacity * monthsInYear
    );
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(-0);
  });

  test("should correctly calculate cost when stored and consumed equal", () => {
    const energyStored = 1;
    const energyConsumedGrid = 1;
    const solarCapacity = 1;

    const {
      result,
      energyAfterConsumptionkWh,
      energyStandardkWh,
      energySurpluskWh,

      solarCapacityPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption2Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      solarCapacity,
      priceForCapacity,
      monthsInYear,
    });

    expect(result).toBe(solarCapacity * priceForCapacity * monthsInYear);
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid - energyStored);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(0);
    expect(solarCapacityPrice).toBe(
      solarCapacity * priceForCapacity * monthsInYear
    );
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for consumed grid and stored energy is excessive", () => {
    const surplusMax = 1;
    const energyStored = surplusMax + 1;
    const energyConsumedGrid = 0;
    const solarCapacity = 1;

    const {
      result,
      energyAfterConsumptionkWh,
      energyStandardkWh,
      energySurpluskWh,

      solarCapacityPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption2Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax,
      solarCapacity,
      priceForCapacity,
      monthsInYear: 1,
    });

    expect(result).toBe(
      solarCapacity * priceForCapacity * 1 - surplusMax * priceSurplus
    );
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid - energyStored);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(-surplusMax);
    expect(solarCapacityPrice).toBe(solarCapacity * priceForCapacity * 1);
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(-surplusMax * priceSurplus);
  });

  test("should correctly calculate cost when stored and consumed equal", () => {
    const energyStored = 1;
    const energyConsumedGrid = 1;
    const solarCapacity = 1;

    const {
      result,
      energyAfterConsumptionkWh,
      energyStandardkWh,
      energySurpluskWh,

      solarCapacityPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption2Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      solarCapacity,
      priceForCapacity,
      monthsInYear,
    });

    expect(result).toBe(
      solarCapacity * priceForCapacity * monthsInYear +
        energySurpluskWh * priceSurplus
    );
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid - energyStored);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(0);
    expect(solarCapacityPrice).toBe(
      solarCapacity * priceForCapacity * monthsInYear
    );
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for consumed grid more", () => {
    const energyStored = 1;
    const energyConsumedGrid = 2;
    const solarCapacity = 1;

    const {
      result,
      energyAfterConsumptionkWh,
      energyStandardkWh,
      energySurpluskWh,

      solarCapacityPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption2Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      solarCapacity,
      priceForCapacity,
      monthsInYear,
    });

    expect(result).toBe(
      solarCapacity * priceForCapacity * monthsInYear +
        energyStandardkWh * priceStandard
    );
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid - energyStored);
    expect(energyStandardkWh).toBe(energyConsumedGrid - energyStored);
    expect(energySurpluskWh).toBe(0);
    expect(solarCapacityPrice).toBe(
      solarCapacity * priceForCapacity * monthsInYear
    );
    expect(energyStandardPrice).toBe(energyStandardkWh * priceStandard);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for stored more", () => {
    const energyStored = 2;
    const energyConsumedGrid = 1;
    const solarCapacity = 1;

    const {
      result,
      energyAfterConsumptionkWh,
      energyStandardkWh,
      energySurpluskWh,

      solarCapacityPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption2Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax: 0,
      solarCapacity,
      priceForCapacity,
      monthsInYear,
    });

    expect(result).toBe(
      solarCapacity * priceForCapacity * monthsInYear +
        energySurpluskWh * priceSurplus
    );
    expect(energyAfterConsumptionkWh).toBe(energyConsumedGrid - energyStored);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(-0);
    expect(solarCapacityPrice).toBe(
      solarCapacity * priceForCapacity * monthsInYear
    );
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(energySurpluskWh * priceSurplus);
  });
});
