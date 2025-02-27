const About = () => {
  return (
    <div>
    
      <div
        style={{
          marginTop: "0px",
          padding: "50px 50px",
          backgroundColor: "#E4FFFB",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "40px" }}>About Us</p>
      </div>

      <div
      className="sm:mx-10 !important"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center", 
          marginTop: "50px",
          width: "100%",
          height: "400px",
          
        }}
      >
        <img
          src="/image 3.png"
          alt="About Us"
          style={{
            width: "100%",
            maxWidth: "1200px",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 className="text-4xl font-bold">Our Successful Story</h1>
        <p
          className="max-w-[800px] mx-auto my-5 text-xl text-[#555]"
        >
          Since our establishment, we have been dedicated to providing
          high-quality books and exceptional services to book lovers. From local
          retail stores to e-commerce, we are growing every day to make books
          more accessible to everyone.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center", 
            alignItems: "flex-start", 
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            flexWrap: "wrap",
            maxWidth: "900px",
            gap: "30px", 
            marginBottom: "50px",
          }}
        >
          <div style={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
            <div style={{ marginBottom: "20px" }}>
              <h2 className="text-4xl font-bold">Retail Stores</h2>
              <p className="text-xl text-[#555] mt-5">
                We have multiple retail stores across different cities where
                book lovers can explore and purchase their favorite books in a
                cozy environment.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">Retail Services</h2>
              <p className="text-xl text-[#555] mt-5">
                We offer excellent customer service in our retail outlets,
                including book recommendations, personalized orders, and book
                signing events.
              </p>
            </div>
          </div>

          <div style={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
            <h2 className="text-4xl font-bold">E-commerce Services</h2>
            <p className="text-xl text-[#555] mt-5">
              Our online platform enables customers to browse and order books
              from anywhere, with fast delivery and a seamless shopping
              experience. We strive to make the process as simple and enjoyable
              as possible, offering a wide range of books across genres. Whether
              you’re looking for the latest bestsellers, educational resources,
              or timeless classics, our e-commerce platform provides a one-stop
              solution.In addition to a user-friendly interface, we offer secure payment
              options, customer reviews, and personalized book recommendations
              based on your reading preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
