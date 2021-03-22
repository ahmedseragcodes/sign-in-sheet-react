//TECH IMPORTS 
import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
  Link,
} from "react-router-dom";

//END IMPORTS

//BEGIN FUNCTIONAL COMPONENT

const EditForm = (props) => {
  const history = useHistory();
  const params = useParams();

  const { people, setPeople } = props;

  const [editedFormValues, setEditedFormValues] = useState({
    firstName: "",
    lastName: "",
    date: "",
    id: ""
  });

  //LOADS VALUES TO BE EDITED UPON RENDER

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    people.map((per) => {
      // eslint-disable-next-line eqeqeq
      if (per.id == params.id) {
        setEditedFormValues({
          ...editedFormValues,
          firstName: per.firstName,
          lastName: per.lastName,
          date: per.date,
          id: per.id
        });
      }

    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people ]);

  //HANDLES CHANGES TO UPDATE SIGN IN VALUES
  const handleUpdateChange = (event) => {
    const { name, value, type, checked } = event.target;

    const valueToUse = type === "radio" ? checked : value;

    setEditedFormValues({
      ...editedFormValues,
      [name]: valueToUse
    });
  };

  //HANDLES SUBMISSION OF UPDATE SIGN IN VALUES
  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    setPeople(
      people.map((person) => {
        if (person.id === editedFormValues.id) {
          return editedFormValues;
        } else {
          return person;
        }
      })
    );
    history.push("/");
  };

  //BEGIN FUNCTIONAL COMPONENT RETURN
  return (
    <div className="frontPageCatchAll">
      <Link to="/">Home</Link>
      <form onSubmit={handleUpdateSubmit}>
        <label htmlFor="firstName">
          <input
            name="firstName"
            id="firstName"
            placeholder="Enter Your First Name"
            value={editedFormValues.firstName}
            onChange={handleUpdateChange}
          />
        </label>

        <label htmlFor="lastName">
          <input
            name="lastName"
            id="lastName"
            placeholder="Enter Your Last Name"
            value={editedFormValues.lastName}
            onChange={handleUpdateChange}
          />
        </label>

        <label htmlFor="date">
          <input
            name="date"
            id="date"
            placeholder="Enter The Date You Were Here"
            value={editedFormValues.date}
            onChange={handleUpdateChange}
          />
        </label>
        <button>Submit Update</button>
      </form>
    </div>
  );
};

export default EditForm;
