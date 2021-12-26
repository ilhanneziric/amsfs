import { Link } from "react-router-dom"

const KalendarScreen = () => {
    return (
        <div>
            kalendar
            <button><Link to='/termin'>dalje</Link></button>
            <button><Link to='/tretman'>nazad</Link></button>
        </div>
    )
}

export default KalendarScreen
