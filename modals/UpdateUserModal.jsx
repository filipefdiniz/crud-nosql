import { createUserSchema, inputFields } from "@/components/CreateUserForm";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';

export default function UpdateUserModal({ user }) {
  const { handleUpdateUser, updateUsersMutate } = useUpdateUser(user._id);
  const isLoading = updateUsersMutate?.isLoading;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      nome: user?.nome || "",
      email: user?.email || "",
      telefone: user?.telefone || "",
      cpf: user?.cpf || "",
      idade: user?.idade || "",
    },
    mode: "onBlur",
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit = (data) => {
    handleUpdateUser(data);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ background: "#00ED64", color: "white" }}
      >
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{p: 5, borderRadius: '15px'}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h5" sx={{fontWeight: 'bold'}}>EDITAR USUÁRIO</Typography>
            {inputFields?.map((campo) => {
              return (
                <TextField
                  key={campo.nameInput}
                  label={campo.nameInput}
                  type={campo.type}
                  {...register(campo.field)}
                />
              );
            })}
            
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#235160" }}
              endIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null
              }
            >
              Editar
            </Button>
            </Box>
          </form>
        </Box>
      </Dialog>
    </>
  );
}
