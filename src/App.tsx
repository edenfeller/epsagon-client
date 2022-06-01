import { useState } from "react";
import axios from "axios";
import InputQueryBuilder from "./components/queryBuilder/InputQueryBuilder";
import { queryBody, spanObject } from "./types";
import "./App.css";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SpanList from "./components/spanList/SpanList";

function App() {
  const [querysList, setQuerysList] = useState<queryBody[]>([
    { key: "", query: "", params: "" },
  ]);
  const [spansList, setSpansList] = useState<spanObject[]>([]);
  const [foundMessage, setFoundMessage] = useState("");

  const updateQuery = (index: number, query: queryBody) => {
    let newQuerys = querysList;
    newQuerys[index] = query;
    setQuerysList(newQuerys);
  };

  const handleSearchClick = async () => {
    const { data } = await axios.post(`http://127.0.0.1:8080/data/`, {
      querysList,
    });
    if (data.length === 0)
      setFoundMessage(`No results. Try a different query!`);
    setSpansList(data);
  };

  const handleAddQuery = () => {
    setQuerysList((querys) => [...querys, { key: "", query: "", params: "" }]);
  };

  return (
    <div className="App">
      <div className="app__input">
        <div className="app__headline">
          <h1>Spans Search</h1>
          <img height={80} src="/EpsagonLogo.png" alt="logo" />
        </div>
        <ul>
          {querysList.map((item, idx) => (
            <li key={idx}>
              <InputQueryBuilder index={idx} func={updateQuery} />
            </li>
          ))}
        </ul>
        <div className="buttonDiv">
          <Button variant="outlined" onClick={handleAddQuery}>
            AND
          </Button>
          <Button variant="contained" onClick={handleSearchClick}>
            Search
          </Button>
        </div>
        <div>
          <p>{foundMessage}</p>
        </div>
      </div>
      {spansList.length === 0 ? "" : <SpanList spanList={spansList} />}
    </div>
  );
}

export default App;
