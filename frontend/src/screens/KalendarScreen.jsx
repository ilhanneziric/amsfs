import { Link, useParams } from "react-router-dom"

const KalendarScreen = () => {
    const params = useParams();
    return (
        <div>
            kalendar {params.id}
            <button><Link to='/termin'>dalje</Link></button>
            <button><Link to='/tretman'>nazad</Link></button>
        </div>
    )
}

export default KalendarScreen
