import { useEffect, useContext } from "react";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import PersonContext from "../features/PersonContext";
import personService from "../services/personService";

function PersonList({ setLoading, setEditPerson }) {
  const { persons, setPersons } = useContext(PersonContext);

  useEffect(() => {
    personService
      .getPersons()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const editPerson = (person) => {
    setEditPerson(person);
  };

  const deletePerson = (id) => {
    setLoading(true);
    personService
      .deletePerson(id)
      .then((_response) => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <ul className="border-solid border-2 border-slate-500 p-4">
      {persons.map((person) => (
        <li key={person.id} className="flex items-center justify-between">
          <span className="w-10">
            <img src={person.photoInfo.url} alt="Contact photo" />
          </span>
          {person.name} ({person.number})
          <div className="flex gap-2">
            <FaUserEdit
              className="hover: cursor-pointer"
              onClick={() => editPerson(person)}
            />
            <FaTrashAlt
              className="hover: cursor-pointer"
              onClick={() => deletePerson(person.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PersonList;
