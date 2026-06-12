import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../pages/Layout"
import Home from "../pages/Home"
import Product from "../pages/Product"
import NoPage from "../pages/NoPage"


function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="product" element={<Product />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter