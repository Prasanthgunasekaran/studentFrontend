import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Getapi.scss';
import { Link } from 'react-router-dom';

function Getapi() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const stduser = async () => {
            try {
                //This is fetch using getapi
                const response = await fetch('http://localhost:4000/getstd');
                const data = await response.json()
                setUser(data);

                // const response = await fetch('http://localhost:4000/getstd', {
                //     method: 'GET',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(user)
                // });

                //This is getapi using axios
                // const response = await axios.get('http://localhost:4000/getstd');
                // setUser(response.data);

            } catch (error) {
                setError(error);
                console.log("Error", error)
            } finally {
                setLoading(false);
            }
        };
        stduser();
    },);

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>Error: {error.message}</h1>
    }
    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>StudentID </th>
                            <th>StudentName</th>
                            <th> StudentNumber </th>
                            <th> StudentEmail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((users) => (
                            <tr key={users.stdId}>
                                <td>{users.stdId}</td>
                                <td>{users.stdName}</td>
                                <td>{users.stdNumber}</td>
                                <td>{users.stdEmail} </td>
                                {/* <td><button><Link className='linktag' to='/updateapi'>Update</Link></button></td> */}
                                {/* <td><button><Link className='linktag' to='/getoneapi'>GetOne</Link></button></td> */}
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Getapi;
