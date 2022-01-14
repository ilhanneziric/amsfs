import './styles/tretmanKartica.scss';

const TretmanKartica = ({naslov, opis, trajanje, cijena}) => {
    return (
        <div className='bodyTretmanKartice'>
            <div className="lijevo">
                <h2 className='naslovKartice'>{naslov}</h2>
                {
                    opis===""?
                    <p className='bezopisa'>bla</p>:
                    <p className='opis'>{opis}</p>
                }
            </div>
            <div className="desno">
                <h2 className="trajanje">{trajanje}min</h2>
                <h2 className="cijena">{cijena}KM</h2>
            </div>
        </div>
    )
}

export default TretmanKartica
