import { BrowserRouter, Routes, Route } from "react-router-dom";

import QueuePage from "./pages/queue.tsx";
import AdminPage from "./pages/live.tsx";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<QueuePage />} />

                <Route path="/admin" element={<AdminPage />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;