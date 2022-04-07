import React , {useState, useMemo} from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Browse,
  Contact,
  Forum,
  // Posts,
  // Post,
  Profile,
  Account,
  Login,
  NotLoggedIn,
  Filter,
  Filter2,
  Ewaste,
  LightingWaste,
  CreatePost,
  Thread,
  Cash,
  OldProducts,
  MapEwaste,
  MapLwaste,
  Map2ndHand,
} from "./components";
import {UserContext} from './components/UserContext'

function AppRouter(){
    const [User, setUser] = useState('')

    const value = useMemo(() => ({ User, setUser }), [User, setUser]);

    return(
        <Router>
            <Navigation />
            <UserContext.Provider value={value}>
            <Routes>
                <Route className path="/" element={<Home />} />
                <Route className path="/GreenPirates" element={<Home />} />
                <Route className path="/browse" element={<Browse />} />
                <Route className path="/contact" element={<Contact />} />
                <Route className path="/start" element={<Filter />} />
                <Route className path="/start2" element={<Filter2 />} />
                <Route className path="/profile" element={<Profile />} />
                <Route className path="/account" element={<Account />} />
                
                <Route className path="/login" element={<Login />} />
                <Route className path="/forum" element={<Forum />}/>
                <Route className path="/notlogin" element={<NotLoggedIn/>} />
                    {/* <Route path="" element={<Posts />} />
                    <Route path=":postSlug" element={<Post />} /> */}
                {/* </Route> */}
                <Route className path="/createPost" element={<CreatePost/>} />
                <Route className path="/thread/:id" element={<Thread/>} />
                <Route className path="/ewaste" element={<Ewaste/>} />
                <Route className path="/lightingwaste" element={<LightingWaste/>} />
                <Route className path="/cash" element={<Cash/>} />
                <Route className path="/OldProducts" element={<OldProducts/>} />
                <Route className path="/mapewaste" element={<MapEwaste />} />
                <Route className path="/maplwaste" element={<MapLwaste />} />
                <Route className path="/map2ndhand" element={<Map2ndHand />} />
            </Routes>
            </UserContext.Provider>
            <Footer />
        </Router>     
    );
}

export default AppRouter;