import { Helmet } from "react-helmet-async";
import NavBar from "../../Shared/NavBar";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const MyAddedProduct = () => {

    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    const totalPrice = users.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        fetch(`http://localhost:5000/addProduct/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setUsers(data);
            });
    }, [user]);

    const handleDelete = id => {
        //   // are you sure
        fetch(`http://localhost:5000/deleteProduct/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                //   console.log(data, id);
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "this form is deleted",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                    }).then(result => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                        }
                    });
                    const remaining = users.filter(info => info._id !== id);
                    setUsers(remaining);
                }
            });
    };



    return (
        <div>
            <Helmet>
                <title> ProductPlus | My Product</title>
            </Helmet>
            <div className="mt-20">
                <NavBar></NavBar>
            </div>

            <div className="flex justify-around text-xl lg:text-3xl">
                <p> totalProducts: {users?.length}</p>
                <p> totalPrice: {totalPrice}</p>
            </div>

            <div>
                <div className="min-h-[calc(100vh-256px)] lg:mx-10 mx-1  my-5 lg:p-3">
                    <table className="w-full  mx-1" data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000">
                        <thead>
                            <tr className="p-4 shadow-lg">
                                <th>no</th>
                                <th>name</th>
                                <th>image</th>
                                <th>delete</th>
                            </tr>
                        </thead>

                        {users?.map((data, i) => (
                            <tbody key={data._id}>
                                <tr className="border-2">
                                    <td>{(i = i + 1)}</td>
                                    <td>{data?.name}</td>
                                    <td>
                                        {(
                                            <img src={data?.image} className="rounded-full h-10 w-10" />
                                        )}
                                    </td>

                                    <td onClick={() => handleDelete(data._id)}>
                                        <MdDeleteForever className="text-4xl ml-10 text-red-500"></MdDeleteForever>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyAddedProduct;