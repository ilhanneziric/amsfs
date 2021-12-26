import { Link } from "react-router-dom"

const KategorijaScreen = () => {
    return (
        <div>
            kategorija
            <button><Link to='/tretman'>dalje</Link></button>
            <button><Link to='/'>nazad</Link></button>
        </div>
    )
}

export default KategorijaScreen
