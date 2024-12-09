import React from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { loginUser } from "../../reducers/authReducer";
import * as yup from "yup";
import { Formik } from "formik";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    dispatch(loginUser(values));
  };

  return (
    <Container maxWidth="xs" className="mt-20">
      <Typography variant="h2" className="text-primary-dark">
        Sign In
      </Typography>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ username: "", password: "" }}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <div>
            <TextField
              fullWidth
              placeholder="Username"
              variant="outlined"
              onChange={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              className="my-2"
            />
            <TextField
              fullWidth
              placeholder="Password"
              type="password"
              variant="outlined"
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              className="my-2"
            />
            <Button
              fullWidth
              className="bg-primary-light text-white font-bold"
              onClick={() => handleSubmit()}
            >
              Sign In
            </Button>
          </div>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
