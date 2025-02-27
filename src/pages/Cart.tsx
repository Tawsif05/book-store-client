/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

const { Meta } = Card;

const Cart = ({ product }: any) => {
  const { _id, author, price, description, title, imgUrl } = product; 
  const user = useAppSelector(selectCurrentUser);

  return (
    <Card
      hoverable
      style={{
        width: "400px",
        height: "500px",
      }}
      cover={
        <img
          alt="Book Cover"
          src={imgUrl}
          style={{ height: "300px",  }}
        />
      }
    >
      {/* Book Title & Description */}
      <Meta title={title} description={description} />

      {/* Author Name */}
      <p style={{ marginTop: "16px", fontWeight: "bold", color: "#555" }}>
        Author: {author}
      </p>

      {/* Price & View Details Button in same line */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#D35400",
          }}
        >
          <span style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>
            Price:
          </span>{" "}
          <b>৳</b>{price}
        </span>

        {/* View Details Button */}
        <Link to={user ? `/${user.role}/${_id}` : `/${_id}`}>
          <Button type="default">View Details</Button>
        </Link>
      </div>
    </Card>
  );
};

export default Cart;
