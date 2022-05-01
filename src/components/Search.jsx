import React, { useState, useEffect } from "react";
const Search = (props) => {
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
  //  ikkinchi usuli bu har safar nimadir ozgarish bolganda ishlab ketadi

  // useEffect(()=>{
  //   console.log("useEffectni uchinchi korinishi");
  // },[term]);
  // bunda useEffect faqat massiv ichidagi berib qoygan ozigaruvchi ozgarsagina ishlaydi

  useEffect(() => {
    const chiqar = async () => {
      let d = await props.getInfo(term);
      setResults(d);
    };
    const timer = setTimeout(() => {
      if (term) {
        chiqar();
      } else if (!term && results.length) {
        setResults([]);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [term]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await axios.get("https://en.wikipedia.org/w/api.php", {
  //       params: {
  //         action: "query",
  //         list: "search",
  //         format: "json",
  //         origin: "*",
  //         srsearch: term,
  //       },
  //     });

  //     setResults(data.data.query.search);
  //   };
  //   const timer = setTimeout(() => {
  //     if (term) {
  //       getData();
  //     } else if (!term && results.length) {
  //       setResults([]);
  //     }
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [term]);

  // Biz apiga murojat qilayotgan funksiyan App ga otkazib qoyishimiz zarur
  // bu faylda yaratish unchalik togri yol emas shuning uchun Api ga murojat qilayotgan funksiyani
  // App filega otkazib bu komponentaga props qilib berib yubordik

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
