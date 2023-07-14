import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {baseUrl} from '../constant'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${baseUrl}/login`, {email, password})
      if (response.status === 200) {
        toast(response.data?.message)
        localStorage.setItem('token', JSON.stringify(response.data.token))
        navigate('/welcome')
      } else {
        toast(response.data?.message)
      }
      // Handle success response
    } catch (error) {
      console.error(error) // Handle error
    }
  }

  return (
    <div className='container col-md-4 border mt-4 shadow p-3 mb-5 bg-white rounded'>
      <h4 className='text-center mt-3'>Login Form</h4>
      <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
        <div className='mb-2'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='Enter Your mail'
            required
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Enter your password'
            required
            value={password}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='d-flex flex-column text-decoration-none '>
          <Link to='/' className='text-decoration-none'>
            You haven't an account
          </Link>
          <button type='submit' className='btn btn-primary mb-4 mt-3'>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
