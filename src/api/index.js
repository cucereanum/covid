import axios from "axios";

const anotherUrl = "https://disease.sh/v3/covid-19/all";

const urlCountry = "https://disease.sh/v3/covid-19/countries";

export const fetchData = async (country) => {
  let changeableUrl = anotherUrl;

  if (country) {
    changeableUrl = `https://disease.sh/v3/covid-19/countries/${country}`;
  }

  try {
    const {
      data: {
        cases,
        recovered,
        deaths,
        lastUpdate,
        todayCases,
        todayDeaths,
        todayRecovered,
      },
    } = await axios.get(changeableUrl);

    const modifiedData = {
      cases,
      recovered,
      deaths,
      lastUpdate,
      todayCases,
      todayDeaths,
      todayRecovered,
    };

    return modifiedData;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`https://covid19.mathdro.id/api/daily`);

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
    const { data } = await axios.get(`${urlCountry}`);

    const fetched = data.map((country) => country.country);

    return fetched;
  } catch (error) {
    console.log(error);
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
