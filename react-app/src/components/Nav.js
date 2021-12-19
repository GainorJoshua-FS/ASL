import React from 'react'
import { Link } from 'react-router-dom';
import { css } from 'glamor'



class Nav extends React.Component
{

	LogOut(){
		localStorage.clear()
		window.location = "http://localhost:3001"
		window.location.reload()
	}

	render() {
		return (
			<header style={styles.header}>
				<Link style={styles.titleLink} to='/'>
					<h1 style={styles.title}>
						Quiz Taker
					</h1>
				</Link>
				<div style={styles.links}>
					<Link {...css(link)} to="/">Home</Link>
                    {/* Should take out login token from Local storage(?) and redirect to home page (window.location.href = localhost:3001) */}
					<button {...css(link)} onClick={this.LogOut}>Logout</button>
				</div>
			</header>
		);
	}
}

export default Nav;

const styles = {
	header:{
		backgroundColor: "#CBC5EA",
        paddingTop: "1px",
        marginTop: "-20px",
        display: "flex",
        flexDirection: "column",
	},
	title:{
        fontWeight: "bold",
		color: "#EA526F",
        fontSize: "40px",
        marginBottom: "5px",
		textAlign: "center"
    },
	links:{
        display: "inline-block",
        marginBottom:"5px",
		textAlign: "right"
    },
	titleLink:{
		textDecoration: "none"
	}
}

let link = css({
	color: "#070600",
    margin: "1rem",
    padding: "0px 15px",
    fontWeight: "bold",
    border: "none",
    textDecoration: "none",
    fontSize: "20px",
	background: "none",
    ':hover':{
        borderBottom: "1px solid",
    }
})