import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { spanObject } from "../../types";

interface props {
  spanList: spanObject[];
}

const columns: GridColDef[] = [
  { field: "spanId", headerName: "Id", type: "number", width: 200 },
  {
    field: "parentSpanId",
    headerName: "Parent",
    type: "number",
    width: 200,
  },
  {
    field: "operationName",
    headerName: "Operation Name",
    width: 200,
  },
  {
    field: "references",
    sortable: false,
    headerName: "References",
    width: 200,
  },
  {
    field: "startTime",
    headerName: "Start Time",
    width: 200,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 200,
  },
  {
    field: "tags",
    sortable: false,
    headerName: "Tags",
    width: 200,
  },
  {
    field: "logs",
    sortable: false,
    headerName: "Logs",
    width: 200,
  },
];

const SpanList = ({ spanList }: props) => {
  const adapatSpanItemToTable = (item: spanObject) => {
    let newItem: any = item;
    newItem["id"] = item.spanId;
    newItem["references"] = JSON.stringify(item.references);
    newItem["tags"] = JSON.stringify(item.tags);
    newItem["logs"] = JSON.stringify(item.logs);
    return newItem;
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={spanList.map((item) => adapatSpanItemToTable(item as spanObject))}
        columns={columns}
      />
    </div>
  );
};

export default SpanList;
