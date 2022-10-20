import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { adddata, updatedata, deldata } from './context/ContextProvider';
import { Stack } from '@mui/material';

const Home = () => {

    const [getuserdata, setuserdata] = useState([]);
    console.log(getuserdata);

    const { udata, setUdata } = useContext(adddata);

    const { updata, setUPdata } = useContext(updatedata);

    const { dltdata, setDLTdata } = useContext(deldata);


    const getdata = async (e) => {

        const res = await fetch("/getdata", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

        });
        const data = await res.json();
        // console.log(data);

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
            setDLTdata(deletedata)
            getdata();
        }

    }


    return (

        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2 text-right">
                        <NavLink to="/register"><Button className="btn btn-primary">Add Data</Button></NavLink>{' '}
                    </div>

                    <Table bordered hover variant="light">
                        <thead>
                            <tr className='table-dark'>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Mobile</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip</th>
                                <th>Address</th>
                                <th>Job</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope='row'>{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.last}</td>
                                                <td>{element.email}</td>
                                                <td>{element.age}</td>
                                                <td>{element.mobile}</td>
                                                <td>{element.city}</td>
                                                <td>{element.state}</td>
                                                <td>{element.zip}</td>
                                                <td>{element.address}</td>
                                                <td>{element.desc}</td>
                                                <td className="d-flex ">
                                                    <Stack direction="horizontal" gap={3}>
                                                        <NavLink to={`/view/${element._id}`}><Button variant="success"> <RemoveRedEyeIcon></RemoveRedEyeIcon> </Button>{' '}</NavLink>
                                                        <NavLink to={`/edit/${element._id}`}><Button variant="warning"> <EditIcon></EditIcon> </Button>{' '}</NavLink>
                                                        <Button onClick={() => deleteuser(element._id)} variant="danger"> <DeleteIcon></DeleteIcon> </Button>{' '}
                                                    </Stack>

                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }



                        </tbody>
                    </Table>
                </div>
            </div >
        </>

    );
}

export default Home;