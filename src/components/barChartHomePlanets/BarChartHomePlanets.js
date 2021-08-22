import { useEffect, useState } from "react";
import api from "../../api/api";
import Block from "../block/Block";
import "./barChartHomePlanets.css";

const BarChartHomePlanets = () => {
  const planetsNames = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];
  const [planetDetail, setPlanetDetail] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get("planets");
      for (let index = 0; data.results.length > index; index++) {
        if (
          planetsNames.find(
            (planetName) => planetName === data.results[index].name
          )
        ) {
          setPlanetDetail((prevState) => [
            ...prevState,
            {
              planetName: data.results[index].name,
              population: data.results[index].population,
            },
          ]);
        }
      }
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

  return <div className="chart">{planetDetail && showBar()}</div>;
};
export default BarChartHomePlanets;
