import React from "react";
import Accordion from "./Accordion.jsx";
import Search from "./Search.jsx";
import Dropdown from "./Dropdown.jsx";
import axios from "axios";

const getWikiInfo = async (word) => {
  const data = await axios.get("https://en.wikipedia.org/w/api.php", {
    params: {
      action: "query",
      list: "search",
      format: "json",
      origin: "*",
      srsearch: word,
    },
  });
  return data.data.query.search;
};
const dataAccardion = [
  {
    savol: "React zormi",
    javob: "React kaneshna",
  },
  {
    savol: "Html zormi",
    javob: "Html yaxshi",
  },
  {
    savol: "Css zormi",
    javob: "Css udar",
  },
];
const dataDropdown = [
  {
    label: "The Color Red",
    value: "red",
  },
  {
    label: "The Color Green",
    value: "green",
  },
  {
    label: "The Color Blue",
    value: "blue",
  },
];
const App = () => {
  return (
    <div>
      <Search getInfo={getWikiInfo} />
    </div>
  );
};
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         <Accordion data={dataAccardion} />
//       </div>
//     );
//   }
// }

export default App;
