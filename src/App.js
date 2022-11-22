import Login from "./components/Login";
import react, {useEffect} from 'react';
import { useStateProvider } from './utilities/StateProvider';
import { reducerCases } from "./utilities/Constants";
import Spotify from "./components/Spotify";


function App() {
  const [{token}, dispatch] = useStateProvider();
  useEffect(()=>{
   const hash = window.location.hash;
   if(hash){
    console.log("hash", hash)
     const token = hash.substring(1).split("&")[0].split("=")[1];
     dispatch({type: reducerCases.SET_TOKEN, token})
   }
  }, [token, dispatch])
  return (
    <div className="App">
      {
        token ? <Spotify /> : <Login />
      }

    </div>
  );
}

export default App;
