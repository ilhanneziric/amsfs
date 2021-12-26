import { Link } from "react-router-dom"

const TretmanScreen = () => {
    return (
        <div>
            tretman
            <button><Link to='/kalendar'>dalje</Link></button>
            <button><Link to='/kategorija'>nazad</Link></button>
        </div>
    )
}

export default TretmanScreen
