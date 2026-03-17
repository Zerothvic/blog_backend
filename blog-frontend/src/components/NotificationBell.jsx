import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function NotificationBell(){

  const navigate = useNavigate();

  const [count,setCount] = useState(0);
  

  useEffect(()=>{

    const fetchNotifications = async ()=>{

      const res = await API.get("/notifications");

      const unread = res.data.filter(n => !n.read);

      setCount(unread.length);

    }

    fetchNotifications();

  },[])

  return(

    <div
  style={{position:"relative", cursor:"pointer"}}
  onClick={()=>navigate("/notifications")}
>


      🔔

      {count > 0 && (

        <span style={{
          position:"absolute",
          top:"-5px",
          right:"-10px",
          background:"red",
          color:"white",
          borderRadius:"50%",
          padding:"2px 6px",
          fontSize:"12px"
        }}>
          {count}
        </span>

      )}

    </div>

  )

}

export default NotificationBell;