import React, { useState } from "react";
import Helmet from "../componentes/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { auth } from "../firebase.config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
 

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signIn = async(e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful");
      navigate("/")
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }
	

	return (
		<Helmet title="Login">
			<section>
				<Container>
					<Row>
          {loading ? (
							<div className="spinner-container d-flex justify-content-center">
								<div className="spinner-border text-primary" role="status">
					
								</div>
							</div>
						) : (						
						<Col lg="6" className="m-auto text-center">
							<h3 className="fw-bold fs-4">Login</h3>
							<Form className="auth__form" onSubmit={signIn}>
								<FormGroup className="form__group">
									<input
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										type="Email"
										placeholder="Enter your email"
									/>
								</FormGroup>
								<FormGroup className="form__group">
									<input
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										type="password"
										placeholder="Enter your password"
									/>
								</FormGroup>
								<div>
									<button
										type="submit"
										className="buy__btn auth__btn"
									>
										Login
									</button>
									<p>
										Don't have an account?{" "}
										<Link to="/signup">Create an account</Link>
									</p>
								</div>
							</Form>
						</Col>
						)}
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Login;
