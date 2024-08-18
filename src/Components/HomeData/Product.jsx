import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

import ProductCard from "./ProductCard";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [range, setRange] = useState('');
    const [loading, setLoading] = useState(true);



    const numberOfPages = Math.ceil(totalProducts / itemsPerPage);
    const pages = Array.from({ length: numberOfPages }, (_, index) => index);

    const fetchProducts = (url) => {
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };



    useEffect(() => {
        fetchProducts(`http://localhost:5000/productRange?range=${range}`);
    }, [range]);

    useEffect(() => {
        fetchProducts(`http://localhost:5000/productBrand?brand=${brand}`);
    }, [brand]);

    useEffect(() => {
        fetchProducts(`http://localhost:5000/productCategory?category=${category}`);
    }, [category]);

    useEffect(() => {
        fetchProducts(`http://localhost:5000/productFind?name=${search}`);
    }, [search]);

    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
            .then(res => res.json())
            .then(data => setTotalProducts(data.count));
    }, []);

    useEffect(() => {
        fetchProducts(`http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}`);
    }, [currentPage, itemsPerPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.search.value);
    };

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
        setCurrentPage(0);
    };

    const handleItemsPerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
    };

    if (loading) return <LoadingSpinner />;
    return (
        <div className="container mx-auto mt-20">
            <section>
                <div className="text-center space-y-2 mb-5">
                    <h3 className="text-[#127cf5] font-bold py-5">~~~ Our All Products ~~~</h3>
                    <hr className="border-b-4 border-dashed w-1/6 mx-auto" />
                    <h1 className="lg:text-4xl text-2xl font-bold">Choose now what you want.</h1>
                    <hr className="border-b-4 border-dashed w-2/6 mx-auto" />
                </div>

                <div className="text-center">
                    <form onSubmit={handleSearch} className="mb-5">
                        <label className="input input-bordered flex items-center gap-2 max-w-sm mx-auto">
                            <input type="text" name="search" className="grow" placeholder="Search for a product" />
                            <button type="submit" className="btn btn-sm bg-[#FF3811]">Search</button>
                        </label>
                    </form>
                </div>

                <div className="md:flex items-center justify-between mb-5 gap-3">
                    <select onChange={handleChange(setBrand)} className="border p-3 rounded-md w-full lg:w-80 font-bold mx-auto gap-2 shadow-xl">
                        <option value="">Brand Name</option>
                        <option value="TimeElegance">TimeElegance</option>
                        <option value="MysteryReads">MysteryReads</option>
                        <option value="CoolBreeze">CoolBreeze</option>
                        <option value="UrbanStyle">UrbanStyle</option>
                        <option value="FitWalk">FitWalk</option>
                        <option value="InspireReads">InspireReads</option>
                    </select>

                    <select onChange={handleChange(setCategory)} className="border p-3 rounded-md w-full lg:w-80 font-bold gap-2 shadow-xl">
                        <option value="">Category Name</option>
                        <option value="Books">Books</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home Appliances">Home Appliances</option>
                        <option value="Electronics">Electronics</option>
                    </select>

                    <select onChange={handleChange(setRange)} className="border p-3 rounded-md w-full lg:w-80 font-bold gap-2 shadow-xl">
                        <option value="">Price Range</option>
                        <option value="Low">Low Price</option>
                        <option value="High">High Price</option>
                    </select>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))}
                </div>

                <div className="text-center mt-8 gap-5">
                    <button className="btn bg-[#ff1111]" onClick={handlePrevPage}>Prev</button>
                    {pages.map(page => (
                        <button
                            className={`btn ${currentPage === page ? 'selected' : ''}`}
                            onClick={() => setCurrentPage(page)}
                            key={page}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button className="btn bg-[#ff1111]" onClick={handleNextPage}>Next</button>

                    <select value={itemsPerPage} onChange={handleItemsPerPage} className="rounded-none ml-2 btn btn-sm border-none">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </section>
        </div>
    );
};

export default Product;
