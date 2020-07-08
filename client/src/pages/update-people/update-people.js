import React, { useContext, useEffect } from "react";
import PageFrame from "../../components/page-frame/page-frame";
import Header from "../../components/header/header";
import PersonForm from "../../components/forms/person-form/person-form";
import { useParams } from "react-router-dom";
import { PeopleContext } from "./../../contexts/people.context";

function UpdatePeople() {
  let { id } = useParams();
  const { people, loaded, fetchPeople } = useContext(
    PeopleContext
  );
  console.log("people", people);
  useEffect(() => {
    console.log("in useEffect", people, loaded);
    if (!loaded) {
      fetchPeople();
    }
  }, [loaded, fetchPeople, people]);

  console.log("people", people);
  const personToBeUpdated = people.find((person) => person._id === id);
  console.log("personToBeUpdated", personToBeUpdated);
  return (
    <div className="App">
      <Header />
      <main>
        <PageFrame>
          <h1>Update People</h1>
          <PersonForm initialValues={personToBeUpdated} />
        </PageFrame>
      </main>
    </div>
  );
}

export default UpdatePeople;
