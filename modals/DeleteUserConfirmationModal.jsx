import { useDeleteUser } from "@/hooks/useDeleteUser";
import { Box, Button, CircularProgress, Dialog, Typography } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteUserModal({userId}) {
    
    const { handleDeleteUser, deleteUsersMutate } = useDeleteUser();
    const isLoading = deleteUsersMutate.isLoading
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const onSubmit = () => {
        handleDeleteUser(userId);
        handleClose();
      };
  
    return (
    <>
      <Button
        onClick={() => handleOpen()}
        sx={{ background: "#FF0505", color: "white" }}
      >
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 500,
            textAlign: "center",
            borderRadius: '15px'
          }}
        >
          <Typography variant="h5">Tem certeza que deseja excluir?</Typography>
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={() => handleClose()}
            sx={{ mt: 2, mr: 2 , backgroundColor: "#00ED64" }}
          >
            Cancelar
          </Button>
          <Button
            disabled={isLoading}
            variant="contained"
            color="secondary"
            onClick={onSubmit}
            endIcon={
              isLoading ? <CircularProgress color="inherit" size={20} /> : null
            }
            sx={{
              mt: 2,
              backgroundColor: "red",
              color: "#ffffff",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            Sim, Excluir
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
