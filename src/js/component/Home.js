import React, { useState, useEffect } from "react";

const Home = () => {

	const [toDos, setToDos] = useState("");
	const [toDoList, setToDoList] = useState([]);

	// Operaciones To Do List
	let getToDoListURL = "https://playground.4geeks.com/todo/users/GreizaG";
	let postNewToDoURL = "https://playground.4geeks.com/todo/todos/GreizaG";
	let putToDoURL = "https://playground.4geeks.com/todo/todos/";
	let deleteToDoURL = "https://playground.4geeks.com/todo/todos";

	//Operaciones usuarios
	let deleteUserURL = "https://playground.4geeks.com/todo/users/GreizaG";

	//Función para traer todo el listado de tareas
	function getToDoList() {
		fetch("https://playground.4geeks.com/todo/users/GreizaG")
			.then(resp => resp.json())
			.then((data) => {
				console.log("Tareas", data)
				setToDoList(data.todos)
			})
			.catch((error) => { console.log(error) })
	}


	//Función para crear tarea
	function newToDo() {
		fetch("https://playground.4geeks.com/todo/todos/GreizaG", {
			method: "POST",
			body: JSON.stringify({ "label": toDos, "is_done": false }),
			headers: {
				"content-type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then((data) => {
				console.log("Tarea creada: ", data)
				getToDoList()
			})
			.catch((error) => error)
	}

	useEffect(() => {
		getToDoList();
	}, [])

	return (
		<div className="m-5 row justify-content-center">
			<div className="col-6">
				<h1 className="text-center pb-3">To Do List</h1>
				<h3 className="fw-lighter pb-3">New Task: {toDos ? toDos : "Add New Task"}</h3>
				<div className="input-group">
					<input type="text" className="form-control mb-3" placeholder="New Task"
						style={{ color: "#e090b9" }}
						onChange={(e) => setToDos(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								newToDo()
							}
						}}
						aria-label="Username" aria-describedby="basic-addon1" value={toDos} />
				</div>

				<div>
					<ul className="list-group">
						{toDoList.map((value, index) => {
							return <li className="list-group-item" style={{ color: "#8067d8" }}
								key={index}>
								<div className="task d-flex justify-content-between">
									<span>{value.label}</span>
									<div>
										<i className="fa-regular fa-trash-can fs-6 ms-auto"
											onClick={() => {
												deleteToDo()
											}}></i>
									</div>
								</div>
							</li>
						})}
					</ul><br />
				</div>
				<p className="ms-3">{toDoList.length} Tasks</p>
				<div className="d-flex justify-content-end">
					<button className="btn btn-outline-danger btn-sm me-2">Delete User</button>
					<button className="btn btn-outline-warning btn-sm" onClick={() => {
						setToDos("")
					}}>Clear</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
