import './styles/terminKartica.scss';

const TerminKartica = ({termin}) => {
    return (
            <div>

                <div className="bodyTermin">{termin.sat}:{termin.minuta === 0 ? "00" : termin.minuta}</div>
            </div>
    )
}

export default TerminKartica
