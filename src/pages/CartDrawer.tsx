/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  removeFromCart,
  updateQuantity,
  closeCart,
} from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartData = useAppSelector((state) => state.cart);

  const handleProceedToCheckout = () => {
    navigate("/checkout");
    dispatch(closeCart());
  };

  return (
    <Drawer
      title="Your Cart"
      placement="right"
      onClose={() => dispatch(closeCart())}
      open={cartData.isCartOpen}
    >
      {cartData.items.length > 0 ? (
        <div>
          {cartData.items.map((item: any) => (
            <div key={item.productId} className="flex gap-4 items-center mb-4">
              <img
                src={item.imgUrl}
                alt={item.name}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium">{item.title}</h4>
                <p className="text-gray-600 text-sm mt-2">৳{item.price}</p>

                <div className="flex items-center gap-2 mt-4">
                  <p className="font-semibold">Quantity:</p>
                  <Button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.productId,
                          quantity: Math.max(item.quantity - 1, 1),
                        })
                      )
                    }
                    size="small"
                  >
                    -
                  </Button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <Button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.productId,
                          quantity: Math.min(
                            item.quantity + 1,
                            item.stock || 99
                          ),
                        })
                      )
                    }
                    size="small"
                  >
                    +
                  </Button>
                </div>
                <p className="text-sm mt-4 font-semibold">
                  Total: ৳{(item.quantity * item.price).toFixed(2)}
                </p>
              </div>

              <Button
                type="text"
                danger
                onClick={() => dispatch(removeFromCart(item.productId))}
              >
                Remove
              </Button>
            </div>
          ))}

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between">
              <span className="font-medium">Total Quantity:</span>
              <span>{cartData.totalQuantity}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium">Total Price:</span>
              <span>৳{cartData.totalPrice.toFixed(2)}</span>
            </div>
            <Button onClick={handleProceedToCheckout} type="primary" className="mt-4 w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </Drawer>
  );
};

export default CartDrawer;
