import { Country, State, City } from "country-state-city";

export const getCountryOptions = () =>
  Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));

export const getStateOptions = (countryCode) =>
  State.getStatesOfCountry(countryCode).map((state) => ({
    label: state.name,
    value: state.isoCode,
  }));

export const getCityOptions = (countryCode, stateCode) =>
  City.getCitiesOfState(countryCode, stateCode).map((city) => ({
    label: city.name,
    value: city.name,
  }));