const TableVehicleDetails = ({ MaxData }) => {
  const showMaxDetailes = () => {
    const display = [];
    if (MaxData) {
      display.push(<td>{MaxData["vehicleName"]}</td>);
      if (MaxData["pilots"] && MaxData["pilots"].length > 0) {
        MaxData["pilots"].forEach((element) => {
          display.push(<td>{element}</td>);
        });
      }

      for (let key in MaxData["planets"]) {
        display.push(
          <td>
            {key} : {MaxData["planets"][key]}
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
