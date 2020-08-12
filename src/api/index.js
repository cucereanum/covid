import axios from "axios";

const url = "https://covid19.mathdro.id/api";

const urlCountry = "https://disease.sh/v3/covid-19/countries";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };

    return modifiedData;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    const good = countries.map((country) => country.name);
    const index = good.indexOf("Gambia");
    good.splice(index, 1);

    return good;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataCountry = async (country) => {
  let changeableUrl = `${url}/countries/${country}`;
  if (country === "United States of America") {
    changeableUrl = `${url}/countries/USA`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };

    return modifiedData ? modifiedData : country;
  } catch (error) {
    return country;
  }
};

export const getCountryData = async (country) => {
  const url = `${urlCountry}/${country}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getCountries = async () => {
  const url = "https://disease.sh/v3/covid-19/countries";
  try {
    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
