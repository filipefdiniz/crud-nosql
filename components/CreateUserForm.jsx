import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import * as yup from "yup";
import { useCreateUser } from "@/hooks/useCreateUser";
import { getAllUsers } from "@/hooks/useGetUsers";
import styled from "styled-components";
import Image from "next/image";

export const inputFields = [
  {
    nameInput: "Nome",
    type: "text",
    field: "nome",
  },
  {
    nameInput: "Email",
    type: "email",
    field: "email",
  },
  {
    nameInput: "CPF",
    type: "text",
    field: "cpf",
  },
  {
    nameInput: "Idade",
    type: "number",
    field: "idade",
  },
  {
    nameInput: "Telefone",
    type: "tel",
    field: "telefone",
  },
];

export const createUserSchema = yup.object().shape({
  nome: yup.string().required("O campo nome é obrigatório"),
  email: yup.string().required("O campo email é obrigatório"),
  cpf: yup.string().required("O campo CPF é obrigatório"),
  idade: yup.number().positive(),
  telefone: yup.string().required("O campo telefone é obrigatório"),
});

export default function CreateUserForm() {
  const { handleCreateUser, createusersMutate } = useCreateUser();
  const isLoading = createusersMutate.isLoading;
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      idade: "",
    },
    mode: "onBlur",
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit = async (data) => {
    handleCreateUser(data);
    reset();
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#2E4050',
          display: "flex",
          flexDirection: "column",
          alignItems: 'center',
          gap: '20px',
          justifyContent: "center",
          p: 4,
          width: '350px',
          borderRadius: '10px',
          boxShadow: '0px 4px 4px #252c2d'
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img src="./mongodb.png" alt="mongodb" width={100} height={40} />
          <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
            CRUD
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {inputFields?.map((campo) => {
              return (
                <TextField
                  sx={{
                    width: "300px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                  key={campo.field}
                  label={campo.nameInput}
                  type={campo.type}
                  {...register(campo.field)}
                />
              );
            })}

            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#00ED64", fontWeight: 'bold', mt: 2 }}
              endIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null
              }
            >
              Cadastrar
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
