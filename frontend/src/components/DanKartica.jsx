import './styles/danKartica.scss';

const DanKartica = ({broj, disabled}) => {
    return (
        <div className="bodyDan">
            {
                disabled==="true"?
                <div className="bodyDanDisabled">{broj}</div>:
                <div className="bodyDanUnDisabled">{broj}</div>
            }
        </div>
    )
}

export default DanKartica
