import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

const RecipeDetails = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const params = useParams();

  const fetchDetails = async () => {
    const resp = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=8d7bc862bab84dd3996228c3f668ea71`
    );
    const data = await resp.json();
    return data;
  };
  useEffect(() => {
    let isMounted = true;

    fetchDetails().then((data) => {
      if (isMounted) setDetails(data);
    });
    return () => {
      isMounted = false;
    };
  }, [params.id]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink to={"/"} className="navbar-brand" href="#">
            Wobot
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to={"/"} className="btn-primary">
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container text-center">
        <h2 className="fst-italic">{details.title}</h2>
        <img
          className="img-fluid rounded"
          src={details.image}
          alt={details.title}
        />
      </div>
      <div className="text-center">
        <button
          style={{
            color: "white",
            backgroundColor: "blue",
            borderRadius: "5px",
            margin: "5px",
          }}
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </button>
        <button
          style={{
            color: "white",
            backgroundColor: "blue",
            borderRadius: "5px",
            margin: "5px",
          }}
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </button>
      </div>
      {activeTab === "ingredients" && (
        <div className="container d-flex flex-column">
          <ul>
            {details.extendedIngredients.map(({ id, original }) => (
              <li className="fs-3" key={id}>
                {original}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "instructions" && (
        <div>
          <p
            className="fs-5"
            dangerouslySetInnerHTML={{ __html: details.summary }}
          ></p>
          <p
            className="fs-5"
            dangerouslySetInnerHTML={{ __html: details.ins2ructions }}
          ></p>
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
