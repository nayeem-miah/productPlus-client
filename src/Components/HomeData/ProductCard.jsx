import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const ProductCard = ({ product }) => {
    const { name, description, category, price, ratings, image } = product;
    const { user } = useAuth();
    const email = user?.email;
    // console.log(email);

    const handleAddToCart = () => {
        const newData = {
            user, name, description, category, price, ratings, image
        }
        fetch('https://product-plus-server.vercel.app/addProduct', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log(data);
                    toast.success("Your data added  successfully");
                }
            });
    }
    return (
        <div className="card bg-base-100 w-full rounded-none shadow-xl border">
            <figure>
                <img className="h-52" src={product.image} alt="Product" />
            </figure>
            <div className="card-body">
                <div className="flex justify-between gap-3">
                    <p className="border-2 border-[#ff1111] rounded-xl text-center bg-red-200"><span className="font-bold">Rating:</span> {product.ratings}</p>
                    <p className="border-2 border-[#ff1111] rounded-xl text-center bg-red-200"><span className="font-bold">Price:</span> {product.price}</p>
                </div>
                <hr />
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p><span className="font-bold">Description: </span>{product.description}</p>
                <p><span className="font-bold">Category Name: </span>{product.category}</p>
                <p><span className="font-bold">Date: </span>{product.createdAt}</p>
                <div className="card-actions">
                    <button onClick={handleAddToCart} className="btn btn-sm bg-[#ff1111] w-full">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;