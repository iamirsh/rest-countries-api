import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import "./CountryDetail.css";

const CountryDetails = () => {
  const countryName = new URLSearchParams(location.search).get("name");
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const fetchCountryDetails = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      const [data] = await response.json();
      setCountryData({
        name: data.name.common,
        nativeName: Object.values(data.name.nativeName)[0].common,
        img: data.flags.png,
        population: data.population,
        region: data.region,
        subregion: data.subregion,
        capital: data.capital,
        tld: data.tld,
        languages: Object.values(data.languages),
        currencies: Object.values(data.currencies)
          .map((currency) => currency.name),
      });
    };
    fetchCountryDetails();
  }, []);

  return (
    <main>
      <div className="max-w-[1200px] mx-auto mt-8">
        <span className="back-button flex items-center gap-2 bg-red-200 w-20 p-2 rounded-lg cursor-pointer">
          <FaArrowLeft />
          Back
        </span>
        <div className="flex flex-col items-start mt-8 gap-4 md:flex-row md:items-center md:gap-16 md:mt-16 ">
          <img
            src={countryData.img}
            className="max-w-[400px] w-[100%] md:w-[40%]"
            alt="flag"
          />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativeName}</b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>
                  Population: {countryData.population}
                </b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion}</b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {countryData.capital}</b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {countryData.tld}</b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {countryData.languages}</b>
                <span className="languages"></span>
              </p>
            </div>
            <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CountryDetails;
