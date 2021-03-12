import React, { useState, useEffect } from 'react'
import './Todos.css'

const Todos = () => {

    const [todo, setTodo] = useState([]);

    let url = "https://assets.breatheco.de/apis/fake/todos/user/trago18";

    window.onload = function () {
        fetch(url)
            .then(response => { return response })
            .then(data => {
                if (data.status === 404) {
                    let todos = [];
                    let options = {
                        method: "POST",
                        body: JSON.stringify(todos),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    };
                    fetch(url, options)
                        .then(response => { return response.json() })
                        .then(data => {
                            console.log('newTodo',data)
                        })
                } else {
                    fetch(url)
                        .then(response => { return response.json() })
                        .then(data => {
                            console.log('loadedTodo',data)
                            let todos = [];
                            data.forEach((value) => {
                                todos.push(value.label)
                            });
                            setTodo(todos);
                        })
                }
            });
    };


    let addItem = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            const newTodo = e.target.value;
            const isOnTheList = todo.includes(newTodo);

            if (isOnTheList) {
                // message
            } else {
                newTodo !== "" && setTodo([...todo, newTodo]);
            }
            e.target.value = '';
        }
    }


    let removeItem = (item) => {
        const newTodos = todo.filter(value => {
            return value !== item;
        });
        setTodo(newTodos);
    }

    let removeAll = () => {
        setTodo([]);
        let options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(url, options);
    }


    useEffect(() => {
        const upTodo = async () => {
            let todos = [];
            todo.forEach((value) => {
                todos.push({ label: value, done: false });
            })
            let options = {
                method: "PUT",
                body: JSON.stringify(todos),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            let response = await fetch(url, options).then(res => res.json());
            console.log(response);
        }
        upTodo();
    }, [todo]);


    let message;
    if (todo.length === 0) {
        message = "No tasks, add a task";
    } else {
        message = "What needs to be done?";
    }


    let loop = todo.map(item => {
        return (
            <tr key={item} >
                <td >{item}</td>
                <td onClick={(e) => removeItem(item)} className="text-end me-2" ><i className="fas fa-times text-end text-black-50 mt-1"></i></td>
            </tr>
        )
    });

    let items = todo.length;

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
                        <td className='text-end'><button type="button" className='btn btn-secondary btn-sm' onClick={removeAll}>Delete All</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Todos
