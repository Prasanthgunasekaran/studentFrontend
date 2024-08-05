import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Postapi() {
    const [postData, setPostData] = useState({
        stdId: "",
        stdName: "",
        stdNumber: "",
        stdEmail: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPostData({
            stdId: "",
            stdName: "",
            stdNumber: "",
            stdEmail: "",
        })
        try {
            const res = await axios.post("http://localhost:4000/addstd", postData);

        } catch (err) {
            console.log(err);
        }
        navigate('/getapi')
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label> Student ID:</label>
                <input
                    type="text"
                    name="stdId"
                    placeholder="Enter Student ID"
                    onChange={handleChange}
                    value={postData.stdId}
                />
                <label> Student Name:</label>
                <input
                    type="text"
                    name="stdName"
                    placeholder="Enter Student Name"
                    onChange={handleChange}
                    value={postData.stdName}
                />
                <label> Student Number:</label>
                <input
                    type="text"
                    name="stdNumber"
                    placeholder="Enter Student Number"
                    onChange={handleChange}
                    value={postData.stdNumber}
                />
                <label> Student Email:</label>
                <input
                    type="email"
                    name="stdEmail"
                    placeholder="Enter Student Email"
                    onChange={handleChange}
                    value={postData.stdEmail}
                />
                <button type="submit"> Submit</button>
            </form>
        </div>
    );
}

export default Postapi;
