import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import Photo from "./Photo";

const mainUrl = "https://api.unsplash.com/photos";
const searchUrl = `https://api.unsplash.com/search/photos/`;
const clientId = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const getPhotos = async () => {
    setLoading(true);
    let pageUrl = `&page=${page}`;
    let urlQuery = `&query=${query}`;
    let url;
    if (query) {
      url = `${searchUrl}${clientId}${pageUrl}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientId}${pageUrl}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      // console.log(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 10
    ) {
      setPage((oldPage) => oldPage + 1);
    }
  };

  useEffect(() => {
    const event = window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      return alert(`please neter something!`);
    }
    getPhotos();
    setPage(1);
  };

  useEffect(() => {
    getPhotos();
  }, [page]);

  return (
    <>
      <div className="form">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-input"
            placeholder="search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            <BsSearch />
          </button>
        </form>
      </div>
      <article className="images">
        {photos.map((image, index) => {
          return <Photo key={index} {...image} />;
        })}
      </article>
      <div className="error">{loading && <h2>loading...</h2>}</div>
    </>
  );
};

export default Home;
