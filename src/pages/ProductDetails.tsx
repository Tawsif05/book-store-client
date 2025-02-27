import { useState } from "react";
import { Button, Card, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/features/products/productApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart } from "../redux/features/cart/cartSlice";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { data: product, isLoading } = useGetProductByIdQuery(productId);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (!product) return <p className="text-center text-lg text-red-500">Product Not Found!</p>;

  const handleAddToCart = () => {
    if(!user){
      toast.message("Please login or register then add to cart");
      return;
    }
    if (!product?.data.quantity || product?.data.quantity < 1) {
      message.error("This product is out of stock!");
      return;
    }

    dispatch(
      addToCart({
        productId: product?.data._id, 
        title: product?.data.title,
        name: product?.data.name,
        price: product?.data.price,
        quantity,
        imgUrl: product?.data?.imgUrl, 
      })
    );

    message.success("Product added to cart!");
  };

  return (
    <div className="container mx-auto px-6 lg:px-20 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      
      <div className="flex justify-center">
        <img
          src={product?.data.imgUrl}
          alt={product?.data.title}
          className="w-full max-w-lg rounded-lg shadow-lg"
        />
      </div>

     
      <Card className="shadow-lg p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">{product?.data.title}</h1>
        <p className="text-gray-600 mb-4">{product?.data.description}</p>
        <p className="text-lg font-semibold text-red-600 mb-2">
           Price: <b>৳</b>{product?.data.price}
        </p>
        <p className="text-gray-500">📂 Category: {product?.data.category}</p>
        <p className="text-gray-500">✍ Author: {product?.data.author}</p>
        <p
          className={`text-sm font-medium ${
            product?.data.quantity > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product?.data.quantity > 0 ? "✅ In Stock" : "❌ Out of Stock"}
        </p>

       
        <div className="flex items-center gap-4 mt-4">
            <p className="text-xl font-bold">Quantity:</p>
          <Button
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            disabled={quantity <= 1}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4"
          >
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button
            onClick={() => setQuantity((prev) => Math.min(prev + 1, product?.data.quantity))}
            disabled={quantity >= product?.data.quantity}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4"
          >
            +
          </Button>
        </div>

        
        <Button
          type="primary"
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white"
          onClick={handleAddToCart}
          disabled={!product?.data.quantity || product?.data.quantity < 1} 
        >
          Add to Cart 🛒
        </Button>

        
        <Button
          onClick={() => navigate(-1)}
          className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white"
        >
          ← Back
        </Button>
      </Card>
    </div>
  );
};

export default ProductDetails;
