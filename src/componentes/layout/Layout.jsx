import React from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import Routers from "../../routers/routes";

const Layout = () => {
	return (
		<>
			<Header />
			<div>
				<Routers />
			</div>
			<Footer />
		</>
	);
};

export default Layout;
