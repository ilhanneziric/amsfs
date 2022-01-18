import { Link, useParams } from "react-router-dom"

const PotvrdaScreen = () => {
    const params = useParams();
    return (
        <div>
            potvrda radi {params.sat} {params.minuta} {params.danid} {params.tretmanid} {params.ime} {params.telefon}
        </div>
    )
}

export default PotvrdaScreen
