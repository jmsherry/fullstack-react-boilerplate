import React, { createContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex

export const PeopleContext = createContext({
  fetchPeople: () => [],
  addPerson: () => {},
  updatePerson: () => {},
  deletePerson: () => {},
  loaded: false,
  loading: false,
  error: null,
  people: [],
});

export const PeopleProvider = (props) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  // const [search, setSearch] = useState("");
  const { addToast } = useToasts();

  const fetchPeople = async () => {
    // console.log('loading', loading);
    // console.log('error', error);
    if (loading || loaded || error) {
      return;
    } else {
      setLoading(true);
    }
    try {
      const response = await fetch("/api/v1/people");
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      setPeople(data);
      // setLoading(false);
      // console.log('people from context', people);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoading(false);
      setLoaded('true')
    }
  };

  const addPerson = async (formData) => {
    try {
      const response = await fetch("/api/v1/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(formData),
      });
      if (response.status !== 201) {
        throw response;
      }
      const savedPerson = await response.json();
      console.log("got data", savedPerson);
      setPeople([...people, savedPerson]);
      addToast(`Saved ${savedPerson.firstName} ${savedPerson.lastName}`, {
        appearance: "success",
      });
    } catch (err) {
      console.log(err);
      addToast(`Error ${err.message || err.statusText}`, {
        appearance: "error",
      });
    }
  };

  const updatePerson = async (id, updates) => {
    let newPerson = null;
    try {
      const response = await fetch(`/api/v1/people/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(updates),
      });
      if (response.status !== 200) {
        throw response;
      }
      // Get index
      const index = people.findIndex((person) => person._id === id);

      // Get actual person
      const oldPerson = people[index];

      // Merge with updates
      newPerson = {
        // legit use of 'var', so can be seen in catch block
        ...oldPerson,
        ...updates, // order here is important for the override!!
      };
      // recreate the people array
      const updatedPeople = [
        ...people.slice(0, index),
        newPerson,
        ...people.slice(index + 1),
      ];
      setPeople(updatedPeople);
      addToast(`Updated ${newPerson.firstName} ${newPerson.lastName}`, {
        appearance: "success",
      });
    } catch (err) {
      console.log(err);
      addToast(
        `Error: Failed to update ${newPerson.firstName} ${newPerson.lastName}`,
        {
          appearance: "error",
        }
      );
    }
  };

  const deletePerson = async (id) => {
    let deletedPerson = null;
    try {
      const response = await fetch(`/api/v1/people/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status !== 204) {
        throw response;
      }
      // Get index
      const index = people.findIndex((person) => person._id === id);
      deletedPerson = people[index];
      // recreate the people array without that person
      const updatedPeople = [
        ...people.slice(0, index),
        ...people.slice(index + 1),
      ];
      setPeople(updatedPeople);
      addToast(`Deleted ${deletedPerson.firstName} ${deletedPerson.lastName}`, {
        appearance: "success",
      });
    } catch (err) {
      console.log(err);
      addToast(
        `Error: Failed to update ${deletedPerson.firstName} ${deletedPerson.lastName}`,
        {
          appearance: "error",
        }
      );
    }
  };

  return (
    <PeopleContext.Provider
      value={{
        people,
        loading,
        error,
        fetchPeople,
        addPerson,
        updatePerson,
        deletePerson,
      }}
    >
      {props.children}
    </PeopleContext.Provider>
  );
};
