import React, { useState, useEffect } from "react";
import axios from "axios";
const Search = () => {
  const [term, setTerm] = useState("");

  const changeTerm = (e) => {
    setTerm(e.target.value);
  };

  const [results, setResults] = useState([]);

  // useEffect(() => {
  //   console.log("Use effectni birinchi korinishi");
  // }, []);

  // useEffect(() => {
  //   console.log("Use effectni ikkinchi korinishi");
  // });

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          format: "json",
          origin: "*",
          srsearch: term,
        },
      });

      setResults(data.data.query.search);
      // console.log(data.data.query.search);
    };
    const timer = setTimeout(() => {
      if (term) {
        getData();
      } else if (!term && results.length) {
        setResults([]);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [term]);

  const renderResults = () => {
    return results.map((val) => {
      return (
        <div key={val.pageid} className="ui message">
          <div className="header">{val.title}</div>
          <p dangerouslySetInnerHTML={{ __html: val.snippet }}></p>
          <a
            className="button ui green"
            href={`https://en.wikipedia.org/wiki?curid=${val.pageid}`}
          >
            Go page
          </a>
        </div>
      );
    });
  };

  return (
    <div className="ui container " style={{ marginTop: "40px" }}>
      <h1 style={{ textAlign: "center" }}>Wikipedia Searching</h1>
      <div className="ui input focus" style={{ width: "100%" }}>
        <input
          onChange={changeTerm}
          value={term}
          className="prompt"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div>{renderResults()}</div>
    </div>
  );
};
export default Search;
