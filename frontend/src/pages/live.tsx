import { useEffect, useState } from "react";
import "../App.css";

function livePage() {
    const [image, setImage] = useState<string>('')



    const liveFeed = async () => {
        const response = await fetch('http://localhost:3000/api/live');
        const buffer = await response.blob();
        const data = URL.createObjectURL(buffer)
        setImage(data);
    }

    useEffect(() => {liveFeed}, []);

    return (
        <div>
            <img src={image}></img>
        </div>

    );

}

export default livePage;