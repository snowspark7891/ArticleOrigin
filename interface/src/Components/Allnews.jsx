import { React, useEffect, useState } from "react";
import Card from "./Card/card";
import Loader from "./Loader";

function AllNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  let pageSize = 12;

  //                for fetching the data from json to fronted    change effect
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`http://localhost:5000/all-news?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((myJson) => {
        if (myJson.sucess) {
          console.log("Response : ", myJson);
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        } else {
          console.log(myJson);
          setError(myJson.message || "An error occurred");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  if (error) {
    return (
      error && (
        <div className="text-red-500 mb-4 border h-screen w-screen grid place-content-center">
          {error}
        </div>
      )
    );
  }
  return (
    <>
      {!isLoading ? (
        <div className="my-10 grid auto-rows-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((element, index) => (
            <Card
              title={element.title}
              description={element.description}
              //   returing data elements of the cared along with properties
              imgUrl={element.urlToImage}
              publishedAt={element.publishedAt}
              url={element.url}
              author={element.author}
              source={element.source.name}
              key={index}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn text-center"
            onClick={handlePrev}
          >
            &larr; Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className="pagination-btn text-center"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </> //handleprevious page changes
  );
}

export default AllNews;
