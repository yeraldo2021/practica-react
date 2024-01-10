import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import { authService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const MiFormulario = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authService.loginService(data);
      window.localStorage.setItem("user", response.data.accessToken);
      navigate("/adverts");
    } catch (error) {
      setIsError(!isError);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Este campo es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Dirección de correo electrónico no válida",
            },
          }}
          render={({ field }) => (
            <>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                autoComplete="off"
                {...field}
              />
              {errors.email && (
                <span className="text-danger text-sm">
                  {errors.email.message}
                </span>
              )}
            </>
          )}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Contraseña</Form.Label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                className="mb-2"
                {...field}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </>
          )}
        />
        <span className="text-muted text-small">
          <Form.Check type="checkbox" label="Recordar contraseña" />
        </span>
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
      </Form.Group>

      <div className="mt-4">
        {isError ? (
          <div className="alert alert-danger">
            <span>Error, credenciales incorrectas</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </Form>
  );
};

export default MiFormulario;
