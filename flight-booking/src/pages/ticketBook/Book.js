import { Button, InputLabel, TextField } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, firebaseDatabase } from "../../backend/firebaseHandler";
import './Book.css';

const TicketBook = () => {
  const nav = useNavigate();

  const [Flight, setFlight] = useState([]);
  const [ids,setIds] = useState([]);
  const [date, setDate] = useState('');
  const [userid, setUserid] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUserid(user.userid);
      }else{
        nav("/login")
      }
    });
       const fref = ref(firebaseDatabase,'Flights-Record')
        onValue(fref,(snapshot) => {
            setFlight(Object.values(snapshot.val()));
            setIds(Object.keys(snapshot.val()));
        },{onlyOnce:true})
     },[])

  const handleClick = (e) => {
      const fbref = ref(firebaseDatabase,`Client-Record/${userid}`)
      const id = e.target.id;
      onValue(fbref, async (snapshot) => {
      const userref = ref(firebaseDatabase,`Book-List/${id}/${userid}`)
      await set(userref,snapshot.val())
      alert("Ticket Booked!")
      })
  }


    return (
        <div style={{backgroundColor:"lavender" }}>
            <hr/>
            <h1>Welcome!</h1>
            <Button variant="contained" onClick={() => { signOut(firebaseAuth); }} sx={{width:'180px', height:'50px', position:'absolute', top:'125px', right:'20px'}}>Log Out</Button>  
            <div style={{height:"40px",  width:"330px",marginBottom:"50px"}}>
                <InputLabel>Select Date</InputLabel>
                <TextField sx={{width:"330px"}} id="outlined-basic" variant="outlined" type={'date'} value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <hr/>

            <div className="list-Container">
                {Flight.map((Flight,index) => {
                    if(date == Flight.date){
                        return(

                            <div key={ids[index]} className="Data-Container">
                                <div>
                                    <p>Airline</p>
                                    <h3>{Flight.airline}</h3>
                                </div>
                                <div>
                                    <p>Date</p>
                                    <h3>{Flight.date}</h3>
                                </div>
                                <div>
                                    <p>Departure Time</p>
                                    <h3>{Flight.departureTime}</h3>
                                </div>
                                <div>
                                    <p>Arrival Time</p>
                                    <h3>{Flight.arrivalTime}</h3>
                                </div>
                                <div>
                                    <p>Boarding Point</p>
                                    <h3>{Flight.boarding}</h3>
                                </div>
                                <div>
                                    <p>Destination</p>
                                    <h3>{Flight.destination}</h3>
                                </div>
                                <div>
                                    <p>Cost</p>
                                    <h3>{Flight.cost}</h3>
                                </div>
                                <div>
                                    <Button variant="contained" onClick={handleClick} id={ids[index]} sx={{height:"40px", width:"150px", marginTop:"35px"}}>Book</Button>
                                </div>
                            </div>
                            )}
                        })
                    }
            
            </div>
        </div>
    )
}

export default TicketBook;