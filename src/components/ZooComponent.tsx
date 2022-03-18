import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";

export function ZooComponent() {

    const [animalsInZoo, setAnimalsInZoo] = useState<IAnimal[]>([]);

    useEffect(() => {

        if (animalsInZoo.length > 0) return;

        axios.get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
            .then(response => {
                setAnimalsInZoo(response.data)
            })
    })

    console.log(animalsInZoo);

    let listOfAnimals = animalsInZoo.map((animal, i) => {
        return (<div key={i}>
            <div>{animal.name}</div>
            <Link to={"/details/"+animal.id}>Detailjer</Link>
        </div>
        )
    })


    return (<>
        <div>ZooComponent Works</div>

        <Link to="/details/111">Details 111 länk</Link>

        <div>{listOfAnimals}</div>
    </>)
}