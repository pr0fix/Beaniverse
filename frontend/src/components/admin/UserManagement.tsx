import { Paper } from "@mui/material";
import { useAppSelector } from "../../hooks/reduxHooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const cols: GridColDef[] = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "role", headerName: "Role", width: 200 },
];

const paginationModel = { page: 0, pageSize: 5 };

const UserManagement: React.FC = () => {
  const users = useAppSelector((state) => state.users);
  const rows = users.users.map((user) => ({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  }));
  return (
    <div className="m-8 p-3 bg-neutral-100 rounded-md">
      <Paper className="h-400, w-100">
        <DataGrid
          rows={rows}
          columns={cols}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};
export default UserManagement;
