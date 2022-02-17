import './styles/danKartica.scss';

const DanKartica = ({broj, disabled, neaktuelni}) => {
    return (
        <div className="bodyDan">
            {/* {

                //ovo je da budu razliciti neradni dani koji su u trenutnom mjesecu i dani u proslom i buducem mjesecu
                
                disabled==="false"?
                <div className="bodyDanUnDisabled">{broj}</div>:
                neaktuelni==="true"?
                <div className="bodyDanDisabledNeAktualni">{broj}</div>:
                <div className="bodyDanDisabled">{broj}</div>
            } */}

            {
                disabled==="false"?
                <div className="bodyDanUnDisabled">{broj}</div>:
                <div className="bodyDanDisabledNeAktualni">{broj}</div>
            }
        </div>
    )
}

export default DanKartica
