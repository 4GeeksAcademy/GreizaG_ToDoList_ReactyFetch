import React, { useState, useEffect } from "react";

const Home = () => {

	const [toDos, setToDos] = useState("");
	const [toDoList, setToDoList] = useState([]);
	const [user, setUser] = useState("GreizaG");

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

	async function deleteToDo(id) {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, { method: "DELETE" })
		console.log(response)
		if (response.ok) {
			const data = await response
			console.log(data)
			getToDoList()
			return true

		}
		const data = await response.json()
		console.log(data)
		return false
	}

	async function createUser(user) {
		const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`, { method: "POST" })
		console.log(response)
		const data = await response.json()
		console.log(data)
		return null
	}

	async function editToDo(id) {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, { method: "PUT" })
		console.log(response)
		if (response.ok) {
			const data = await response.json()
			console.log(data)
			getToDoList()
			return true

		}
		const data = await response.json()
		console.log(data)
		return false
	}

	async function createUser(user) {
		const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`, { method: "POST" })
		console.log(response)
		const data = await response.json()
		console.log(data)
		return null
	}



	useEffect(() => {
		createUser(user);
		getToDoList();
	}, [user])

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
												deleteToDo(value.id)
											}}></i>
										<i className="fa-solid fa-pencil ms-2 text-danger"
											onClick={() => {
												editToDo(value.id)
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
}

export default Home;
