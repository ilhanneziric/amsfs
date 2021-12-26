import { Link } from "react-router-dom"

const TerminScreen = () => {
    return (
        <div>
            termin
            <button><Link to='/potvrda'>dalje</Link></button>
            <button><Link to='/kalendar'>nazad</Link></button>
        </div>
    )
}

export default TerminScreen
