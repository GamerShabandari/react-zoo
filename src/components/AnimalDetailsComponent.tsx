import { Link, useParams } from "react-router-dom"

export function AnimalDetailsComponent(){

    const { id } = useParams()

    return (<>
        <div>AnimalDetails Works</div>
        <h1>id param is: {id}</h1>
        <Link to="/">Hem</Link>
    </>)
}