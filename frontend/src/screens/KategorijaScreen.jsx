import { Link, useParams } from "react-router-dom"

const KategorijaScreen = () => {
    const params = useParams();
    return (
        <div>
            kategorija: {params.id}
            <button><Link to='/tretman'>dalje</Link></button>
            <button><Link to='/'>nazad</Link></button>
        </div>
    )
}

export default KategorijaScreen
