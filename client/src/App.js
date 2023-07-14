import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import WelcomePage from './components/WelcomePage'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/welcome' element={<WelcomePage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  )
}

export default App
