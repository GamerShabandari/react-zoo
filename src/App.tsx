
import './App.css';
import { ZooComponent } from './components/ZooComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { AnimalDetailsComponent } from './components/AnimalDetailsComponent';
import axios from 'axios';
import { IAnimal } from './models/IAnimal';
import { useEffect } from 'react';

function App() {

  useEffect(() => {

    let animalsListSerialized: string = localStorage.getItem("animalsInZoo") || "[]";
    if (animalsListSerialized === "[]") {
      console.log("här fanns inget, vi hämtar från API");

      axios.get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then(response => {
          localStorage.setItem("animalsInZoo", JSON.stringify(response.data));
        })
    }

  }, [])


  return (

    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>Välkommen till ditt Zoo</h1>
        </nav>
        <Routes>
          <Route path='/' element={<ZooComponent></ZooComponent>}></Route>
          <Route path="/details/:id" element={<AnimalDetailsComponent></AnimalDetailsComponent>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
