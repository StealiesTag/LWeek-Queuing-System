import { useEffect, useState } from "react";

function App() {
    const [name, setName] = useState("");
    const [indiv, setIndiv] = useState("");
    const [reservation, setReservation] = useState("");

    const [queue, setQueue] = useState([]);
    
    useEffect(() => {
        const getQueue = async () => {
            const response = await fetch("http://localhost:3000/api/queue");
            const data = await response.json();
            setQueue(data);
        }
        getQueue();
    }, []);
    
    const joinQueue = async () => {
        console.log("Joining queue...");
        console.log("Name:", name);
        console.log("Individuals:", indiv);
        console.log("Reservation:", reservation);

        const response = await fetch("http://localhost:3000/api/queue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                indiv: parseInt(indiv),
                reservation: reservation
            })
        });

        const data = await response.json();

        console.log(data);
    };

    return (
        <div>
            <h1>School Queue</h1>

            <input
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <input
                placeholder="Enter number of people"
                value={indiv}
                onChange={(event) => setIndiv(event.target.value)}
            />
            <input
                placeholder="Enter reservation time in HH:MM:SS"
                value={reservation}
                onChange={(event) => setReservation(event.target.value)}
            />
            

            <button onClick={joinQueue}>Join Queue</button>

            <h1>{name}, {indiv}, {reservation}</h1>
        </div>
    );
}

export default App;