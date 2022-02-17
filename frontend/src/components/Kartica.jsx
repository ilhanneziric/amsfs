import './styles/kartica.scss';

const Kartica = ({imageURL, naslov}) => {
    return (
        <div className='bodyKartica'>
            <img src={imageURL} alt={naslov} className='ikonica'/>
            <p className='naslovKartice'>{naslov}</p>
        </div>
    )
}

export default Kartica
