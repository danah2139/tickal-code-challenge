import { useEffect, useState } from "react";
import getBarChartDetails from "./getBarChartDetails";
import Block from "../block/Block";
import "./barChartHomePlanets.css";

const BarChartHomePlanets = () => {
  const [planetDetail, setPlanetDetail] = useState([]);
  useEffect(() => {
    (async () => {
      setPlanetDetail(await getBarChartDetails());
    })();
  }, []);
  const showBar = () => {
    return planetDetail.map((planet) => (
      <Block
        name={planet.planetName}
        population={planet.population}
        key={planet.planetName}
      />
    ));
  };

  return <div className="chart">{planetDetail.length > 0 && showBar()}</div>;
};
export default BarChartHomePlanets;
