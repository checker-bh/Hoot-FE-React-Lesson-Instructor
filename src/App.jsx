import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import authService from './services/authService';
import hootService from './services/hootService';

// Components
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm'
import HootList from './components/HootList/HootList';
import HootDetails from './components/HootDetails/HootDetails';

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [hoots, setHoots] = useState([]);

  useEffect(()=>{
    async function getHoots (){
      const hootsData = await hootService.index()
      setHoots(hootsData)
    }
    if(user){
      // fetch the hoots
      getHoots()
    }
  }, [user])

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout}/>
      <Routes>
        { user ? (
          // Protected Routes:
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/hoots" element={<HootList hoots={hoots}/>} />
            <Route path="/hoots/:hootId" element={<HootDetails/>} />
          </>
        ) : (
            // Public Route:
            <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser}/>} />
        <Route path="/signin" element={<SigninForm setUser={setUser}/>} />

      </Routes>
    </>
  );
};

export default App;