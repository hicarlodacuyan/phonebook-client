import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PersonContext from "./features/PersonContext";
import LoadingContext from "./features/LoadingContext";
import personService from "./services/personService";
import Phonebook from "./pages/Phonebook";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [user, setUser] = useState(null);
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPhonebookUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      personService.setToken(user.token);
    }
  }, []);

  return (
    <PersonContext.Provider value={{ persons, setPersons }}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Routes>
          <Route
            path="/"
            element={<Phonebook user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<LoginForm user={user} setUser={setUser} />}
          />
          <Route path="/register" element={<RegisterForm user={user} />} />
        </Routes>
      </LoadingContext.Provider>
    </PersonContext.Provider>
  );
}

export default App;
