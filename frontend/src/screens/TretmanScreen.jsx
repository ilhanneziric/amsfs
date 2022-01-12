import { Link, useParams } from "react-router-dom"

const TretmanScreen = () => {
    const params = useParams();
    // tretman {params.id}
    return (
        <div>
            <button><Link to='/kalendar'>dalje</Link></button>
            <button><Link to='/kategorija'>nazad</Link></button>
        </div>
    )
}

export default TretmanScreen
