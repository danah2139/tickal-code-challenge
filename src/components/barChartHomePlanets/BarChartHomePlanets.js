import { useEffect, useState } from "react";
import api from "../../api/api";
import Block from "../block/Block";
import "./barChartHomePlanets.css";

const BarChartHomePlanets = () => {
  const planetsNames = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];
  const [planetDetail, setPlanetDetail] = useState([]);
  useEffect(() => {
    (async () => {
      let count = 0,
        i = 1,
        planetData,
        planetNameIndex;
      const { data } = await api.get("planets");
      let numOfPlanets = data.count;
      while (planetsNames.length > 0 && numOfPlanets > count) {
        planetData = await api.get(`planets/?page=${i}`);
        count = planetData.data.results.length;
        i++;
        for (let index = 0; data.results.length > index; index++) {
          planetNameIndex = planetsNames.findIndex(
            (planetName) => planetName === data.results[index].name
          );

          if (planetNameIndex !== -1) {
            planetsNames.splice(planetNameIndex, 1);
            setPlanetDetail((prevState) => [
              ...prevState,
              {
                planetName: data.results[index].name,
                population: data.results[index].population,
              },
            ]);
          }
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
