import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Getapi.scss';

function Getapi() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [getOne, setGetOne] = useState(null);
    const [editedUser, setEditedUser] = useState({
        stdName: '',
        stdNumber: '',
        stdEmail: ''
    });

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:4000/getstd');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditingId(user._id);
        setEditedUser({
            stdName: user.stdName,
            stdNumber: user.stdNumber,
            stdEmail: user.stdEmail
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const { stdName, stdNumber, stdEmail } = editedUser;
            await axios.put(`http://localhost:4000/updatestd/${editingId}`, { stdName, stdNumber, stdEmail });
            setEditingId(null);
            fetchUsers();
        } catch (error) {
            setError(error);
        }
    };

    const handleGetOne = async (_id) => {
        try {
            const response = await axios.get(`http://localhost:4000/getstd/${_id}`);
            setGetOne(response.data);
        } catch (error) {
            setError(error);
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return (
            <div>
                <h1>Error: {error.message}</h1>
            </div>
        );
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student Number</th>
                        <th>Student Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                {editingId === user._id ? (
                                    <input
                                        type="text"
                                        name="stdName"
                                        value={editedUser.stdName}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.stdName
                                )}
                            </td>
                            <td>
                                {editingId === user._id ? (
                                    <input
                                        type="text"
                                        name="stdNumber"
                                        value={editedUser.stdNumber}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.stdNumber
                                )}
                            </td>
                            <td>
                                {editingId === user._id ? (
                                    <input
                                        type="email"
                                        name="stdEmail"
                                        value={editedUser.stdEmail}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.stdEmail
                                )}
                            </td>
                            <td>
                                {editingId === user._id ? (
                                    <button onClick={handleUpdate}>Save</button>
                                ) : (
                                    <button onClick={() => handleEditClick(user)}>Edit</button>
                                )}
                                <button onClick={() => handleGetOne(user._id)}>Get One</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {getOne && (
                <div>
                    <h2>Single User Details</h2>
                    <p>Name: {getOne.stdName}</p>
                    <p>Number: {getOne.stdNumber}</p>
                    <p>Email: {getOne.stdEmail}</p>
                </div>
            )}
        </div>
    );
}

export default Getapi;
