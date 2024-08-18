import { Helmet } from "react-helmet-async";
import Product from "../../Components/HomeData/Product";
import NavBar from "../../Shared/NavBar";
// import Banner from "../../Components/HomeData/Banner";
// import Member from "../../Components/HomeData/Member";
// import Product from "../../Components/HomeData/Product";
// import Review from "../../Components/HomeData/Review";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> ProductPlus | Home</title>
            </Helmet>
            <div className="mt-20">
            <NavBar></NavBar>
            </div>
            {/* <Banner/> */}
          <div className="my-5">
          <Product/>
          </div>
            {/* <Member/>
            <Review/> */}
        </div>
    );
};

export default Home;