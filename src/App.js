import React from "react";

import { Cards, Chart, CountryPicker, Map } from "./components";
import styles from "./App.module.css";

import { fetchData, getCountries, getCountryData } from "./api";

import coronaImage from "./images/image.png";
import "leaflet/dist/leaflet.css";

//

class App extends React.Component {
  state = {
    data: {},
    country: "",
    mapCenter: { lat: 34.80746, lng: -40.4796 },
    mapZoom: 3,
    mapCountries: [],
    cases: "cases",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    const countries = await getCountries();

    this.setState({
      data: fetchedData,
      mapCountries: countries,
    });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    const fecthedCountryData = await getCountryData(country);
    if (country === "") {
      this.setState({
        data: fetchedData,

        mapCenter: [34.80746, -40.4796],
        mapZoom: 3,
      });
      return;
    }

    const coordonates = fecthedCountryData.countryInfo;

    this.setState({
      data: fetchedData,
      country: country,
      mapCenter: [coordonates.lat, coordonates.long],
      mapZoom: 5,
    });
  };

  handleChange = (string) => {
    this.setState({
      content: string,
    });
  };

  handleCaseChange = (type) => {
    this.setState({
      cases: type,
    });
  };

  render() {
    const {
      data,
      country,
      mapCenter,
      mapZoom,
      mapCountries,
      cases,
    } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards
          handleCase={this.handleCaseChange}
          selectedCase={cases}
          data={data}
        />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Map
          casesType={cases}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
