import { useEffect, useState } from "react";
import "../App.css";
function queuePage(){
    const [name, setName] = useState("");
    const [indiv, setIndiv] = useState("");
    const [ID, setID] = useState("");
    const [reservation, setReservation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [queue, setQueue] = useState<QueueEntry[]>([]);
    const [total, setTotal] = useState(0);
   

    interface QueueEntry {
        id: number;
        name: string;
        indiv: number;
        reservation: string;
    }
    
    const getTotal = async () => {
        const response = await fetch("http://localhost:3000/api/queue");
        const data = await response.json();
        const total = data.reduce((sum, entry) => sum + entry.indiv, 0);
        setTotal(total);
    }

    const getQueue = async () => {
            const response = await fetch("http://localhost:3000/api/queue");
            const data = await response.json();
            setQueue(data);
        }
    
    const searchQueue = async () => {
        const response = await fetch(`http://localhost:3000/api/queue?action=/search&name=${name}&ID=${ID}&date=${date}&time=${time}`);
        const data = await response.json();
        setQueue(data);
    }

    useEffect(() => {getQueue(); getTotal();}, []);
    

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
        setSuccess("Successfully joined the queue!");
        

        await getQueue(); 
        await getTotal();
        console.log(data);
    };

return (
    <div className="app">
        <div className="container">

            <header className="header">
                <h1>Queue thingy</h1>
            </header>

            <section className="queue-card">
                <h3>{total} people have visited our booth!</h3>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

                <div className="form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Number of People</label>
                        <input
                            type="number"
                            min="1"
                            placeholder="e.g. 3"
                            value={indiv}
                            onChange={(event) => setIndiv(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Reservation Time</label>
                        <input
                            type="time"
                            step="1200"
                            value={reservation}
                            onChange={(event) => setReservation(event.target.value)}
                        />
                    </div>

                    <button className="join-button" onClick={joinQueue}>
                        Join Queue
                    </button>
                </div>
            </section>

            <section className="queue-card">
                <div className="queue-header">
                    <div>
                        <h2>Current Queue</h2>
                        <p>{queue.length} reservation(s)</p>
                    </div>
                </div>
                  <nav className="search-navbar" aria-label="Queue search">
                <form className="search-form" onSubmit={(event) => {event.preventDefault();searchQueue();}} >
                    <input type="search" name="id" value={ID} onChange={(event) => setID(event.target.value)} placeholder="Search ID..." />
                    <input type="search" name="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Search name..." />
                    <input type="date" name="create" value={date} onChange={(event) => setDate(event.target.value)} placeholder="Search date created..." />
                    <input type="time" name="create" value={time} onChange={(event) => setTime(event.target.value)} placeholder="Search time created..." />
                    <button type="submit" aria-label="Search">Find</button>
                </form>
            </nav>

                <div className="queue-table-wrapper">
                    <table className="queue-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>People</th>
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
            </section>

        </div>
    </div>
);
}
export default queuePage;