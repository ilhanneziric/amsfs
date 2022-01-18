import './styles/danKartica.scss';

const DanKartica = ({broj, disabled, neaktuelni}) => {
    return (
        <div className="bodyDan">
            {
                disabled==="false"?
                <div className="bodyDanUnDisabled">{broj}</div>:
                neaktuelni==="true"?
                <div className="bodyDanDisabledNeAktualni">{broj}</div>:
                <div className="bodyDanDisabled">{broj}</div>
            }
        </div>
    )
}

export default DanKartica
