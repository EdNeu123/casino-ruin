import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Games from "../pages/Games";\nimport Login from "../pages/Login";\nimport Register from "../pages/Register";

export default function RootNavigation() {
    return (
        <BrowserRouter basename={"/website-project/"}>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path="games" element={<Games />} />\n                    <Route path="login" element={<Login />} />\n                    <Route path="register" element={<Register />} />
                    {/* Adicionar rota para a roleta aqui, se for diferente de /games */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

