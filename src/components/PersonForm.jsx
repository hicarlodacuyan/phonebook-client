import { useState, useRef } from "react";
import personService from "../services/personService";

function PersonForm({ persons, setPersons }) {
  const [newPhoto, setNewPhoto] = useState(null);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const fileInputRef = useRef();

  const addPerson = (e) => {
    e.preventDefault();

    const newPersonData = new FormData();
    newPersonData.append("image", newPhoto);
    newPersonData.append("name", newPerson);
    newPersonData.append("number", newNumber);

    personService
      .createPerson(newPersonData)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewPhoto("");
        setNewPerson("");
        setNewNumber("");
        fileInputRef.current.value = null;
      })
      .catch((error) => console.log(error));
  };

  return (
    <form
      onSubmit={addPerson}
      className="flex flex-col gap-4 p-4 border-solid border-2 border-slate-500"
    >
      <div className="flex flex-col">
        <label>Upload contact photo</label>
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
          value={newPerson}
          onChange={(e) => setNewPerson(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label>Phone Number</label>
        <input
          className="border-solid border-2 border-slate-500 p-2"
          type="text"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <button className="bg-slate-500 py-2 text-white font-bold" type="submit">
        Add
      </button>
    </form>
  );
}

export default PersonForm;
