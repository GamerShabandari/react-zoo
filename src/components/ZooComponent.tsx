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

    useEffect(()=>{
        let setAnimalsInZooSerialized: string = localStorage.getItem("animalsInZoo") || "[]";
        setAnimalsInZoo(JSON.parse(setAnimalsInZooSerialized));
    }, [])

    useEffect(()=>{

        localStorage.setItem("animalsInZoo", JSON.stringify(animalsInZoo));

    }, [animalsInZoo])


    let listOfAnimals = animalsInZoo.map((animal, i) => {
        return (<div key={i}>
            <div><img src={animal.imageUrl} width="70px" alt={"image of " + animal.name} /></div>
            <div>{animal.name}</div>
            <div>{animal.shortDescription}</div>
            { animal.isFed && <div>är matad</div> }
            { !animal.isFed && <div>är hungrig</div> }
            <Link to={"/details/"+animal.id}>Detailjer</Link>
        </div>
        )
    })


    return (<>
        <div>ZooComponent Works</div>

        <br />

        <div>{listOfAnimals}</div>
    </>)
}