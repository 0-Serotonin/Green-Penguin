import React, { useState, useContext } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Profile from './forum/Profile';
import NotLoggedIn from './forum/NotLoggedIn';
//import { refreshTokenSetup } from '../utils/refreshTokenSetup';
import { UserContext } from './UserContext';

const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENTID;

function Login(){

    const {User, setUser} = useContext(UserContext);
    const[showLoginButton, setShowLoginButton]= useState(true);
    const[showLogoutButton, setShowLogoutButton] = useState(false);
    const[name,setName] = useState('');
    const[photoUrl,setPhoto] = useState('');
    const[email,setEmail] = useState('');
    
    const onLoginSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
        setShowLoginButton(false);
        setShowLogoutButton(true);
        setUser(res.profileObj);
        setName(res.profileObj.name);
        setPhoto(res.profileObj.imageUrl);
        setEmail(res.profileObj.email);
    };

    const onLoginFailure = (res) => {
        console.log('[Login failed] res:', res);
    };
    const onLogoutSuccess = () => {
        alert('Logout made successfully!');
        setShowLoginButton(true);
        setShowLogoutButton(false);
        setName('');
        setPhoto('');
        setEmail('');
    };
    
    return (
        <div className="login">
            <div class="container">
                 <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '20vh'}}>
                <h1 class="font-weight-light">Profile</h1>
             </div>
            </div>
            { showLoginButton ?
                <NotLoggedIn/> :null
            }
            { showLoginButton ?
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '20vh'}}>
                <GoogleLogin
                    disabled={false}
                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host origin'}
                    style={{ marginTop: '100px' }}
                    isSignedIn={true}
                />
                </div>
                : null
            }
            { showLogoutButton ?
                <Profile name={name} photo={photoUrl} email={email} /> :null
            }
            { showLogoutButton ?
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height:'20vh'}}>
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onLogoutSuccess}
                >
                </GoogleLogout> 
                </div>
                :null
            }
        </div>
    );
    
};


export default Login;