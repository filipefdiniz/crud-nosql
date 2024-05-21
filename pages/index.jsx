import CreateUserForm from "@/components/CreateUserForm";
import UsersTable from "@/components/UsersTable";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100vh", backgroundColor: "#001E2B" }}
    >
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <CreateUserForm />
      </Box>
      <UsersTable />
    </Box>
  );
}
