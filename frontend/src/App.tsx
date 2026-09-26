import { BrowserRouter, Routes, Route } from "react-router-dom";

import QueuePage from "./pages/queue.tsx";
import LivePage from "./pages/live.tsx";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/api/queue" element={<QueuePage />} />

                <Route path="/api/live" element={<LivePage />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;