import { Route, Routes } from "react-router"
import RouteGuard from "../guards/RouteGuard";
import GuestGuard from "../guards/GuestGuard";

import { Home } from "./Home"
import { Header } from "./Header"
import { Catalog } from "./Catalog"
import { CarCreate } from "./CarCreate"
import { CarDetails } from "./CarDetails"
import { CarEdit } from "./CarEdit"
import { Register } from "./Register"
import { Login } from "./Login"
import { Profile } from "./Profile"
import { Footer } from "./Footer"

import { AuthProvider } from "../contexts/AuthContext";

function App() {
    return (
        <AuthProvider >

            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/cars/:carId" element={<CarDetails />} />

                <Route element={<RouteGuard />}>
                    <Route path="/cars/create" element={<CarCreate />} />
                    <Route path="/cars/:carId/edit" element={<CarEdit />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route element={<GuestGuard />}>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>

            </Routes>

            <Footer />
            
        </AuthProvider>
    )
}

export default App
