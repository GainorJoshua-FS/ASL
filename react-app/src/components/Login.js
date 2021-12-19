import { css } from 'glamor'
import React from 'react'
import GHLogo from '../images/github.png'


class Login extends React.Component{
	render() {
		return (
			<div style={styles.div}>
				<h1 style={styles.h1}>Login</h1>
				<a {...css(link)} href="https://github.com/login/oauth/authorize?client_id=a9a5ffb4747f89ad5277">Login With Github <img src={GHLogo} alt="Github Logo" /> </a>
			</div>
		)
	}
}

export default Login

const styles = {
	div:{
		textAlign: "center",
		backgroundColor: "lightgray",
		// width: "calc(100% / 4)",
		// marginTop: "300px",
		// marginLeft: "600px",
		// padding: "25px 10px",
		position: "absolute",
		top: "50%",
		left: "50%",
		arginTop: "-50px",
		marginLeft: "-90px",
		width: "300px",
		height: "150px",
		boxShadow: "0 0 10px darkgray",
	},
	h1:{
		borderBottom: "1px solid"
	}
}

let link = css({
    color: "black",
    // margin: "1rem",
    // padding: "15px 15px",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "20px",
    ':hover':{
        borderBottom: "1px solid",
		cursor: "pointer"
    }
})