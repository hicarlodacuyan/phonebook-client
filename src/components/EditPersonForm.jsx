import { useState, useRef, useContext } from "react";
import PersonContext from "../features/PersonContext";
import personService from "../services/personService";

function EditPersonForm({
  person,
  onCancel,
  newPhoto,
  setNewPhoto,
  setLoading,
}) {
  const { persons, setPersons } = useContext(PersonContext);
  const [newPerson, setNewPerson] = useState(person);
  const { id, name, number } = newPerson;
  const fileInputRef = useRef(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedPerson = new FormData();
    updatedPerson.append("name", name);
    updatedPerson.append("number", number);
    newPhoto ? updatedPerson.append("image", newPhoto) : null;

    personService
      .updatePerson(id, updatedPerson)
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person
          )
        );

        setNewPhoto(null);
        onCancel();
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const onChange = (e) => {
    setNewPerson((prevPerson) => ({
      ...prevPerson,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      className="flex flex-col gap-4 p-4 border-solid border-2 border-slate-500"
      onSubmit={handleUpdate}
    >
      <div className="flex flex-col">
        <label>Upload new contact photo?</label>
        <input
          className="border-solid border-2 border-slate-500 p-2"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setNewPhoto(e.target.files[0])}
        />
      </div>
      <div className="flex flex-col">
        <label>Name</label>
        <input
          className="border-solid border-2 border-slate-500 p-2"
          type="text"
          value={name}
          name="name"
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col">
        <label>Phone Number</label>
        <input
          className="border-solid border-2 border-slate-500 p-2"
          type="text"
          value={number}
          name="number"
          onChange={onChange}
        />
      </div>
      <button className="bg-slate-500 py-2 text-white font-bold" type="submit">
        Save
      </button>
      <button
        className="bg-slate-500 py-2 text-white font-bold"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}

export default EditPersonForm;
