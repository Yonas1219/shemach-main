import React from "react";
import ProductCard from "./ProductCard";

const ListHorizontal = ({data}) => {
	return (
		<div className="container-fluid py-2" style={{ overflowX: "auto", height:"400px" }}>
			<div className="d-flex flex-row flex-nowrap">
				{data?.map((item) => (
					<ProductCard item={item} />
				))}
			</div>
		</div>
	);
};

export default ListHorizontal;
