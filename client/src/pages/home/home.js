import React from "react";
import Header from "./../../components/header/header";
import PageFrame from "./../../components/page-frame/page-frame";

function Home() {
  return (
    <div className="App">
      <Header />
      <main>
        <PageFrame>
          <h1>Homepage</h1>
          <p>This is a basic boilerplate react full-stack app</p>
          <h2>Instructions</h2>
          <p>
            This app allows you to enter people's details and then list tasks
            (todos) against them.
          </p>
          <p>
            There are 6 other pages (not counting the 404 page). These will
            allow you to:
          </p>
          <ul
            className="typographic"
            style={{
              fontWeight: "bold",
              maxWidth: "40%",
              textAlign: "left",
              margin: "auto",
            }}
          >
            <li>
              List people{" "}
              <span
                style={{
                  // display: "block",
                  fontWeight: "normal",
                }}
              >
                (including the ability to delete and navigate to update pages)
              </span>
            </li>
            <li>Add people</li>
            <li
              style={{
                marginBottom: "15px",
              }}
            >
              Update people
            </li>
            <li>
              List tasks{" "}
              <span
                style={{
                  // display: "block",
                  fontWeight: "normal",
                }}
              >
                (including the ability to delete and navigate to update pages)
              </span>
            </li>
            <li>Add tasks</li>
            <li>Update tasks</li>
          </ul>
        </PageFrame>
      </main>
    </div>
  );
}

export default Home;
