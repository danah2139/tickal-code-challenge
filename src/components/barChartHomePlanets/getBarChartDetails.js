import api from "../../api/api";

const getBarChartDetails = async () => {
  const planetsNames = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];
  let count = 0,
    i = 1,
    planetData,
    planetNameIndex,
    planetDetail = [];
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
        planetDetail = [
          ...planetDetail,
          {
            planetName: data.results[index].name,
            population: data.results[index].population,
          },
        ];
      }
    }
  }
  return planetDetail;
};

export default getBarChartDetails;
