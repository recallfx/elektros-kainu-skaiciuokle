import { describe, expect, test } from "vitest";
import { calculateOption1Cost } from "../calculateOption1Cost.js";

describe("calculateOption1Cost", () => {
  const priceStandard = 3;
  const priceSurplus = 2;
  const priceRetrieval = 1;
  const surplusMax = 10;

  test("should correctly calculate cost for consumed grid ", () => {
    const energyStored = 0;
    const energyConsumedGrid = 1;

    const {
      result,
      energyReducedkWh,
      energyStandardkWh,
      energySurpluskWh,
      energyReducedPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption1Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax,
      priceRetrieval,
    });

    expect(result).toBe(energyConsumedGrid * priceStandard);
    expect(energyReducedkWh).toBe(0);
    expect(energyStandardkWh).toBe(energyConsumedGrid);
    expect(energySurpluskWh).toBe(0);
    expect(energyReducedPrice).toBe(0);
    expect(energyStandardPrice).toBe(energyConsumedGrid * priceStandard);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for consumed grid and stored energy", () => {
    const energyStored = 1;
    const energyConsumedGrid = 0;

    const {
      result,
      energyReducedkWh,
      energyStandardkWh,
      energySurpluskWh,
      energyReducedPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption1Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax,
      priceRetrieval,
    });

    expect(result).toBe(-(energyStored * priceSurplus));
    expect(energyReducedkWh).toBe(0);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(-energyStored);
    expect(energyReducedPrice).toBe(0);
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(-(energyStored * priceSurplus));
  });

  test("should correctly calculate cost for consumed grid and stored energy is excessive", () => {
    const energyStored = surplusMax + 1;
    const energyConsumedGrid = 0;

    const {
      result,
      energyReducedkWh,
      energyStandardkWh,
      energySurpluskWh,
      energyReducedPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption1Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax,
      priceRetrieval,
    });

    expect(result).toBe(-(surplusMax * priceSurplus));
    expect(energyReducedkWh).toBe(0);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(-surplusMax);
    expect(energyReducedPrice).toBe(0);
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(-(surplusMax * priceSurplus));
  });

  test("should correctly calculate cost for consumed grid and stored energy equally", () => {
    const energyStored = 1;
    const energyConsumedGrid = 1;

    const {
      result,
      energyReducedkWh,
      energyStandardkWh,
      energySurpluskWh,
      energyReducedPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption1Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax,
      priceRetrieval,
    });

    expect(result).toBe(energyStored * priceRetrieval);
    expect(energyReducedkWh).toBe(energyStored);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(0);
    expect(energyReducedPrice).toBe(energyStored * priceRetrieval);
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for consumed grid more", () => {
    const energyStored = 1;
    const energyConsumedGrid = 2;

    const {
      result,
      energyReducedkWh,
      energyStandardkWh,
      energySurpluskWh,
      energyReducedPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption1Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax,
      priceRetrieval,
    });

    expect(result).toBe(
      energyStored * priceRetrieval +
        (energyConsumedGrid - energyStored) * priceStandard
    );
    expect(energyReducedkWh).toBe(energyStored);
    expect(energyStandardkWh).toBe(energyConsumedGrid - energyStored);
    expect(energySurpluskWh).toBe(0);
    expect(energyReducedPrice).toBe(energyStored * priceRetrieval);
    expect(energyStandardPrice).toBe(
      (energyConsumedGrid - energyStored) * priceStandard
    );
    expect(energySurplusPrice).toBe(0);
  });

  test("should correctly calculate cost for stored more", () => {
    const energyStored = 2;
    const energyConsumedGrid = 1;

    const {
      result,
      energyReducedkWh,
      energyStandardkWh,
      energySurpluskWh,
      energyReducedPrice,
      energyStandardPrice,
      energySurplusPrice,
    } = calculateOption1Cost({
      energyStored,
      energyConsumedGrid,
      priceStandard,
      priceSurplus,
      surplusMax,
      priceRetrieval,
    });

    expect(result).toBe(
      energyStored * priceRetrieval + energySurpluskWh * priceStandard
    );
    expect(energyReducedkWh).toBe(energyConsumedGrid);
    expect(energyStandardkWh).toBe(0);
    expect(energySurpluskWh).toBe(energyConsumedGrid - energyStored);
    expect(energyReducedPrice).toBe(energyReducedkWh * priceRetrieval);
    expect(energyStandardPrice).toBe(0);
    expect(energySurplusPrice).toBe(energySurpluskWh * priceSurplus);
  });
});
