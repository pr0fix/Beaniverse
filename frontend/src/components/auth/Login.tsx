import { Button, Container, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { loginUser } from "../../reducers/authReducer";
import * as yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    dispatch(loginUser(values));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container maxWidth="xs" className="mt-20 bg-white rounded-md p-8">
        <Typography variant="h3" className="text-primary-dark mb-4">
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#6F4E37",
                    },
                  },
                }}
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#6F4E37",
                    },
                  },
                }}
              />
              <Button
                fullWidth
                className="bg-primary-main text-white font-bold"
                onClick={() => handleSubmit()}
              >
                Sign In
              </Button>
              <Link
                to="/signup"
                className="font-bold text-primary-main no-underline text-center"
              >
                <Typography className="font-bold pt-5">
                  Don't have an account? Sign up
                </Typography>
              </Link>
            </div>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default Login;
