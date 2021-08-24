import getTableDetails from "./getTableDetails";
import { useEffect, useState } from "react";

const TableVehicleDetails = () => {
  const [maxData, setMaxData] = useState({});
  useEffect(() => {
    (async () => {
      setMaxData(await getTableDetails());
    })();
  }, []);
  const showMaxDetailes = () => {
    const display = [];
    if (maxData) {
      display.push(
        <td key={maxData["vehicleName"]}>{maxData["vehicleName"]}</td>
      );
      if (maxData["pilots"] && maxData["pilots"].length > 0) {
        maxData["pilots"].forEach((element) => {
          display.push(<td key={element}>{element}</td>);
        });
      }

      for (let key in maxData["planets"]) {
        display.push(
          <td key={key}>
            {key} : {maxData["planets"][key]}
          </td>
        );
      }
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
