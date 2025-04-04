import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-area">
      <Card />
      <div className="add-form-link">
        <Link to={"/add-form"}>
          <span>Post Your Blog</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;
