import { useEffect, useState } from "react";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [count, setCount] = useState(0)
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [range, setRange] = useState('');


    useEffect(() => {
        fetch(`http://localhost:5000/productRange?range=${range}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [range])

    const handleRange = e => {
        e.preventDefault();
        const data = e.target.value
        setRange(data)
    }


    useEffect(() => {
        fetch(`http://localhost:5000/productBrand?brand=${brand}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [brand])

    const handleBrand = e => {
        e.preventDefault();
        const data = e.target.value
        setBrand(data)
    }

    useEffect(() => {
        fetch(`http://localhost:5000/productCategory?category=${category}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [category])

    const handleCategory = e => {
        e.preventDefault();
        const data = e.target.value
        setCategory(data)
    }


    useEffect(() => {
        fetch(`http://localhost:5000/productFind?name=${search}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [search])
    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearch(searchText)
    }

    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, itemsPerPage]);

    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPage(val);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }
    return (
        <div className="container mx-auto mt-20">
            <section>
                <div className='text-center space-y-2 mb-5'>
                    <h3 className='text-[#127cf5] font-bold'>~~~ Our All Product ~~~</h3>
                    <hr className='border-b-4 border-dashed w-1/6 mx-auto' />
                    <h1 className='lg:text-6xl text-3xl font-bold'>chose now What you want.</h1>
                    <hr className='border-b-4 border-dashed w-2/6 mx-auto' />
                </div>
                <div className="">
                    <div className="text-center">
                        <form onSubmit={handleSearch} className="mb-5">
                            <label className="input input-bordered flex items-center gap-2 max-w-sm mx-auto">
                                <input type="text" name="search" className="grow " placeholder="Please search your Product name" />
                                <button className="btn btn-sm bg-[#FF3811]">Search</button>
                            </label>
                        </form>
                    </div>
                    <div className="md:flex items-center justify-between mb-5 gap-3">
                        <div>
                            <select onClick={handleBrand} name=''
                                id=''
                                className='border p-3 rounded-md w-full lg:w-80 font-bold mx-auto gap-2 shadow-xl'>
                                <option value="">Brand Name</option>
                                <option value="apple">Apple</option>
                                <option value="hp">HP</option>
                                <option value="asus">Asus</option>
                                <option value="lenovo">Lenovo</option>
                                <option value="oppo">Oppo</option>
                                <option value="vivo">vivo</option>
                                <option value="samsung">Samsung</option>
                                <option value="acer">Acer</option>
                                <option value="huawei">Huawei</option>
                                <option value="google">Google</option>
                                <option value="microsoft">Microsoft</option>
                                <option value="sony">Sony</option>
                                <option value="dell">Dell</option>
                            </select>
                        </div>
                        <div>
                            <select onClick={handleCategory} name=''
                                id=''
                                className='border p-3 rounded-md w-full lg:w-80 font-bold gap-2 shadow-xl'>
                                <option value="">Category Name</option>
                                <option value="Books">Books</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Home Appliances">Home Appliances</option>
                                <option value="Electronics">Electronics</option>
                            </select>
                        </div>
                        <div>
                            <select name='' onClick={handleRange}
                                id=''
                                className='border p-3 rounded-md w-full lg:w-80 font-bold gap-2 shadow-xl'>
                                <option value="">Price Range</option>
                                <option value="low">Low price</option>
                                <option value="high">High price</option>
                            </select>
                        </div>
                    </div>
                    <div className=" grid md:grid-cols-3 gap-8">
                        {
                            products.map(product => <div key={product._id} className="card bg-base-100 w-full rounded-none shadow-xl border">
                                <figure>
                                    <img className="h-96"
                                        src={product.image}
                                        alt="404 img" />
                                </figure>
                                <div className="card-body">
                                    <div className="flex justify-between gap-3">
                                        <p className="border-2 border-[#ff1111] rounded-xl text-center bg-red-200"><span className="font-bold">Rating:</span> {product.ratings}</p>
                                        <p className="border-2 border-[#ff1111] rounded-xl text-center bg-red-200"><span className="font-bold">price:</span> {product.price}</p>
                                    </div>
                                    <hr />
                                    <h2 className="text-2xl font-bold">{product.name}</h2>
                                    <p><span className="font-bold">Description: </span>{product.description}</p>
                                    <p><span className="font-bold">Category Name: </span>{product.category}</p>
                                    <p><span className="font-bold">Date: </span>{product.createdAt}</p>
                                    <div className="card-actions">
                                        <button className="btn btn-sm bg-[#ff1111] w-full">Buy Now</button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className='text-center mt-8 gap-5'>
                        {/* <p>Current page: {currentPage}</p> */}
                        <button className=" btn bg-[#ff1111]" onClick={handlePrevPage}>Prev</button>
                        {
                            pages.map(page => <button
                                className={currentPage === page ? 'selected' : undefined}
                                onClick={() => setCurrentPage(page)}
                                key={page}
                            >{page}</button>)
                        }
                        <button className=" btn bg-[#ff1111]" onClick={handleNextPage}>Next</button>
                        <select value={itemsPerPage} onChange={handleItemsPerPage} className="rounded-none ml-2 btn btn-sm border-none">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">40</option>
                        </select>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Product;