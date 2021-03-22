//TECH IMPORTS 
import React, { useState } from "react";
import {
  useHistory,
  Link,
  Route
} from "react-router-dom";
//STYLING IMPORTS
import "./index.css";
//COMPONENT IMPORTS 
import useSignInHook from "./components/useSignInHook";
import EditForm from "./components/editForm";


//FUNCTIONAL COMPONENT START

const App = () => {


  const history = useHistory();

  //SLICES OF STATE

  const [people, setPeople] = useState([]);

  const [formValues, setFormValues, handleChange] = useSignInHook();

  const [editPerson, setEditPerson] = useState({
    firstName: "",
    lastName: "",
    date: "",
    id: ""
  });

  //HANDLES NEW SIGN IN SUBMISSION
  const handleSubmit = (event) => {
    event.preventDefault();
    setPeople([...people, formValues]);
    setFormValues({
      firstName: "",
      lastName: "",
      date: "",
      id: ""
    })
  };

  //HANDLES CLICK ON EDIT BUTTON WHICH PUSHES TO ROUTE FOR SPECIFICALLY EDITING LATEST FORMVALUES OBJECT

  const handleEditClick = (idToEdit) => {
    setEditPerson({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      date: formValues.date,
      id: idToEdit
    });

    history.push(`/edit/${idToEdit}`);
  };

  
  //IGNORE, SIMPLY TO DEPLOY OVER VERCEL BECAUSE IT TREATS WARNINGS AS ERRORS
  console.log(editPerson)
  //IGNORE, SIMPLY TO DEPLOY OVER VERCEL BECAUSE IT TREATS WARNINGS AS ERRORS
  
  //BEGIN FUNCTIONAL COMPONENT RETURN
  return (
    <div className="frontPageCatchAll">
      <Route exact path="/">
        <Link to="/">Home</Link>
        <h1>Sign In Sheet</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">
            <input
              name="firstName"
              id="firstName"
              placeholder="Enter Your First Name"
              value={formValues.firstName}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="lastName">
            <input
              name="lastName"
              id="lastName"
              placeholder="Enter Your Last Name"
              value={formValues.lastName}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="date">
            <input
              name="date"
              id="date"
              placeholder="Enter The Date You Were Here"
              value={formValues.date}
              onChange={handleChange}
            />
          </label>
          <button>Submit to Sign In Sheet</button>
        </form>
        {people.map((person, index) => {
          return (
            <div key={index} className="personSignedIn">
              <p>
                Name: {person.firstName} {person.lastName}
              </p>
              <p>Signed In On {person.date}</p>
              <p>Was {index} In Line</p>
              <p>ID: {person.id}</p>
              <button onClick={() => handleEditClick(person.id)}>Edit</button>
            </div>
          );
        })}
      </Route>
      <Route exact path="/edit/:id">
        <EditForm
          people={people}
          setPeople={setPeople}
        />
      </Route>
    </div>
  );
};

export default App;
