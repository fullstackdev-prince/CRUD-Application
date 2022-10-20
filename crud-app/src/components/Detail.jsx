import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



const Detail = () => {

    const [getuserdata, setuserdata] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");

    const getdata = async () => {

        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

        });
        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error");
        }
        else {
            setuserdata(data)
            console.log("Data GET Successfuly");
        }

    }

    useEffect(() => {
        getdata();
    }, [])



    const deleteuser = async (id) => {
        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        }
        else {
            console.log("Data DELETED Successfuly");
            getdata();
        }

    }

    return (
        <div className='container mt-3'>
            <h1 style={{ fontWeight: 400 }}>Welcome Prince Sinha</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getuserdata._id}`}> <Button variant="warning" className='mx-2'> <EditIcon></EditIcon> </Button>{' '}</NavLink>
                        <Button onClick={() => deleteuser(getuserdata._id)} variant="danger"> <DeleteIcon></DeleteIcon> </Button>{' '}

                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src='/pfp.png' style={{ width: 50 }} alt='profile' />
                            <h3>Name: <span>{getuserdata.name + " " + getuserdata.last}</span></h3>
                            <h3>Age: <span>{getuserdata.age}</span></h3>
                            <p> <EmailIcon></EmailIcon> Email: <span>{getuserdata.email}</span></p>
                            <p> <WorkIcon></WorkIcon> Occupation: <span>{getuserdata.desc}</span></p>
                        </div>
                        <div className="right_view col-lg-6 col-md-6 col-12">

                            <p className='mt-5'><PhoneIcon></PhoneIcon>Mobile: <span>{getuserdata.mobile}</span></p>
                            <p className='mt-3'> <HomeIcon></HomeIcon> Address: <span>{getuserdata.address + " " + getuserdata.city + "," + getuserdata.state}</span></p>
                            <p className='mt-3'><LocationOnIcon></LocationOnIcon>Pin code:<span>{getuserdata.zip}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Detail