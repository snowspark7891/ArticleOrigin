import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card/card";
import Loader from "./Loader";

function TopHeadlines() {
  //pagination is same as all-news , add another  constant params
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  let pageSize = 6; // fix the page size

  useEffect(() => {
    setIsLoading(true);
    setError(null); //retriving categories fron the header
    const categoryParam = params.category ? `&category=${params.category}` : "";
    fetch(
      `http://localhost:5000/topheadlines?language=en${categoryParam}&page=${page}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((response) => {
        console.log("response : ", response);
        if (response.sucess) {
          console.log(response); //return json response to the error
          setTotalResults(response.data.totalResults);
          setData(response.data.articles);
        } else {
          setError(response.message || "An error occurred");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error); //error handling
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, params.category]);

  if (error) {
    return (
      error && (
        <div className="text-red-500 mb-4 h-screen w-screen grid place-content-center">
          {error}
        </div>
      )
    );
  }
  return (
    <>
      {!isLoading ? (
        <div className="my-10 grid auto-rows-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.length > 0 ? (
            data.map((element, index) => (
              <Card
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
              />
            ))
          ) : (
            <p>No articles found for this category or criteria.</p>
          )}
        </div>
      ) : (
        <Loader />
      )}
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className="pagination-btn"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default TopHeadlines;
