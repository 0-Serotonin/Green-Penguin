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
  Profile,
  MyPosts,
  Login,
  NotLoggedIn,
  Filter,
  Ewaste,
  LightingWaste,
  CreatePost,
  Thread,
  Cash,
  OldProducts,
  MapEwaste,
  MapLwaste,
  Map2ndHand,
  Map,
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
                <Route className path="/profile" element={<Profile />} />
                <Route className path="/myposts" element={<MyPosts />} />
                
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
                <Route className path="/map" element={<Map />} />
            </Routes>
            </UserContext.Provider>
            <Footer />
        </Router>     
    );
}

export default AppRouter;