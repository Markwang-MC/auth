import {useState} from 'react'
export default function Login(){
  const [formData, setFormData] = useState({});

  // const handleLogin = () => {
  //   fetch('api/login', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       username: 'wxy',
  //       password: '1234567',
  //     },
  //   })
  //   .then((response) => response.json())
  //   .then((data)=>{
  //     setSession(data);
  //   })


  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    const data = await res.json();
    setResponse(data);
};

const handleChange = (e) => {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value
  });
};


  return (
    <div>
       <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="first_name" onChange={handleChange} required />
          
          <label>Last Name:</label>
          <input type="text" name="last_name" onChange={handleChange} required />
          
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />
          
          <label>Sex:</label>
          <input type="text" name="sex" onChange={handleChange} required />
          
          <button type="submit">登陆</button>
      </form>
    </div>
  );
};
