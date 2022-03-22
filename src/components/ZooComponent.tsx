import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";

import "./ZooComponent.css";

export function ZooComponent() {

    const [animalsInZoo, setAnimalsInZoo] = useState<IAnimal[]>([]);

    useEffect(()=>{

        let setAnimalsInZooSerialized: string = localStorage.getItem("animalsInZoo") || "[]";
        let setAnimalsInZooDeSerialized = JSON.parse(setAnimalsInZooSerialized);

        setAnimalsInZoo(setAnimalsInZooDeSerialized)

    },[])

    let listOfAnimals = animalsInZoo.map((animal, i) => {

        let isVeryHungry: boolean = false;

        let timeSinceLastFed = new Date().getTime() - new Date(animal.lastFed).getTime();
        let hoursSinceFed = Math.floor(timeSinceLastFed / (1000 * 60 * 60));

        
        if (hoursSinceFed >= 4 ) {
            isVeryHungry = true;
            animal.isFed = false;
        }

        return (<div className="mainContainer" key={i}>
            <div><img src={animal.imageUrl} alt={"image of " + animal.name} /></div>
            <div className="name">{animal.name}</div>
            <div>{animal.shortDescription}</div>
            { animal.isFed && <div>är matad</div> }
            { animal.isFed && <div> matades senast: {animal.lastFed} </div> }
            { !animal.isFed && <div className="warning">är hungrig</div> }
            { isVeryHungry && <div className="warning">Jag har inte matats på över 4 timmar!!!</div> }
            <Link to={"/details/"+animal.id} className="btn">Detailjer</Link>
        </div>
        )
    })


    return (<>
        <div>{listOfAnimals}</div>
    </>)
}