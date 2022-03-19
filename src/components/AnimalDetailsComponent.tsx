import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { IAnimal } from "../models/IAnimal"

export function AnimalDetailsComponent() {

    const { id } = useParams()
    const [animalsList, setAnimalsList] = useState<IAnimal[]>([]);
    const [chosenAnimal, setChosenAnimal] = useState<IAnimal>();

    let thisAnimalsId: number = Number(id);

    useEffect(() => {
        let animalsListSerialized: string = localStorage.getItem("animalsInZoo") || "[]";
        setAnimalsList(JSON.parse(animalsListSerialized));

    }, []);

    useEffect(() => {

        localStorage.setItem("animalsInZoo", JSON.stringify(animalsList));

        if (!chosenAnimal) {

            for (let i = 0; i < animalsList.length; i++) {
                const animal = animalsList[i];

                if (animal.id === thisAnimalsId) {

                    console.log(animal);
                    setChosenAnimal(animal)

                }
            }
        }
    }, [animalsList, thisAnimalsId, chosenAnimal]);


    function feedAnimal(animalToFeed:IAnimal){

        animalToFeed.isFed = true
        
       setChosenAnimal(animalToFeed)
       console.log(chosenAnimal);
       
    }


    return (<>
        <div>AnimalDetails Works</div>
        <h1>id param is: {id}</h1>
        <h2>ditt djur är {chosenAnimal?.name}</h2>
        { chosenAnimal?.isFed === false && <button onClick={()=>{feedAnimal(chosenAnimal)}}>Mata djuret</button>}
        { chosenAnimal?.isFed === true && <div>nu är jag matad</div> }
        <Link to="/">Hem</Link>
        <br />
        <br />
        {chosenAnimal?.isFed}
    </>)
}