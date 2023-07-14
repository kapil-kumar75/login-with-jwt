import {Link} from 'react-router-dom'

const WelcomePage = () => {
  return (
    <div className='container col-md-6 mt-5 p-3 mb-5 bg-white rounded'>
      <h2 className='text-center mt-3 mb-5'>Welcome, You have login successfully</h2>
      <Link to='/' className='text-decoration-none text-center mt-5 ' style={{marginLeft: '60px'}}>
        Go to Signup page
      </Link>
    </div>
  )
}

export default WelcomePage
