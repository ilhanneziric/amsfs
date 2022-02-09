import '../components/styles/adminHome.scss';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { updAdminDan } from '../redux/actions/adminDanActions';

const AdminKalendar = ({prosli, sadasnji, buduci}) => {
  const aktivann = useSelector(state => state.adminDan);
  const dispatch = useDispatch();
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
          sadasnji.map((d) => (
              d.disabled === "true" ? 
                (aktivann === d._id?
                  <div className="adminDan disabled disabledAktivan" key={d._id} onClick={() => dispatch(updAdminDan(d._id))}>{d.broj}</div>:
                  <div className="adminDan disabled" key={d._id} onClick={() => dispatch(updAdminDan(d._id))}>{d.broj}</div>):
                (aktivann === d._id?
                  <div className="adminDan adminDanAktivan" key={d._id} onClick={() => dispatch(updAdminDan(d._id))}>{d.broj}</div>:
                  <div className="adminDan" key={d._id} onClick={() => dispatch(updAdminDan(d._id))}>{d.broj}</div>)
          ))
      }
      {
          buduci.map((d, index)=>(<div className="notThatMonth" key={index + 10000}></div>))
      }
  </div>);
};

export default AdminKalendar;
