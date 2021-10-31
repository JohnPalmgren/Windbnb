import './App.css';
import Properties from "./components/Properties"
import stays from "./components/stays"
import Logo from "./components/Logo"
import Search from "./components/Search"

function App() {
  return (
    <div >
      {Logo}
      <Search />
      <Properties propertyData={stays} />
    </div>
  );
}

export default App;
