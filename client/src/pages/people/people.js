import React, { useContext } from "react";
import Header from "./../../components/header/header";
import PageFrame from "./../../components/page-frame/page-frame";
import NoResults from "./../../components/no-results/no-results";
import ErrorDisplay from "./../../components/error-display/error-display";
import { CircularProgress } from "@material-ui/core";
import PeopleList from "./../../components/people-list/people-list";
import { PeopleContext } from "./../../contexts/people.context";
// import { useToasts } from "react-toast-notifications";
// import useFetch from "react-fetch-hook";

function People() {
  const { people, loading, loaded, error, getPeople } = useContext(PeopleContext);
  console.log('people', people);
  if (!loaded) {
    getPeople();
  }
    return (
      <div className="App">
        <Header />
        <main>
          <PageFrame>
            <h1>People</h1>
            {loading && <CircularProgress />}
            {!loading && error && <ErrorDisplay error={error} />}
            {!loading && !error && people && people.length ? (
              <PeopleList people={people} title="People" level="h1" />
            ) : (
              <NoResults dataName="people" />
            )}
          </PageFrame>
        </main>
      </div>
    );
}

export default People;
