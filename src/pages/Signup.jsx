import React, { useState } from "react";
import Helmet from "../componentes/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config.js";
import { storage } from "../firebase.config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

import { setDoc, doc } from "firebase/firestore";

import { db } from "../firebase.config.js";

import { toast } from "react-toastify";

import "../styles/login.css";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const signup = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			const authUser = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = authUser.user;

			const storageRef = ref(storage, `users/${Date.now() + username}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				(error) => {
					toast.error(error.message);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateProfile(user, {
							displayName: username,
							photoURL: downloadURL,
						});

						await setDoc(doc(db, "users", user.uid), {
							displayName: username,
							email: email,
							photoURL: downloadURL,
							uid: user.uid,
							createdAt: new Date(),
						});
					});
				}
			);

			setLoading(false);
			toast.success("Signup successful");
			navigate("/login");
		} catch (error) {
			setLoading(false);
			toast.error("Something went wrong");
		}
	};

	return (
		<Helmet title="Signup">
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
								<h3 className="fw-bold fs-4">Signup</h3>
								<Form className="auth__form" onSubmit={signup}>
									<FormGroup className="form__group">
										<input
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											type="text"
											placeholder="Enter your username"
										/>
									</FormGroup>
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
									<FormGroup className="form__group">
										<input
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											type="password"
											placeholder="confirm password"
										/>
									</FormGroup>

									<FormGroup className="form__group">
										<label>Add your profile picture</label>
										<input
											type="file"
											onChange={(e) => setFile(e.target.files[0])}
										/>
									</FormGroup>
									<div>
										<button type="submit" className="buy__btn auth__btn">
											Create an Account
										</button>
										<p>
											already have account? <Link to="login">login</Link>
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

export default Signup;
