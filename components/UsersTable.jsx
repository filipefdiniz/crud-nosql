import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useGetUser } from "@/hooks/useGetUsers";
import DeleteUserModal from "@/modals/DeleteUserConfirmationModal";
import UpdateUserModal from "@/modals/UpdateUserModal";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function UsersTable() {
  const { data: users, isFetching: isFetching } = useGetUser();

  return (
    <>
      <Box sx={{backgroundColor: 'white', p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
        <Typography variant="h4" sx={{fontWeight: 'bold', color:"#192C3D", mb: 4}}>LISTA DE CADASTRO</Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
        {users &&
          users.map((user) => (
            <Box key={user._id} sx={{backgroundColor: '#192C3D', p: 4, borderRadius: '15px', width: '550px'}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6" color={"#00ED64"}>
                  ID: {user._id}
                </Typography>
                <Box sx={{display: 'flex', gap: '5px'}}>
                <UpdateUserModal user={user} />
                <DeleteUserModal userId={user._id} />
                </Box>
              </Box>
              <Box sx={{display: 'flex', gap: '5px'}}>
                <Typography color={"#00ED64"}>Nome:</Typography>
                <Typography color={"white"}>{user.nome}</Typography>
              </Box>
              <Box sx={{display: 'flex', gap: '5px'}}>
                <Typography color={"#00ED64"}>Email:</Typography>
                <Typography color={"white"}>{user.email}</Typography>
              </Box>
              <Box sx={{display: 'flex', gap: '5px'}}>
                <Typography color={"#00ED64"}>Telefone:</Typography>
                <Typography color={"white"}>{user.telefone}</Typography>
              </Box>
              <Box sx={{display: 'flex', gap: '5px'}}>
                <Typography color={"#00ED64"}>Idade:</Typography>
                <Typography color={"white"}>{user.idade}</Typography>
              </Box>
            </Box>
          ))}
          </Box>
      </Box>
    </>
  );
}
