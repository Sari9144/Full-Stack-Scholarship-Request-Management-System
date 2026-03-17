
import { Home }           from "../comps/Home"
import { Nav }            from "./Nav"
import { Login }          from "../comps/Login"
import { Register }       from "../comps/Register"
import { SendRequest }    from "../comps/SendRequest"
import { ViewStatus }     from "../comps/ViewStatus"
import { ViewRequests }   from "../comps/ViewRequests"
import { RequestDetails } from "../comps/RequestDetails"
import { NotFind }        from "../comps/NotFind"
import { Designs }        from "../comps/Designs"
import { BrowserRouter, Route, Routes } from "react-router"

export const Routing = () => (
    <BrowserRouter>
        <Nav />
        <Routes>
            <Route path=""             element={<Home />} />
            <Route path="Home"         element={<Home />} />
            <Route path="Designs"      element={<Designs />} />
            <Route path="Login"        element={<Login />} />
            <Route path="Register"     element={<Register />} />
            <Route path="SendRequest"  element={<SendRequest />} />
            <Route path="ViewStatus"   element={<ViewStatus />} />
            <Route path="ViewRequests" element={<ViewRequests />}>
                <Route path="RequestDetails" element={<RequestDetails />} />
            </Route>
            <Route path="*" element={<NotFind />} />
        </Routes>
    </BrowserRouter>
)
