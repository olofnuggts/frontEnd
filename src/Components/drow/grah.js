import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";

function Graph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/getalldata");
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <div>
      {" "}
      <ul>
        {data.map((payload) => (
          <li key={payload.counter}>
            {" "}
            humidity is {payload.humidity} <br /> temperature is :{" "}
            {payload.temperature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Graph;
