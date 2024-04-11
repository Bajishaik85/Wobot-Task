import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=8d7bc862bab84dd3996228c3f668ea71"
      );
      if (!response.ok) {
        throw new Error("There is an issue with your network!");
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h5 className="text-center fs-4 m-2">Wobot Assignment By Baji Shaik</h5>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            <div className="row m-1">
              {data.results.map((item) => (
                <div className="col-3 ">
                  <div className="card m-1" style={{ width: "18rem" }}>
                    <img src={item.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h6 className="card-text">{item.title}</h6>
                      <NavLink
                        className="btn btn-primary"
                        to={`/rdetails/${item.id}`}
                      >
                        View Product
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ul>
        )}
      </div>
    </>
  );
};

export default Home;
