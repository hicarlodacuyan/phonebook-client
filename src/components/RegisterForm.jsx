import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/userService";

function RegisterForm({ user }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) navigate("/");
  }, [user, navigate]);

  const handleRegistration = (e) => {
    e.preventDefault();

    userService
      .register({ name, username, password })
      .then((_res) => {
        navigate("/login");
        setName("");
        setUsername("");
        setPassword("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1 className="text-4xl mb-4 text-center font-bold">
        Register an account
      </h1>
      <form
        onSubmit={handleRegistration}
        className="m-4 p-4 flex flex-col gap-2 border-solid border-2 border-slate-500"
      >
        <div className="flex flex-col">
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-solid border-2 border-slate-500 p-2"
          />
        </div>
        <div className="flex flex-col">
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-solid border-2 border-slate-500 p-2"
          />
        </div>
        <div className="flex flex-col">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-solid border-2 border-slate-500 p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-slate-500 p-2 mt-2 text-white font-bold"
        >
          Register
        </button>
      </form>
      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login here.
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
