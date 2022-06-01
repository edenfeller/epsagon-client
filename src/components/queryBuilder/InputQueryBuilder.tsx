import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { queryBody } from "../../types";
import "./styles.css";
import { Input, Stack } from "@mui/material";

interface props {
  index: number;
  func: (index: number, query: queryBody) => void;
}

const keyOptions = [
  "spanId",
  "parentSpanId",
  "operationName",
  "startTime",
  "duration",
  "tag",
  "log",
];
const stringQueryOptions = ["equals", "includes", "startsWith", "endsWith"];
const numberQueryOptions = ["equals", "above", "less"];
const logFieldsOptions = ["timestamp", "fields"];

const numberTypes = ["duration", "startTimes"];

const InputQueryBuilder = ({ index, func }: props) => {
  const [key, setKey] = useState("");
  const [tagKey, setTagKey] = useState("");
  const [query, setQuery] = useState("");
  const [params, setParams] = useState("");
  const [logsField, setLogsField] = useState("");
  const [logsFieldKey, setLogsFieldKey] = useState("");

  const handleParamsChange = (e: any) => {
    setParams(e.target.value);
  };

  const handleTagKeyChange = (e: any) => {
    setTagKey(e.target.value);
  };

  useEffect(() => {
    func(index, { key, tagKey, query, params });
  }, [key, tagKey, query, params, func, index]);

  return (
    <div className="queryBuilder__div">
      <div>
        <Stack direction="row" spacing={2}>
          <Autocomplete
            value={key}
            onChange={(event, newValue) => {
              setKey(newValue ?? "");
            }}
            id="keyInput"
            options={keyOptions}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Key" />}
          />
          {key === "tag" ? (
            <Input placeholder="Tag Key" onChange={handleTagKeyChange} />
          ) : (
            ""
          )}
          {key === "log" ? (
            <Autocomplete
              value={logsField}
              onChange={(event, newValue) => {
                setLogsField(newValue ?? "");
              }}
              id="LogField"
              options={logFieldsOptions}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Log Field" />
              )}
            />
          ) : (
            ""
          )}
          {logsField === "fields" ? (
            <Autocomplete
              value={logsFieldKey}
              onChange={(event, newValue) => {
                setLogsFieldKey(newValue ?? "");
              }}
              id="LogFieldKey"
              options={logFieldsOptions}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Log Field Key" />
              )}
            />
          ) : (
            ""
          )}
          <Autocomplete
            value={query}
            onChange={(event, newValue) => {
              setQuery(newValue ?? "");
            }}
            id="QueryInput"
            options={
              (numberTypes.includes(key) || logsField === 'timestamp')
                ? numberQueryOptions
                : stringQueryOptions
            }
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Query" />}
          />
          <Input placeholder="Params" onChange={handleParamsChange} />
        </Stack>
      </div>
    </div>
  );
};

export default InputQueryBuilder;
