import { useState } from "react";

function App() {
    const [name, setName] = useState("");

    const joinQueue = async () => {
        console.log("Joining queue...");
        console.log("Name:", name);

        const response = await fetch("http://localhost:3000/api/queue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
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

            <button onClick={joinQueue}>Join Queue</button>

            <h1>{name}</h1>
        </div>
    );
}

export default App;