import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import Helmet from "../componentes/Helmet/Helmet";
import Services from "../services/Services";
import ProductList from "../componentes/Lii/ProductList";
import ListHorizontal from "../componentes/Lii/ListHorizontal";

import { Container, Row, Col } from "reactstrap";
import heroImage from "../assets/images/hero-img.png";

import products from "../assets/data/products.js";

import "../styles/home.css";
const Home = () => {
	const [trendingData, setTrendingData] = useState([]);
	const [bestSalesProducts, setBestSalesProducts] = useState([]);
	const [mobileProduct, setMobileProduct] = useState([]);
	const [wireLessProduct, setWireLessProduct] = useState([]);
	const [popularCategory, setPopularCategory] = useState([]);
	const year = new Date().getFullYear();

	useEffect(() => {
		const filterTrendingProducts = products.filter(
			(product) => product.category === "chair"
		);

		const filterBestSalesProducts = products.filter(
			(product) => product.category === "sofa"
		);

		const filterMobileProduct = products.filter(
			(product) => product.category === "mobile"
		);
		const filterWirelessProduct = products.filter(
			(product) => product.category === "wireless"
		);
		const filterPopularCategory = products.filter(
			(product) => product.category === "watch"
		);
            
		setTrendingData(filterTrendingProducts);
		setBestSalesProducts(filterBestSalesProducts);
		setMobileProduct(filterMobileProduct);
		setWireLessProduct(filterWirelessProduct);
		setPopularCategory(filterPopularCategory)
	}, []);
	return (
		<Helmet title={"Home"}>
			<section className="hero_section">
				<Container>
					<Row>
						<Col lg="6" md="6">
							<div className="hero_content">
								<p className="hero_subtitle">Trending product in {year}</p>
								<h2>Make Your life easier by using multimart </h2>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Perferendis, blanditiis!
								</p>
								<motion.button whileTap={{ scale: 1.2 }} className="buy_btn">
									<Link to="/shop">SHOP NOW</Link>
								</motion.button>
							</div>
						</Col>

						<Col lg="6" md="6">
							<img src={heroImage} alt="" />
						</Col>
					</Row>
				</Container>
			</section>
			<Services />

			<section className="trending_products margin">
				<Container>
					<Row>
						<Col lg="12" className="text-center">
							<h2 className="section_title">Trending Product</h2>
						</Col>
						<ProductList data={trendingData} />
					</Row>
				</Container>
			</section>

			<section className="best__sales margin">
				<Container>
					<Row>
						<Col lg="12" className="text-center">
							<h2 className="section_title">Best Sales</h2>
						</Col>
						<ProductList data={bestSalesProducts} />
					</Row>
				</Container>
			</section>

			<section className="new__arrivals margin">
				<Container>
					<Row>
						<Col lg="12" className="text-center">
							<h2 className="section_title">New Arrivals</h2>
						</Col>
						<ProductList data={mobileProduct} />
						<ProductList data={wireLessProduct} />
					</Row>
				</Container>
			</section>

			<section className="new__arrivals margin">
				<Container>
					<Row>
						<Col lg="12" className="text-center">
							<h2 className="section_title"> Popular in Category</h2>
						</Col>
						<ProductList data={popularCategory} />
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Home;
