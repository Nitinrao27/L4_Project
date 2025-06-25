import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Question() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/Question', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          // Not logged in, send to login
          navigate('/login');
        } else {
          return res.json();
        }
      })
      .then(data => {
        if (data) {
          console.log(data);
        }
      });
  }, [navigate]);

  return (
    <>
      <h1>Hello Duniya!</h1>
    </>
  );
}

export default Question;
