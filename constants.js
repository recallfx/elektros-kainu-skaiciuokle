// Standartinė kaina (€/kWh), pvz: https://ignitis.lt/lt/nepriklausomo-tiekimo-kainos/planai
// Optimalus planas, be mėnesio mokesčio ir 12 mėn. fiksuota kaina
export const priceStandardConst = 0.235;

// Naujausi 2025m. atsiskaitymo tarifai iš https://www.eso.lt/web/namams/elektra/tarifu-planai-kainos-atsiskaitymas/gaminanciu-vartotoju-atsiskaitymo-budai/3216
// Atsiskaitymas už atgautą energijos kiekį
// Mokama už patiektos į tinklą ir vėliau atgautos elektros energijos kilovatvalandę (kWh)
export const priceRetrievalConst = 0.06655;

// Atsiskaitymas už leistiną generuoti elektrinės galią
// Mokama už elektrinės leistiną generuoti galios kilovatą (kW)
export const priceForCapacityConst = 4.7916;

// Atsiskaitymas kilovatvalandėmis kiekiu pagal procentus
// Atsiskaitymas kilovatvalandėmis: nustatytas procentas nuo patiektos į tinklus energijos kiekio (kWh)
// paliekamas operatoriui už naudojimosi tinklais paslaugas. Klientas galės neatlygintinai atgauti nustatytą
// procentą nuo savo pagaminto ir patiekto į tinklą energijos kiekio.
export const percentageFromStoredConst = 35;

// Atsiskaitymas už atgautą energijos kiekį 2024m (€/kWh)
// Mokama už patiektos į tinklą ir vėliau atgautos elektros energijos kilovatvalandę (kWh)
export const priceSurplusConst = 0.06655;

// Maksimalus energijos perteklius (kWh)
export const surplusMaxConst = 500;
