import { useState } from "react";
import "./App.css";
import PersonList from "./components/PersonList";
import PersonForm from "./components/PersonForm";
import loginService from "./services/loginService";
import personService from "./services/personService";

function App() {
  const [persons, setPersons] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    loginService
      .login({ username, password })
      .then((res) => {
        personService.setToken(res.token);
        setUser(res);
        setUsername("");
        setPassword("");
      })
      .catch((error) => console.log(error));
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin} className="bg-gray-500 p-4">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 p-2">
          Login
        </button>
      </form>
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl">Phonebook</h1>

      {user === null ? (
        loginForm()
      ) : (
        <>
          <h2>{user.name} is logged in</h2>
          <PersonList persons={persons} setPersons={setPersons} />
          <PersonForm persons={persons} setPersons={setPersons} />
        </>
      )}
    </div>
  );
}

export default App;
