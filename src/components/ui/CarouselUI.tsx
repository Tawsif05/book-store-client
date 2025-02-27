import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: "360px",
  display: "flex",
  justifyContent: "between", // Text left & image right
  alignItems: "center",
  textAlign: "left", // Text left aligned
  background: "#0B7C6B",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "bold",
  padding: "0 50px", // Give space inside
};

const textContainer: React.CSSProperties = {
  flex: 1, // Takes 50% width
  padding: "50px",
  textWrap: "wrap"
};

const imageContainer: React.CSSProperties = {
  flex: 1, // Takes 50% width
  display: "flex",
  justifyContent: "center",
};

const CarouselUI = () => {
    return (
        <Carousel autoplay>
      <div>
        <div style={contentStyle}>
          {/* Left Side Text */}
          <div style={textContainer}>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}>
              SPECIAL OFFER
            </p>
            <p style={{ fontSize: "44px", fontWeight: "bolder" }}>
              There is nothing better than to read
            </p>
            <p style={{ fontSize: "14px", marginTop: "5px" }}>
              Find The Perfect Gift For Everyone On Your List
            </p>
            <p className="mt-2 text-sm">
              SHOP NOW
            </p>
            
          </div>

          {/* Right Side Image */}
          <div style={imageContainer}>
            <img
              src="../../public/image-removebg-preview.png" 
              alt="Book Sale"
              style={{ width: "400px", height: "250px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <div>
        <div style={contentStyle}>
          <div style={textContainer}>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}>
              SPECIAL OFFER
            </p>
            <p style={{ fontSize: "44px", fontWeight: "bolder" }}>
              New and Trending
            </p>
            <p style={{ fontSize: "14px", marginTop: "5px" }}>
              Explorer new worlds from authors
            </p>
          </div>
          <div style={imageContainer}>
            <img
              src="../../public/image 1.png"
              alt="Slide 2"
              style={{ width: "500px", height: "250px" }}
            />
          </div>
        </div>
      </div>

      <div>
        <div style={contentStyle}>
          <div style={textContainer}>
          <p style={{ fontSize: "14px", marginBottom: "5px" }}>JOIN THOUSANDS OF HAPPY READERS - EXPLORE OUR TOP PICKS!</p>
            <p style={{ fontSize: "44px", fontWeight: "bolder" }}>FIND YOUR NEXT FAVORITE BOOK</p>
            <p style={{ fontSize: "14px", marginTop: "5px" }}>
            From fiction to self-help - Your perfect book awaits!
            </p>
          </div>
          <div style={imageContainer}>
            <img
              src="../../public/image 2.png"
              alt="Slide 3"
              style={{ width: "500px", height: "250px" }}
            />
          </div>
        </div>
      </div>
    </Carousel>
    );
};

export default CarouselUI;