import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";

export function ZooComponent() {

    const [animalsInZoo, setAnimalsInZoo] = useState<IAnimal[]>([]);

    useEffect(()=>{

        let setAnimalsInZooSerialized: string = localStorage.getItem("animalsInZoo") || "[]";
        setAnimalsInZoo(JSON.parse(setAnimalsInZooSerialized))

    },[])

    let listOfAnimals = animalsInZoo.map((animal, i) => {
        return (<div key={i}>
            <div><img src={animal.imageUrl} width="70px" alt={"image of " + animal.name} /></div>
            <div>{animal.name}</div>
            <div>{animal.shortDescription}</div>
            { animal.isFed && <div>är matad</div> }
            { animal.isFed && <div> matades senast: {animal.lastFed} </div> }
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