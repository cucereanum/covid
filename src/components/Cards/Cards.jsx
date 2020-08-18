import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Cards.module.css";

//  {new Date().toDateString()}

const Cards = ({
  data: {
    cases,
    recovered,
    deaths,
    lastUpdate,
    todayCases,
    todayDeaths,
    todayRecovered,
  },
  handleCase,
  selectedCase,
}) => {
  if (!cases) {
    return "Loading...";
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent
            onClick={(e) => handleCase("cases")}
            className={selectedCase === "cases" ? styles.selected : null}
          >
            <Typography color="secondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={cases} duration={3} separator="," />
            </Typography>
            <Typography className={styles.colorInfected}>
              Today: +{todayCases}
            </Typography>
            <Typography variant="body2">
              Number of active cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent
            onClick={(e) => handleCase("recovered")}
            className={selectedCase === "recovered" ? styles.selected : null}
          >
            <Typography color="secondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={recovered} duration={3} separator="," />
            </Typography>
            <Typography className={styles.colorRecovered}>
              Today: +{todayRecovered}
            </Typography>
            <Typography variant="body2">
              Number of recoveries cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent
            onClick={(e) => handleCase("deaths")}
            className={selectedCase === "deaths" ? styles.selected : null}
          >
            <Typography color="secondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={deaths} duration={3} separator="," />
            </Typography>
            <Typography className={styles.colorDeaths}>
              Today: +{todayDeaths}
            </Typography>
            <Typography variant="body2">
              Number of deaths by COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
