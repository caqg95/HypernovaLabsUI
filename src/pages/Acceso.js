import React, { useState, useEffect, Fragment } from "react";
import {  Redirect } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Badge } from 'react-bootstrap';
import "../static/css/Login.css";


function Acceso() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();


  useEffect(() => {
    localStorage.clear();
    // eslint-disable-next-line
  }, []);

  function postLogin(values) {
    axios({
      method: "post",
      url: "Authenticate/Login",
      data: {
        password: values.password,
        username: values.username,
      },
    })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          toast.dismiss();
          setAuthTokens(result.data.token);
          localStorage.setItem("tok", result.data.token);
          localStorage.setItem("username", values.username);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + result.data.token;

          setLoggedIn(true);

        } else if (result.status === 400) {
          toast.error(
            result.errors[0].field + " " + result.errors[0].defaultMessage
          );
        } else toast.error(result.message);
      })
      .catch((e) => {
        console.log(e.response)
        if (e.response.data === "Network Error") {
          return toast.error("Error de Conexión", {
            duration: 6000,
          });
        }
        if (!e.status) {
          toast.error(e.response.data, { duration: 10000 });
        } else {
          toast.error(e.response.data, {
            duration: 6000,
          });
        }
      });
  }
  if (isLoggedIn) {
    return <Redirect to="/Home" />;
  }

  const Validaciones = Yup.object().shape({
    username: Yup.string().required("El usuario es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

  return (
    <Fragment>
      <Toaster />
      <div className="login-form">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            postLogin(values);
            setSubmitting(false);
          }}
          validationSchema={Validaciones}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <h2 className="text-center" style={{ marginBottom: 30 }}>Acceso</h2>
              <div className="form-group" style={{ marginBottom: 30 }}>
                <Field
                  className="form-control"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Usuario"
                  required
                ></Field>
                {errors.username && touched.username && (
                  <Badge bg="danger">{errors.username}</Badge>
                )}

              </div>
              <div className="form-group" style={{ marginBottom: 30 }}>
                <Field
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  required
                ></Field>
                {errors.password && touched.password && (
                  <Badge bg="danger">{errors.password}</Badge>
                )}
              </div>
              <div className="text-center form-group">
                <button type="submit" disabled={isSubmitting} className="login-btn btn btn-primary btn-block">Acceder</button>
              </div>
            </Form>
          )}
        </Formik>

      </div>

    </Fragment>
  );
}
export default Acceso;
