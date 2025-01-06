import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setDate] = useState([]);
  const [loading, setLoanding] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `HTTP error, this is my error handling haha! status: ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          setDate(data);
          setLoanding(false);
          setError(null);
        })
        .catch((error) => {
          setLoanding(false);
          setError(error.message);
        });
    }, 1000);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        The Fetched Method
      </h1>
      {/* error and loading */}
      {error && (
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-600">
            failed to load data
          </p>
        </div>
      )}
      {loading && (
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-600">Loading...</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {item.name}
            </h2>
            <p className="text-gray-600 mb-1 text-lg">
              <span className="font-semibold">Username:</span> {item.username}
            </p>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Email:</span> {item.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
