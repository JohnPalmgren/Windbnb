import { useState } from "react";
import "./App.css";
import Properties from "./components/Properties";
import stays from "./components/stays";
import Logo from "./components/Logo";
import Search from "./components/Search";

function App() {
  const [numOfGuests, setNumOfGuests] = useState(0);
  const [location, setLocation] = useState();

  const changeLocation = (location) => {
    setLocation(location);
  };

  const changeGuests = (guests) => {
    setNumOfGuests(guests);
  };

  return (
    <div>
      <Logo />
      <Search
        changeLocation={changeLocation}
        changeGuests={changeGuests}
        propertyData={stays}
      />
      <Properties
        location={location}
        numOfGuests={numOfGuests}
        propertyData={stays}
      />
    </div>
  );
}

export default App;
