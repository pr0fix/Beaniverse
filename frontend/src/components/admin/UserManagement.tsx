import { Box, Button, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { User } from "../../utils/types";
import {
  initializeUsers,
  removeUser,
  updateUser,
} from "../../reducers/userReducer";
import EditUserForm from "./EditUserForm";

const paginationModel = { page: 0, pageSize: 5 };

const UserManagement = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  const rows = users.users.map((user) => ({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  }));

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(removeUser(id));
      await dispatch(initializeUsers());
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleEditUser = async (userData: Partial<User>) => {
    if (selectedUser) {
      if (
        window.confirm(
          `Are you sure you want to edit user with id: "${userData.id}"`
        )
      ) {
        await dispatch(updateUser(selectedUser.id, userData));
        await dispatch(initializeUsers());
      }
    }
  };

  const cols: GridColDef[] = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "role", headerName: "Role", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            className="bg-primary-main mr-2"
            onClick={() => handleEditClick(params.row)}
          >
            Edit user
          </Button>
          <Button
            variant="contained"
            className="bg-red-900"
            onClick={() => handleDeleteUser(params.row.id)}
          >
            Delete user
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box className="m-8 p-3 bg-neutral-100 rounded-md">
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
      {selectedUser && (
        <EditUserForm
          open={editOpen}
          onClose={() => {
            setEditOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={handleEditUser}
          user={selectedUser as User}
        />
      )}
    </Box>
  );
};
export default UserManagement;
