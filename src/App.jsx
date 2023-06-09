import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import personService from "./services/personService";
import Phonebook from "./pages/Phonebook";
import LoginForm from "./components/LoginForm";

function App() {
  const [persons, setPersons] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPhonebookUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      personService.setToken(user.token);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Routes>
        <Route
          path="/"
          element={
            <Phonebook
              user={user}
              persons={persons}
              setPersons={setPersons}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginForm
              user={user}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              setUser={setUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
