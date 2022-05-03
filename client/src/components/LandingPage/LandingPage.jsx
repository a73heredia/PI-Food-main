import React from "react";
import { Link } from "react-router-dom";
import Title3 from "./dishes.png";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="divLand">
      <Link to="/home">
        <img src={Title3} alt="logo" width={600} height={200} />
      </Link>
      <br />
      <h5>Developed by Ale!!</h5>
    </div>
  );
}

export default LandingPage;
