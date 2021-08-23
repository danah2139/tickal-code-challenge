import "./App.css";
import BarChartHomePlanets from "./components/barChartHomePlanets/BarChartHomePlanets";
import TableVehicleDetails from "./components/tableVehicleDetails/TableVehicleDetails";
import api from "./api/api";

import { useEffect, useState } from "react";

function App() {
  const [MaxData, setMaxData] = useState({});
  const [planets, setPlanets] = useState({});
  useEffect(() => {
    (async () => {
      const { data } = await api.get("vehicles");
      const numOfVehicles = data.count;
      let maxPopulation = 0;
      let vehicleData, pilotsData, homeworldData;
      let i = 1;
      let count = 0,
        sum,
        currentVeicleDetail;
      while (numOfVehicles > count) {
        sum = 0;
        currentVeicleDetail = {};
        try {
          vehicleData = await api.get(`vehicles/?page=${i}`);
        } catch (error) {
          console.log(error);
        }
        count += vehicleData.data.results.length;
        i++;
        for (let i = 0; i < vehicleData.data.results.length; i++) {
          currentVeicleDetail["vehicleName"] = vehicleData.data.results[i].name;
          let j = 0;
          while (
            vehicleData.data.results[i].pilots &&
            j < vehicleData.data.results[i].pilots.length
          ) {
            let pilotLink = vehicleData.data.results[i].pilots[j].replace(
              "https://swapi.dev/api/",
              ""
            );
            try {
              pilotsData = await api.get(pilotLink);
            } catch (error) {
              console.log(error);
            }

            if (pilotsData.data) {
              currentVeicleDetail["pilots"] = currentVeicleDetail["pilots"]
                ? [...currentVeicleDetail["pilots"], pilotsData.data.name]
                : [pilotsData.data.name];

              if (pilotsData.data.homeworld) {
                let homeworldLink = pilotsData.data.homeworld.replace(
                  "https://swapi.dev/api/",
                  ""
                );

                try {
                  homeworldData = await api.get(homeworldLink);
                } catch (error) {
                  console.log(error);
                }
                if (homeworldData) {
                  currentVeicleDetail["planets"] = {
                    ...currentVeicleDetail["planets"],
                    [homeworldData.data.name]: parseInt(
                      homeworldData.data.population
                    ),
                  };
                  //   console.log(homeworldData.data.population);
                  sum += parseInt(homeworldData.data.population);
                  setPlanets((prevState) => ({
                    ...prevState,
                    [homeworldData.data.name]: parseInt(
                      homeworldData.data.population
                    ),
                  }));
                }
              }
            }

            j++;
          }
          if (maxPopulation < sum) {
            console.log(planets);
            setMaxData(currentVeicleDetail);
            maxPopulation = sum;
          }
        }
      }
    })();
  }, []);
  return (
    <div>
      <TableVehicleDetails MaxData={MaxData} />
      <BarChartHomePlanets planets={planets} />
    </div>
  );
}

export default App;
