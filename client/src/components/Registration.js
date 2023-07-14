import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {baseUrl} from '../constant'

const Registration = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${baseUrl}/register`, {
        name,
        email,
        password,
      })
      if (response.status === 200) {
        toast(response?.data?.message)
        navigate('/login')
      } else {
        toast(response?.data?.message)
      } // Handle success response
    } catch (error) {
      console.error(error) // Handle error
    }
  }

  return (
    <div className='container col-md-4 border mt-4 shadow p-3 mb-5 bg-white rounded'>
      <h4 className='text-center mt-3'>Registration Form</h4>
      <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
        <div className='mb-2'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            required
            value={name}
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            required
            placeholder='Enter your mail'
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
            placeholder='Enter Your password'
            required
            value={password}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='d-flex flex-column '>
          <Link to='/login' className='text-decoration-none'>
            You haven an account
          </Link>
          <button type='submit' className='btn btn-primary mb-4 mt-3'>
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Registration
