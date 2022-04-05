import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { IAnimal } from "../models/IAnimal"

import "./AnimalDetailsComponent.css";

export function AnimalDetailsComponent() {

    let defaultAnimal: IAnimal = {
        id: 0,
        name: "",
        latinName: "",
        yearOfBirth: 1300,
        shortDescription: "",
        longDescription: "",
        imageUrl: "",
        medicine: "",
        isFed: false,
        lastFed: new Date()
    }

    const { id } = useParams();
    const [chosenAnimal, setChosenAnimal] = useState<IAnimal>(defaultAnimal);
    const [isVeryHungry, setIsVeryHungry] = useState(false)

    let thisAnimalsId: number = Number(id);
  

    useEffect(() => {
        let animalsListSerialized: string = localStorage.getItem("animalsInZoo") || "[]";
        let animalsListDeSerialized: IAnimal[] = JSON.parse(animalsListSerialized)

        for (let i = 0; i < animalsListDeSerialized.length; i++) {
            const animal = animalsListDeSerialized[i];

            if (animal.id === thisAnimalsId) {



                let timeSinceLastFed = new Date().getTime() - new Date(animal.lastFed).getTime();
                let hoursSinceFed = Math.floor(timeSinceLastFed / (1000 * 60 * 60));

                if (hoursSinceFed >= 4) {
                    setIsVeryHungry(true)
                    animal.isFed = false;
                } else if (hoursSinceFed >= 3) {

                    animal.isFed = false;

                }
                setChosenAnimal(animal)
            }
        }
    }, []);


    function feedAnimal(animalToFeed: IAnimal) {

        animalToFeed.isFed = true
        animalToFeed.lastFed = new Date();
        setIsVeryHungry(false)

        setChosenAnimal(animalToFeed)

        let animalsListSerialized: string = localStorage.getItem("animalsInZoo") || "[]";
        let animalsListDeSerialized: IAnimal[] = JSON.parse(animalsListSerialized)

        for (let i = 0; i < animalsListDeSerialized.length; i++) {
            const animal = animalsListDeSerialized[i];

            if (animal.id === chosenAnimal.id) {

                animalsListDeSerialized[i] = chosenAnimal;
            }

        }
        localStorage.setItem("animalsInZoo", JSON.stringify(animalsListDeSerialized));
        
    }

    return (<>

        <div className="animalContainer">

            <h2 className="name">{chosenAnimal.name}</h2>
            {!chosenAnimal.isFed && <h2 className="warning">Jag är hungrig</h2>}
            {isVeryHungry === true && <h1 className="warning">Det var mer än 4 timmar sedan jag blev matad sist!</h1>}
            <img className='animate__animated animate__heartBeat' src={chosenAnimal.imageUrl} width="400px" />
            <h3>Lite info om {chosenAnimal.name}</h3>
            <p>{chosenAnimal.longDescription}</p>
            <h4>Födelseår: {chosenAnimal.yearOfBirth}</h4>
            {chosenAnimal.isFed === false && <button className="btn" onClick={() => { feedAnimal(chosenAnimal) }}>Mata djuret</button>}
            {chosenAnimal.isFed === true && <div>nu är jag mätt och belåten, tack</div>}
            <Link to="/" className="btn">Hem</Link>

        </div>
    </>)
}