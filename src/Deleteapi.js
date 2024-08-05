import React, { useState, useEffect } from 'react';

const Deleteapi = () => {
    const [items, setItems] = useState([]);

    // Fetch items on component mount
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:4000/getstd');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const deleteItem = async (_id) => {
        try {
            const response = await fetch(`http://localhost:4000/deletestd/${_id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Remove the deleted item from the state
                setItems(items.filter(item => item._id !== _id));
            } else {
                console.error('Failed to delete the item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            <h1>Item List</h1>
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        {item.stdId}
                        {item.stdName}
                        {item.stdNumber}
                        {item.stdEmail}

                        <button onClick={() => deleteItem(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Deleteapi;
