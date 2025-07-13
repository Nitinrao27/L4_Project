import {useState} from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const navigate = useNavigate();

  const subHandler = async (e)=>{

    e.preventDefault();
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if(res.ok)
    {
      setEmail('');
      setPassword('');
      navigate('/Question');
      alert('logged In Successfully!');

    }
    else{
      
      setEmail('');
      setPassword('');
      navigate('/');
      alert('Wrong email Or password!');
      
    }

  }

  const handleGoogleLogin = async () => {
  try {
    const res = await fetch('http://localhost:3000/request-google', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.error('Error starting Google login', error);
    alert('Failed to start Google login');
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form onSubmit={subHandler} className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-2xl font-bold text-center">LOGIN</h1>
        <hr className="border-t-4 border-green-500 my-4 mx-auto w-3/5" />
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input className="w-full h-9 rounded-lg mt-1 border border-gray-300 p-2"
           type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Password</label>
          <input className="w-full h-9 rounded-lg mt-1 border border-gray-300 p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="text-center mt-4">
          <input className="bg-green-600 text-white rounded-lg w-1/2 h-10 cursor-pointer hover:bg-green-700" type="submit" value="LOGIN" />
        </div>
        <div className="text-center mt-4">
  <button
    type="button"
    onClick={handleGoogleLogin}
    className="bg-red-500 text-white rounded-lg w-1/2 h-10 hover:bg-red-600"
  >
    Continue with Google
  </button>
</div>
      </form>
    </div>
  );
};

export default Login;
