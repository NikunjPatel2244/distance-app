import logo from './logo.svg';
import './App.css';
import PlacesAutocomplete from './SearchLocation'

function App() {
  return (
    <div className="App">
     <PlacesAutocomplete/>
     <div id="msg">
       </div>
    </div>
  );
}

export default App;
