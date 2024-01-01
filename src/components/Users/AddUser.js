import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "../UI/Card.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegeInputRef = useRef();

  const [error, setError] = useState("");

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    const collegeName = collegeInputRef.current.value;

    if (
      enteredName.trim().length === 0 ||
      enteredUserAge.trim().length === 0 ||
      collegeName.trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age and college name",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid  age",
      });
      return;
    }

    props.onAddUser(enteredName, enteredUserAge, collegeName);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    collegeInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age(Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <label htmlFor="college_name">College Name</label>
          <input id="college_name" type="text" ref={collegeInputRef} />
          {/* <Button type="submit">Add User</Button> */}
          <button type="submit">Add</button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
