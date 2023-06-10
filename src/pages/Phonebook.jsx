import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PersonList from "../components/PersonList";
import PersonForm from "../components/PersonForm";

function Phonebook({ user, persons, setPersons, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedPhonebookUser");
    setUser(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl mb-4 text-center font-bold">Phonebook</h1>

      {user && (
        <>
          <PersonList persons={persons} setPersons={setPersons} />
          <PersonForm persons={persons} setPersons={setPersons} />
        </>
      )}

      <p className="flex justify-between items-center text-sm">
        {user?.name} is logged in{" "}
        <button
          onClick={handleLogout}
          className="bg-red-500 p-2 text-white font-bold"
        >
          Logout
        </button>
      </p>
    </div>
  );
}

export default Phonebook;
