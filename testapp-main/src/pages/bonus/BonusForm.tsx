import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import MuiTextField from "../../components/MuiTextField";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// create schema validation
const schema = yup.object({
  id: yup.number().required("id is required"),
  employeeId: yup.object().required("employeeId is required"),
  companyId: yup.object().required("companyId is required"),
  amount: yup.number().required("amount is required"),
});

const BonusForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params && params?.id) {
      axios
        .get(`http://localhost:8081/api/getAllBonus/${params?.id}`)
        .then((response) => {
          reset(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      id: "id",
      name: "employeeId",
      description: "companyId",
      barcode: "amount",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (!params?.id) {
      //an einai kainouria eggrafi, kanoume post
      fetch(`http://localhost:8081/api/bonus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate(`/bonus/${data?.id}`);
          toast.success("created!");
        });
    } else {
      // alliws update
      fetch(`http://localhost:8081/api/updateBonus/${params?.id}`, {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          console.log("test");
          toast.info("updated!");
        });
    }
  };

  return (
    <div>
      <h1>Bonus Form</h1>
      <Box
        sx={{
          width: "200px",
        }}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <MuiTextField
            errors={errors}
            control={control}
            name="id"
            label="ID"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="employeeId"
            label="EMPLOYEEID"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="companyId"
            label="COMPANYID"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="amount"
            label="AMOUNT"
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default BonusForm;
