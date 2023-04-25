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
  name: yup.string().required("name is required"),
  surname: yup.string().required("surname is required"),
  email: yup.string().required("email is required"),
  startDate: yup.string().required("startDate is required"),
  vacationDays: yup.number().required("vacationDays is required"),
  salary: yup.number().required("salary is required"),
  employmentType: yup.string().oneOf(['part-time', 'full-time']).required("employmentType is required"),
  companyId: yup.number().required("companyId is required"),
});

const EmployeeForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  interface FormData{
    id: string;
    name: string;
    surname: string;
    email: string;
    startDate: string;
    vacationDays: string;
    salary: string;
    employmentType: string;
    companyId: string;

  }
  const [data, setData] = useState<FormData>({
    id: "",
    name: "",
    surname: "",
    email: "",
    startDate: "",
    vacationDays: "",
    salary: "",
    employmentType: "",
    companyId: "",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: data,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (params && params?.id) {
      axios
        .get(`http://localhost:8081/api/getAllEmployee/${params?.id}`)
        .then((response) => {
          reset(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [params?.id]);



  const onSubmit = (formData: FormData) => {
    if (!params?.id) {
      //an einai kainouria eggrafi, kanoume post
      fetch(`http://localhost:8081/api/employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate(`/employee/${data?.id}`);
          toast.success("created!");
        });
    } else {
      // alliws update
     fetch(`http://localhost:8081/api/updateEmployee/${params?.id}`, {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          setData(formData);
          console.log("test");
          toast.info("updated!");
        });
    }
  };

  return (
    <div>
      <h1>Employee Form</h1>
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
            name="name"
            label="NAME"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="surname"
            label="SURNAME"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="email"
            label="EMAIL"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="startDate"
            label="STARTDATE"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="vacationDays"
            label="VACATIONDAYS"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="salary"
            label="SALARY"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="employmentType"
            label="EMPLOYMENTTYPE"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="companyId"
            label="COMPANYID"
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

export default EmployeeForm;
