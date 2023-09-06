import { Button, Divider, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React from 'react'
import * as Yup from "yup";


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
const UpdClient = (props) => {
  const data=props?.data
  console.log("data==",data)
  return (
    <div>
    
<Formik
                initialValues={{
                    name: data.Name,
                    email: data.Email,
                    phone: data.Phone,
                    address: data.Address,
              
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
                        `http://localhost:3003/api/v1/client/updclient/${data.ID}`,
                        {
                          method: "PUT",
                          headers: {
                            "x-access-token": "token",
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(body),
  
                        }
                      );
                      const parseRes = await response.json();
                      if (parseRes.message == "Succesfully Updated") {
                        alert("Successfull");
                        
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
                    <Grid container spacing={4}>
                   <Grid item style={{ paddingBottom: "1.5%" }} sm={12}>
                   <Divider>
                  {" "}
                  <Typography style={{ fontWeight: "bold" }} variant="h3 ">
                   UpdateClient
                  </Typography>
                </Divider>
                <Grid item sm={2}>
                <Typography><b>Id:{data.ID}</b></Typography>

                </Grid>
                   
                   </Grid>
                      <Grid item sm={6}>
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
        
                      <Grid item sm={6}>
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
                      <Grid item sm={6}>
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
                  
                     
                      <Grid item sm={6}>
                        <TextField
                        className="inputRounded"
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
                        sx={{ display: "flex", justifyContent: "end",marginTop:"5%" }}
                      >
                        <Button type="submit" variant="contained" sx={{textTransform:'capitalize'}}>
                          Update
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
          
    </div>
  )
}

export default UpdClient