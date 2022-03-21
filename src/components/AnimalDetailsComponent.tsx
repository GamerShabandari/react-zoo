import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { IAnimal } from "../models/IAnimal"

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
    const [testName, setTestName] = useState("kalle")

    let thisAnimalsId: number = Number(id);

    useEffect(() => {
        let animalsListSerialized: string = localStorage.getItem("animalsInZoo") || "[]";
        let animalsListDeSerialized: IAnimal[] = JSON.parse(animalsListSerialized)

        for (let i = 0; i < animalsListDeSerialized.length; i++) {
            const animal = animalsListDeSerialized[i];

            if (animal.id === thisAnimalsId) {

                console.log("du klickade på ", animal.name);
                setChosenAnimal(animal)
            }
        }
    }, []);


    function feedAnimal(animalToFeed: IAnimal) {

        animalToFeed.isFed = true
        animalToFeed.lastFed = new Date();

        setChosenAnimal(animalToFeed)
        console.log(chosenAnimal);

        let animalsListSerialized: string = localStorage.getItem("animalsInZoo") || "[]";
        let animalsListDeSerialized: IAnimal[] = JSON.parse(animalsListSerialized)

        for (let i = 0; i < animalsListDeSerialized.length; i++) {
            const animal = animalsListDeSerialized[i];

            if (animal.id === chosenAnimal.id) {

                animalsListDeSerialized[i] = chosenAnimal;
            }

        }
        localStorage.setItem("animalsInZoo", JSON.stringify(animalsListDeSerialized));
        setTestName("anka")
    }

    return (<>
        <div>AnimalDetails Works</div>
        <h2>{chosenAnimal.name}</h2>
        {!chosenAnimal.isFed && <h1>Jag är hungrig</h1>}
        <img src={chosenAnimal.imageUrl} width="400px" />
        <h3>Lite info om {chosenAnimal.name}</h3>
        <p>{chosenAnimal.longDescription}</p>
        <h4>Födelseår: {chosenAnimal.yearOfBirth}</h4>
        {chosenAnimal.isFed === false && <button onClick={() => { feedAnimal(chosenAnimal) }}>Mata djuret</button>}
        {chosenAnimal.isFed === true && <div>nu är jag mätt och belåten, tack</div>}
        <Link to="/">Hem</Link>
    </>)
}