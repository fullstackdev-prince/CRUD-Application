import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import HomeIcon from '@mui/icons-material/Home';
import { adddata } from './context/ContextProvider';


const Register = () => {

  const { udata, setUdata } = useContext(adddata);

  const navigate = useNavigate("");

  const [inpval, setInp] = useState({
    name: "",
    last: "",
    email: "",
    age: "",
    mobile: "",
    city: "",
    state: "",
    zip: "",
    address: "",
    desc: ""
  });
  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInp((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

  const addinpdata = async (e) => {

    e.preventDefault();

    const { name, last, email, age, mobile, city,
      state, zip, address, desc
    } = inpval;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name, last, email, age, mobile, city,
        state, zip, address, desc

      })
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("error");
      console.log("error");
    } else {
      // alert("Data added Successfuly");
      navigate("/")
      setUdata(data)
      console.log("Data added Successfuly");
    }

  }


  return (
    <div className='container'>
      <NavLink to="/"><HomeIcon></HomeIcon>Home</NavLink>


      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>FirstName</Form.Label>
            <Form.Control type="text" onChange={setData} name="name" value={inpval.name} placeholder="Enter First Name" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" onChange={setData} name="last" value={inpval.last} placeholder="Enter Surname" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" onChange={setData} name="email" value={inpval.email} placeholder="Enter email" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" onChange={setData} name="age" value={inpval.age} placeholder="Enter age" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="tel" onChange={setData} name="mobile" value={inpval.mobile} placeholder="+91" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control onChange={setData} name="city" value={inpval.city} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control onChange={setData} name="state" value={inpval.state} />
          </Form.Group>



          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control onChange={setData} name="zip" value={inpval.zip} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control onChange={setData} name="address" value={inpval.address} placeholder="1234 Main St" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={setData} name="desc" value={inpval.desc} />
        </Form.Group>
        <Button onClick={addinpdata} variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </div>
  )
}
export default Register
