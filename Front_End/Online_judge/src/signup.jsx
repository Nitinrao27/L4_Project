import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://l4-project-back-end.onrender.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    console.log(data);
    if(res.ok)
    {
      setUsername('')
      setEmail('')
      setPassword('')
      navigate('/login');
    }
  };

  const handleGoogleLogin = async () => {
  try {
    const res = await fetch('https://l4-project-back-end.onrender.com/request-google', {
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
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-2xl font-bold text-center">SIGN UP</h1>
        <hr className="border-t-4 border-green-500 my-4 mx-auto w-3/5" />
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Username</label>
          <input
            className="w-full h-9 rounded-lg mt-1 border border-gray-300 p-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter user name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            className="w-full h-9 rounded-lg mt-1 border border-gray-300 p-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Password</label>
          <input
            className="w-full h-9 rounded-lg mt-1 border border-gray-300 p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="text-center mt-4">
          <input
            className="bg-green-600 text-white rounded-lg w-1/2 h-10 cursor-pointer hover:bg-green-700"
            type="submit"
            value="SIGN UP"
          />
        </div>
        <div className="text-center mt-4">
            <span>Already a user?</span>
            <button className="ml-2 mb-2 bg-gray-900 text-yellow-300 rounded p-2 hover:bg-gray-800">
              <a href="/login">LOGIN</a>
            </button>
            <hr className='mb-2' />
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
}

export default Signup;
