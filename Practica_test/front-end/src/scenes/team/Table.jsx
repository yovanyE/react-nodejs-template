import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

const Table = ({ colors, selectedRows, typeServices, handleRowSelection, columns }) => {
  return (
  <Box
    m="40px 0 0 0"
    height="75vh"
    sx={{
      "& .MuiDataGrid-root": {
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
      },
      "& .name-column--cell": {
        color: colors.greenAccent[300],
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: colors.blueAccent[700],
        borderBottom: "none",
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: colors.primary[400],
      },
      "& .MuiDataGrid-footerContainer": {
        borderTop: "none",
        backgroundColor: colors.blueAccent[700],
      },
      "& .MuiCheckbox-root": {
        color: `${colors.greenAccent[200]} !important`,
      },
    }}
  >
    <DataGrid checkboxSelection
    rows={typeServices} 
    columns={columns} 
    selectionModel={selectedRows}
    onRowSelectionModelChange={handleRowSelection}
    getRowId={(row) => row.idtiposervicio} // Use getRowId to specify the id
    />
  </Box>
  );
};

export default Table;
