import React from "react";

//create your first component
const Home = () => {

	let getToDoURL = "https://playground.4geeks.com/todo/docs"

	fetch(getToDoURL).then().then().catch()

	fetch().then().then().catch()

	fetch().then().then().catch()

	fetch().then().then().catch()

	return (
		<div className="text-center">
			<h1>To Do List!</h1>
		</div>
	);
};

export default Home;
