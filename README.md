# Elektros kainų skaičiuoklė

[Skačiuoklę rasite čia](https://recallfx.github.io/elektros-kainu-skaiciuokle/)

## Apie projektą

Tai yra interaktyvi skaičiuoklė, kuri padeda nustatyti ekonomiškiausią elektros tarifų planą pagal vartojimą. Vartotojai gali įvesti duomenis apie tiesiogiai iš saulės gautą, atiduotą ir iš tinklo suvartotą energiją, saulės jėgainės dydį. Skaičiuoklė rodo bendrą pagamintą ir suvartotą energiją, savarankiškumo procentą, energijos balansą ir palygina išlaidas skirtinguose tarifų planuose, taip pat pasiūlo geriausią variantą vartotojui. Taiturėtų padėtų vartotojams lengvai apsispręsti, kurį ESO (Energijos Skirstymo Operatorius) gaminančio vartotojo tarifo planą pasirinkti. Tai ypač naudinga, siekiant optimizuoti išlaidas.

## Funkcionalumas

- Skaičiavimas remiasi naujausiais ESO tarifais.
- Vartotojas gali įvesti savo duomenis ir pamatyti, kuris planas jam labiausiai tinka.
- Naujausia versija atnaujinta 2024 metams.

## Kaip naudotis

1. Apsilankykite [skaičiuoklės puslapyje](https://recallfx.github.io/elektros-kainu-skaiciuokle/).
2. Įveskite savo duomenis: tiesiogiai iš saulės gautą energiją, atiduotą energiją į tinklą, suvartotą energiją iš tinklo ir saulės jėgainės dydį.
3. Peržiūrėkite skaičiavimo rezultatus: bendrą pagamintą ir suvartotą energiją, savarankiškumo procentą, energijos balansą.
4. Palyginkite išlaidas skirtinguose tarifų planuose ir pasirinkite geriausią variantą jūsų poreikiams.

## Nuorodos

- [ESO Tarifai ir Kainos](https://www.eso.lt/lt/namams/elektra/tarifai-kainos-atsiskaitymas-ir-skolos/gaminanciu-vartotoju-kainos.html)

## Naudoji instrukcija

1. Atidarykite terminalą ir pereikite į projekto katalogą. 
2. Įdiekite projekto priklausomybes naudodami `yarn`.
3. Paleiskite projekto testavimo scenarijų naudodami `yarn vitest`.
4. Paredaguokite kodą `src/` kataloge.
5. Išbandykite projekta naudodami `yarn dev`.
6. Paleiskite projekto kūrimo scenarijų naudodami `yarn run build`. 
7. Peržiūrėkite sukurtus failus `/docs` kataloge.
