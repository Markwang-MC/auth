import {useState} from 'react'
export default function Login(){
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({formData})
    const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    const data = await res.text();
    console.log({data})
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
       <form onSubmit={handleSubmit} className='grid grid grid-cols-2 gap-y-4'>
          <label>First Name:</label>
          <input type="text" name="first_name" onChange={handleChange} required />
          
          <label>Last Name:</label>
          <input type="text" name="last_name" onChange={handleChange} required />
          
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />
          
          <label>Sex:</label>
          <input type="text" name="sex" onChange={handleChange} required />
          
          <label>Sin:</label>
          <input type="text" name="Sin" onChange={handleChange} required />
          
          <label>Id:</label>
          <input type="text" name="id" onChange={handleChange} required />
          
          <label>College:</label>
          <input type="text" name="college" onChange={handleChange} required />
          
          <label>Address:</label>
          <input type="text" name="address" onChange={handleChange} required />
          
          <button type="submit">登陆</button>
      </form>
      <div>{response}</div>
    </div>
  );
};
