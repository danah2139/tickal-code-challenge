import { useEffect, useState } from "react";
import api from "../../api/api";

const TableVehicleDetails = () => {
  const [MaxData, setMaxData] = useState({});
  useEffect(() => {
    (async () => {
      const { data } = await api.get("vehicles");
      const count = data.count;
      let maxPopulation = 0;
      let vehicleData, pilotsData, homeworldData;
      let i = 1;
      while (count > i) {
        let currentMax = 0;
        let currentVeicleDetail = {};
        try {
          vehicleData = await api.get(`vehicles/${i}`);
          //   console.log(vehicleData.data);
        } catch (error) {
          console.log(error);
        }
        if (vehicleData) {
          currentVeicleDetail = { vehicleName: vehicleData.data.name };
          let j = 0;
          while (j < vehicleData.data.pilots.length) {
            let pilotLink = vehicleData.data.pilots[j].replace(
              "https://swapi.dev/api/",
              ""
            );
            try {
              pilotsData = await api.get(pilotLink);
            } catch (error) {
              console.log(error);
            }
            if (pilotsData.data) {
              currentVeicleDetail = {
                ...currentVeicleDetail,
                pilotName: pilotsData.data.name,
              };
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
                  currentVeicleDetail = {
                    ...currentVeicleDetail,
                    homeworldName: homeworldData.data.name,
                    homeworldPopulatione: parseInt(
                      homeworldData.data.population
                    ),
                  };
                  //   console.log(homeworldData.data.population);
                  if (parseInt(homeworldData.data.population) > currentMax) {
                    currentMax = parseInt(homeworldData.data.population);
                  }
                }
              }
            }

            j++;
          }
        }
        if (maxPopulation < currentMax) {
          console.log(currentVeicleDetail);
          setMaxData(currentVeicleDetail);
          maxPopulation = currentMax;
        }
        i++;
      }
    })();
  }, []);
  const showMaxDetailes = () => {
    const display = [];
    for (let key in MaxData) {
      display.push(<td>{MaxData[key]}</td>);
    }
    return display;
  };
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th scope="col">Vehicle name</th>
            <th scope="col">pilot names</th>
            <th scope="col">home planets and their population</th>
          </tr>
        </thead>
        <tbody>
          <tr>{showMaxDetailes()}</tr>
        </tbody>
      </table>
    </div>
  );
};
export default TableVehicleDetails;
