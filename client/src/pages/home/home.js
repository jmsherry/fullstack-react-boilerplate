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
        </PageFrame>
      </main>
    </div>
  );
}

export default Home;
