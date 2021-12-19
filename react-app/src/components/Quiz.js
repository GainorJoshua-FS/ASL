import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom"
import { css } from 'glamor'
import { Link } from 'react-router-dom';

const Quiz = () => {
	const [quiz, setQuiz] = useState({Questions: []})
	const params = useParams()
	useEffect(() => {
		async function fetchQuiz() {
			const q = await axios(`http://localhost:3000/quizzes/${params.id}`, {
				headers: {
					token: localStorage.token
				}
			})
			console.log(q.data)
            setQuiz(q.data)
		}
		fetchQuiz()
	}, []);


	return (
		<form style={styles.container} id="quiz">
			<h2 style={styles.quizName}>Quiz: {quiz.name} | <span style={styles.weight}> Weight: </span> <span style={styles.circle}>{quiz.weight}%</span></h2>
			<section>
				{quiz.Questions.map(q => (
					<ul key={q.id}>
						<h3 style={styles.question}>{q.question}</h3>
							<div>
								{q.Choices.map(c => (
									<li style={styles.choices} key={c.id}>
										<input type="radio" name={'question_' + q.id} required />
										<label>{c.choice}</label>
									</li>
								))}
							</div>
					</ul>
				))}
			</section>
				<button {...css(btn)} type="submit" >Submit Quiz</button>
		</form>
	)
}

export default Quiz

const styles = {
	container:{
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
	},
	circle:{
		borderRadius: "50%",
		fontSize: "18px",
		fontWeight: "bolder",
		color: "#EA526F",
		textAlign: "center",
		background: "#CBC5EA",
		padding: "10px"
	},
	weight:{
		fontSize: "16px"
	},
	quizName:{
		color: "#EA526F",
		fontSize: "30px"
	},
	choices:{
		listStyleType: "none",
		marginLeft: "20px",
		borderBottom: "1px solid gray",
		width: "20%",
		margin: "0 auto",
		marginBottom: "10px",
		textAlign: "left",
		fontWeight: "500",
		fontSize: "18px"
	},
	question:{
		color: "#313D5A",
		fontSize: "25px",
		textAlign: "left",
		marginLeft: "630px"
	}
}

let btn = css ({
	margin: "0 auto",
	marginTop: "15px",
	backgroundColor: "#183642",
	color: "#CBC5EA",
	padding: "10px",
	border: "none",
	fontWeight: "600",
	borderRadius: "4px",
	':hover':{
		color: "#EA526F"
	}
})