import { Route, Routes } from "react-router"

import { Home } from "./Home"
import { Header } from "./Header"
import { Catalog } from "./Catalog"
import { CarCreate } from "./CarCreate"
import { CarDetails } from "./CarDetails"
import { CarEdit } from "./CarEdit"
import { Register } from "./Register"
import { Login } from "./Login"
import { Logout } from "./Logout"
import { Profile } from "./Profile"
import { Footer } from "./Footer"

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/cars/create" element={<CarCreate />} />
                <Route path="/cars/:carId" element={<CarDetails />} />
                <Route path="/cars/:carId/edit" element={<CarEdit />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>

            <Footer />

        </>
    )
}

export default App
