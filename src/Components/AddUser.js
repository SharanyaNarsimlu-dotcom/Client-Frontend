import React from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { CheckBox } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import { Box, Button, FormHelperText, Grid, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z]+$/, "Enter valid name")
      .required(),
    phone: Yup.string()
      .matches(/^[5-9]\d{9}$/, "Invalid phone number")
      .min(10)
      .max(10)
      .required("Mobile Number is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
      address: Yup.string()
      .matches(/^[A-Za-z]+$/, "Enter address")
      .required(),
    //  joindate: Yup.date().required("Enter JoinDate"),
    //  rdate: Yup.date().required("Enter ReleaveDate"),
  });

const AddUser = () => {
  let navigate = new useNavigate();

  // alert("fghjk")
  return (
    <div>
        <Grid container spacing={2}>
        <Grid item sm={1}></Grid>
        <Grid item sm={10}>
        <Box sx={{ border: "0.5px solid black", width: "130%"}}>
  <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          address: "",
    
        }}
        validationSchema={validationSchema}
        onSubmit={async (
          values,
          { setErrors, resetForm, setStatus, setSubmitting }
        ) => {
          console.log("formikobject", values);
          const body = {
            "name": values.name,
            "email": values.email,
            "phone": values.phone,
            "address":values.address
          };

          try {
            const response = await fetch(
              `http://localhost:3003/api/v1/client/addclient`,
              {
                method: "POST",
                headers: {
                  "x-access-token": "token",
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
              
              }
            );
            const parseRes = await response.json();
            if (parseRes.status == 200) {
              alert("Successfull");
               navigate(-1)
              window.location.reload();
            }
          } catch (error) {
            console.log(error.message);
            alert("not done!");
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          resetForm,
          touched,
          values,
        }) => (
          <form
            id="form1"
            className="info_container"
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={4} sx={{padding:"1%"}}>
           
              <Grid item sm={4}>
                <TextField
                  label="Enter Name"
                  margin="dense"
                  size="small"
                  fullWidth
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.name && errors.name)}
                />{" "}
                {touched.name && errors.name && (
                  <FormHelperText error id="name">
                    {errors.name}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item sm={4}>
                <TextField
                  label="Enter Email"
                  margin="dense"
                  size="small"
                  fullWidth
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.email && errors.email)}
                />{" "}
                {touched.email && errors.email && (
                  <FormHelperText error id="email">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item sm={4}>
                <TextField
                  label="Enter Phone"
                  margin="dense"
                  size="small"
                  fullWidth
                  value={values.phone}
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.phone && errors.phone)}
                />{" "}
                {touched.phone && errors.phone && (
                  <FormHelperText error id="phone">
                    {errors.phone}
                  </FormHelperText>
                )}
              </Grid>
          
             
              <Grid item sm={4}>
                <TextField
                  label="Enter Address"
                  margin="dense"
                  size="small"
                  fullWidth
                  value={values.address}
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.address && errors.address)}
                />{" "}
                {touched.address && errors.address && (
                  <FormHelperText error id="address">
                    {errors.address}
                  </FormHelperText>
                )}
              </Grid>
           
              <Grid
                item
                sm={12}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
  </Box>
</Grid>
<Grid item sm={1}></Grid>
</Grid>
    </div>
  )
}

export default AddUser