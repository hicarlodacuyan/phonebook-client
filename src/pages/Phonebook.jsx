import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadingContext from "../features/LoadingContext";
import PersonList from "../components/PersonList";
import PersonForm from "../components/PersonForm";
import EditPersonForm from "../components/EditPersonForm";
import LoadingSpinner from "../components/LoadingSpinner";

function Phonebook({ user, setUser }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const [editPerson, setEditPerson] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedPhonebookUser");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 h-screen mx-4">
      <div className="flex-1">
        <h1 className="text-4xl mb-4 text-center font-bold">Phonebook</h1>
        <div>
          {user && (
            <>
              <PersonList
                setLoading={setLoading}
                setEditPerson={setEditPerson}
              />
              {editPerson ? (
                <EditPersonForm
                  person={editPerson}
                  newPhoto={newPhoto}
                  setNewPhoto={setNewPhoto}
                  setLoading={setLoading}
                  onCancel={() => setEditPerson(null)}
                />
              ) : (
                <PersonForm
                  newPhoto={newPhoto}
                  setNewPhoto={setNewPhoto}
                  setLoading={setLoading}
                />
              )}
            </>
          )}
        </div>
      </div>
      <p className="flex justify-between items-center text-sm my-4">
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
