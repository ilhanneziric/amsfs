import './styles/tretmanKartica.scss';

const TretmanKartica = ({naslov, opis, trajanje, cijena}) => {
    return (
        <div className='bodyTretmanKartice'>
            <div className="lijevo">
                <h2 className='naslovTretmanKartice'>{naslov}</h2>
                {
                    opis===""?
                    <p className='bezopisa'>bla</p>:
                    <p className='opis'>{opis}</p>
                }
            </div>
            <div className="desno">
                {
                    trajanje >= 60?
                        trajanje % 60 === 0 ?
                        <h2 className="trajanje">{Math.floor(trajanje/60)}h</h2>:
                        <h2 className="smanjenoTrajanje">{Math.floor(trajanje/60)}h {trajanje%60}min</h2>:
                    <h2 className="trajanje">{trajanje}min</h2>
                }
                <h2 className="cijena">{cijena}KM</h2>
            </div>
        </div>
    )
}

export default TretmanKartica
