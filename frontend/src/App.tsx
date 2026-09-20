import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [indiv, setIndiv] = useState("");
    const [reservation, setReservation] = useState("");
    const [error, setError] = useState("");

    const [queue, setQueue] = useState<QueueEntry[]>([]);

    interface QueueEntry {
        id: number;
        name: string;
        indiv: number;
        reservation: string;
    }
    
    const getQueue = async () => {
            const response = await fetch("http://localhost:3000/api/queue");
            const data = await response.json();
            setQueue(data);
        }


    useEffect(() => {getQueue();}, []);
    

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
        if (!response.ok) {
            setError(data.error);
            return;
        }
        setError("");
console.log("Successfully joined:", data);

        await getQueue(); 
        console.log(data);
    };

    return (
        
        <div>
            <h1>Queue thingy</h1>
            {error && <p>{error}</p>}
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

            <div className="queue-table-wrapper">
                <table className="queue-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Individuals</th>
                            <th>Reservation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queue.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.name}</td>
                                <td>{entry.indiv}</td>
                                <td>{entry.reservation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
        </div>
    );
}

export default App;