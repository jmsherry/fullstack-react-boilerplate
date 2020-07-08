import React from "react";
import PageFrame from "./../../components/page-frame/page-frame";
import Header from "./../../components/header/header";
import PersonForm from './../../components/forms/person-form/person-form';

function AddPeople() {
  return (
    <div className="App">
      <Header />
      <main>
        <PageFrame>
          <h1>Add People</h1>
          <PersonForm />
        </PageFrame>
      </main>
    </div>
  );
}

export default AddPeople;
