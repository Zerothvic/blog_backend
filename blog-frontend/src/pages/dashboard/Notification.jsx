import { useEffect,useState } from "react";
import API from "../../services/api";

function Notifications(){

  const [notifications,setNotifications] = useState([]);

  useEffect(()=>{

    const fetchNotifications = async ()=>{

      const res = await API.get("/notifications");

      setNotifications(res.data);

    }

    fetchNotifications();

  },[])

  return(

    <div className="max-w-2xl mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {notifications.map(n => (

        <div
          key={n._id}
          className="border p-3 rounded mb-2"
        >
          {n.type} on your post
        </div>

      ))}

    </div>

  )

}

export default Notifications;
