import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    (async () => {
      if (!fetched) {
        try {
          const response = await fetch("/api/v1/people");
          const data = await response.json();
          console.log("data", data);
          setPeople(data);
        } catch (err) {
          console.log("error", err);
          setError(err);
        } finally {
          setFetched(true);
        }
      }
    })();
  }, [people, fetched]);

  const ErrorDisplay = (err) => (
    <p>
      <strong>There was an error: {err.message}</strong>
    </p>
  );
  const NoPeople = () => <p>There are no people</p>;
  const PeopleList = ({ people }) => (
    <ul>
      {people.map((person, i) => (
        <li key={person._id || i}>
          {person.firstname} {person.lastname} ({person.email})
        </li>
      ))}
    </ul>
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        {error && <ErrorDisplay error={error} />}
        {people.length ? <PeopleList people={people} /> : <NoPeople />}
      </main>
    </div>
  );
}

export default App;
