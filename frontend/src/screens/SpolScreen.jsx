import { Link } from "react-router-dom"

const SpolScreen = () => {
    return (
        <div>
            {/* naslov koji ce se non stop provlacit(npr nova narudba) style: lightblue slova sa sivim bottom borderom ili obrnuto*/}
            {/* pogledati kod merlinke  */}
            <button><Link to='/kategorija'>dalje</Link></button>
        </div>
    )
}

export default SpolScreen
