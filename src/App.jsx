
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/companylogo.png'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import DummyHome from './components/DummyHome';
import SelectSeat from './components/SelectSeat';
import Success from './components/Success';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Routes,useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
function App() {
  let [user,setUser] =useState('')
 
 let navigate=useNavigate()
  useEffect(()=>{
    let email=localStorage.getItem('userEmail')
    if(email) {
      setUser(email)
    }
    
  },[user])
  const handleLogOut = ()=> {
    console.log('entered handlelogout function')
    localStorage.removeItem('userEmail')
    // window.location.href='/signup'
    navigate('/signup')
  }
  const handleLogin =()=> {
    // window.location.href='/login'
    navigate('/login')
  }
  return (
    <div >
       <Navbar bg='light' variant='light' style={{padding:'1.3rem'}}>
        <Container >
          <Navbar.Brand onClick={()=>navigate('/')} style={{fontSize:'2rem',fontWeight:'bold'}} >
            <img
              alt=""
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            Ticket Box
          </Navbar.Brand>
          {
            user.length > 0 ? <Button onClick={()=>handleLogOut()}>Logout</Button> : <Button onClick={()=>handleLogin()}>Login</Button>
          }
        </Container>
      </Navbar>
      {/* <RouterProvider router={router} /> */}
      <Routes>
      <Route path='/' element={<Home user={user}/>} />
      <Route path='/login' element={<Login setUser={setUser} />} />
       <Route path='/signup' element={<Signup setUser={setUser} />} />
       <Route path='/movieDetails' element={<MovieDetail/>} />
       <Route path='/seatSelect' element={<SelectSeat/>} />
       
       <Route path='/success' element={<Success/>} />
      </Routes>
    </div>
  )
}

export default App
