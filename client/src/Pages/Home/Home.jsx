import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts");
        if (!response || response.data === null) {
          setError("Data not given by the Server");
        } else {
          setData(response.data);
        }
      } catch (error) {
        setError("Error fetching data: " + error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = () => {
    console.log("done");
  };

  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <>
      <div className="bg-slate-500">
        <h1>{error}</h1>
        <h1 className="text-4xl text-center py-5 bg-red-500">Posts</h1>

        <Link
          className="w-full text-center d-flex justify-center text-blue-800 text-3xl"
          to="createpost"
        >
          CreatePost
        </Link>
        {data.map((value, index) => (
          <div
            className="card flex justify-center w-25 mx-auto my-4"
            key={index}
            onClick={() => handlePostClick(value.id)}
          >
            <div className="card-body text-center">
              <h1 className="py-4">{value.id}</h1>

              <h5 className="card-title bg-slate-600 text-white py-2 rounded-xl text-bold">
                {value.title}
              </h5>
              <p className="card-text bg-orange-300 py-7 text-center mb-2">
                {value.PostText}
              </p>
              <div className="card-name bg-green-300 py-6 text-center">
                {value.username}
              </div>
              <div className="pt-4">
                <button
                  className="btn btn-danger "
                  onClick={handleDelete}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
