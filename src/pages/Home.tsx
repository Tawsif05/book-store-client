/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Spin } from "antd"; // ✅ Spin Import
import CarouselUI from "../components/ui/CarouselUI";
import { useGetAllProductQuery } from "../redux/features/products/productApi";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import Blogs from "../components/ui/Blogs";

const Home = () => {
  const { data, isLoading } = useGetAllProductQuery(undefined); 
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      <CarouselUI />

      <div className="h-36 flex justify-center items-center">
        <h1 className="text-5xl font-bold text-center text-gray-800">
          New & Trending Books
        </h1>
      </div>

      
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {data?.data?.result.map((product: any) => (
            <Cart product={product} key={product._id} />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center h-20 mt-8">
        <Link to={user ? `/${user.role}/all-product` : "/all-product"}>
          <Button>View All Products</Button>
        </Link>
      </div>

      <div className="h-28 flex justify-center items-center">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
          New & Trending Blogs
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center mx-12 mb-6">
        <Blogs />
      </div>
    </>
  );
};

export default Home;
