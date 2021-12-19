import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import queryString from 'querystring'
import { css } from 'glamor'
import image from '../images/list.png'
import todo from '../images/todo.png'


const Home = () => {
	const [quizzes, setQuizzes] = useState([])
	useEffect(() => {
		async function fetchQuizes() {
			const params = queryString.parse(window.location.search.replace(/^\?/, ''))
			const response = await axios('http://localhost:3000/quizzes', {
            headers: {
                token: localStorage.token
            }
        })
        setQuizzes(response.data)
    }
		fetchQuizes()
	}, []);
	return (
		<div style={styles.container}>
			<section style={styles.sectionPic}>
				<img src={image} alt="todo list" />
			</section>
			<section style={styles.section}>
				<h2>To Do</h2>
				<p>Click on any quiz listed below to take one.</p>
				<div style={styles.boards}>
					{quizzes.map(q => (
						<div {...css(innerDiv)} key={q.id}>
							<Link {...css(link)} to={'/quizzes/' + q.id}>
								{q.name}
								<button {...css(btn)}></button>
							</Link>
							<img style={styles.img} src={todo} alt="todo clipboard" />
						</div>
					))}
				</div>
			</section>
		</div>
	)
}

export default Home

const styles = {
	container:{
		display: 'flex',
		flexDirection: "column",
	},
	section:{
		textAlign: "center",
		margin: '0 auto'
	},
	sectionPic:{
		backgroundColor: "#A6D5BB",
		textAlign: "center",
	},
	boards:{
		display: "flex",
        flexDirection: "row",
        height: "75%",
        flexWrap: "wrap",
        justifyContent: "space-around",
	},
	img:{
		objectFit: "contain",
		maxHeight: "300px",
		maxWidth: "300px",
		marginTop: "5px"
	}
}

let link = css({
	textDecoration: "none",
	color: "#279AF1",
	fontWeight: "bold",
	borderBottom: "1px solid #23B5D3",
	fontSize: "26px",
	':hover':{
		// backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23453886' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E")`,
		// backgroundPosition: "bottom",
		// backgroundRepeat: "repeat-x",
		// backgroundSize: "20%",
		// borderBottom: "0",
		// paddingBottom: ".3em",
		// textDecoration: "none",
		cursor: "pointer",
	}
})

let innerDiv = css({
	// margin: "0 auto",
	margin: "20px",
	display: "flex",
	flexDirection: "column",
	paddingBottom:"10px",
	// margin: "20px 0px",
	position: "relative",
	transition:"transform 0.25s",
	':hover':{
        transform: "scale(1.05)"
    }
})

let btn = css({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    background: "transparent",
    cursor: "pointer",
    border: "none",
})