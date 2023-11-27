import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // localStorage.setItem("name", "Freddy");

  const submit = (data) => {
    console.log(data);
    axios()
      .post("/users/login/", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Credenciales incorrectas");
        }
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit(submit)} style={{maxWidth: "700px", margin: '0 auto'}}>
      <h1 className='mb-4'>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
