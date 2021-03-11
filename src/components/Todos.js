import React, { useState } from 'react'
import './Todos.css'

const Todos = () => {

    const [value, setValue] = useState([]);

    let addItem = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            const newValue = e.target.value;
            const isOnTheList = value.includes(newValue);

            if (isOnTheList) {
                // message
            } else {
                newValue !== "" && setValue([...value, newValue]);
            }
            e.target.value = '';
        }
    }

    let removeItem = (item) => {
        const newValues = value.filter(value => {
            return value !== item;
        });
        setValue(newValues);
    }

    let message;
    if (value.length === 0) {
        message = "No tasks, add a task";
    } else {
        message = "What needs to be done?";
    }


    let loop = value.map(item => {
        return (
            <tr key={item} >
                <td >{item}</td>
                <td onClick={(e) => removeItem(item)} className="text-end me-2" ><i className="fas fa-times text-end text-black-50 mt-1"></i></td>
            </tr>
        )
    });

    let items = value.length;


    return (
        <div className="container-fluid">
            <h1 className="display-1 text-center text-black-50">todos</h1>
            <table className="table shadow p-3 mb-5 bg-light rounded">
                <tbody>
                    <tr>
                        <td>
                            <input className="inputClass border-0 bg-light" type="text" placeholder={message} onKeyUp={addItem} />
                            </td>
                        <td></td>
                    </tr>
                    {loop}
                    <tr>
                        <td className="text-black-50">{items} item left</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Todos
