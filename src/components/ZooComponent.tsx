import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";

export function ZooComponent() {

    const [animalsInZoo, setAnimalsInZoo] = useState<IAnimal[]>([]);

    useEffect(()=>{

        let setAnimalsInZooSerialized: string = localStorage.getItem("animalsInZoo") || "[]";
        let setAnimalsInZooDeSerialized = JSON.parse(setAnimalsInZooSerialized);

        // for (let i = 0; i < setAnimalsInZooDeSerialized.length; i++) {
        //     const animal:IAnimal = setAnimalsInZooDeSerialized[i];

        //     if (animal.isFed) {
        //         let hours = Math.abs(animal.lastFed - animal.lastFed) / 36e5;
        //     }
            
        // }
        setAnimalsInZoo(setAnimalsInZooDeSerialized)

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
        <div>{listOfAnimals}</div>
    </>)
}