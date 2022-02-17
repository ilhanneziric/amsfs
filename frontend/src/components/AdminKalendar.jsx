import '../components/styles/adminHome.scss';
import { useSelector,useDispatch } from 'react-redux';
import { updAdminDan } from '../redux/actions/adminDanActions';
import { addAdminDani, removeAdminDani } from '../redux/actions/adminDaniActions';

const AdminKalendar = ({prosli, sadasnji, buduci, diskriminator}) => {
  const aktivann = useSelector(state => state.adminDan);
  const dispatch = useDispatch();
  const adminDani = useSelector(state => state.adminDani);
  const pronadji = (dannn) => {
    let pronasao = false;
    for (let i = 0; i < adminDani.length; i++) {
      if(adminDani[i]._id === dannn){
        pronasao = true;
      }
    }
    return pronasao;
  } 
  return (
    <div className="adminHomePage">
      <div className="nazivAdminDana">PON</div>
      <div className="nazivAdminDana">UTO</div>
      <div className="nazivAdminDana">SRI</div>
      <div className="nazivAdminDana">ČET</div>
      <div className="nazivAdminDana">PET</div>
      <div className="nazivAdminDana">SUB</div>
      <div className="nazivAdminDana">NED</div>
      {
          prosli.reverse().map((d,index)=>(<div className="notThatMonth" key={index}></div>))
      }
      {
         diskriminator === 1 ?
          sadasnji.map((d) => (
              d.disabled === "true" ? 
                (aktivann === d._id?
                  <div className="adminDan disabled disabledAktivan" key={d._id} onClick={() => dispatch(updAdminDan(d._id))}>{d.broj}</div>:
                  <div className="adminDan disabled" key={d._id} onClick={() => dispatch(updAdminDan(d._id))}>{d.broj}</div>):
                (aktivann === d._id?
                  <div className="adminDan adminDanAktivan" key={d._id} onClick={() => dispatch(updAdminDan(d._id))}>{d.broj}</div>:
                  <div className="adminDan" key={d._id} onClick={() => dispatch(updAdminDan(d._id))}>{d.broj}</div>)
          )):
          sadasnji.map((d) => (

            adminDani.length !== 0?
              (pronadji(d._id))?
                (<div className="adminDan adminDanAktivan" key={d._id} onClick={() => dispatch(removeAdminDani(d))}>{d.broj}</div>):
                (<div className="adminDan" key={d._id} onClick={() => dispatch(addAdminDani(d))}>{d.broj}</div>):
              (<div className="adminDan" key={d._id} onClick={() => dispatch(addAdminDani(d))}>{d.broj}</div>)
        ))
      }
      {
          buduci.map((d, index)=>(<div className="notThatMonth" key={index + 10000}></div>))
      }
  </div>);
};

export default AdminKalendar;
