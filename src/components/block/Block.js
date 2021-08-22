const Block = ({ name, population }) => {
  //   console.log(name);
  return (
    <div className="block">
      {population}
      <div
        style={{ height: `${population / 10000000}px`, background: "blue" }}
      ></div>
      {name}
    </div>
  );
};
export default Block;
