import { Button, Card } from "antd";

const { Meta } = Card;

const Blogs = () => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 w-full mx-auto justify-center items-center gap-6" >
      <Card
        hoverable
        style={{
          width: "100%", // Card width
          height: "500px", // Card height
        }}
        cover={
          <img
            alt="Book Cover"
            src="/The Great Adventure.jpeg"
            style={{ width: "100%",height: "320px", imageRendering: "auto" }}
          />
        }
      >
        {/* Book Title & Description */}
        <Meta title="The Great Adventure" description="An exciting journey through time" />

        {/* Author Name */}
        <p style={{ marginTop: "16px", fontWeight: "bold", color: "#555" }}>
          Author: John Doe
        </p>

        {/* View Details Button */}
        <Button type="default" className="mt-4">View Details</Button>
      </Card>
      <Card
        hoverable
        style={{
          width: "100%", // Card width
          height: "500px", // Card height
        }}
        cover={
          <img
            alt="Book Cover"
            src="/Mystery of the Lost Island.jpeg"
            style={{ width: "100%",height: "320px", imageRendering: "auto" }} 
          />
        }
      >
        {/* Book Title & Description */}
        <Meta title="Mystery of the Lost Island" description="A thrilling mystery novel." />

        {/* Author Name */}
        <p style={{ marginTop: "16px", fontWeight: "bold", color: "#555" }}>
          Author: Jane Smith
        </p>

        {/* View Details Button */}
        <Button className="mt-4" type="default">View Details</Button>
      </Card>
      <Card
        hoverable
        style={{
          width: "100%", 
          height: "500px", 
        }}
        cover={
          <img
            alt="Book Cover"
            src="/Science for Beginners.jpeg"
            style={{ width: "100%",height: "320px", imageRendering: "auto" }} // Image styling
          />
        }
      >
        {/* Book Title & Description */}
        <Meta title="Science for Beginners" description="A guide to understanding science" />

        {/* Author Name */}
        <p style={{ marginTop: "16px", fontWeight: "bold", color: "#555" }}>
          Author: Albert Newton
        </p>

        {/* View Details Button */}
        <Button className="mt-4" type="default">View Details</Button>
      </Card>
      <Card
        hoverable
        style={{
          width: "100%", 
          height: "500px", 
        }}
        cover={
          <img
            alt="Book Cover"
            src="/Mastering React.jpeg"
            style={{ width: "100%",height: "320px", imageRendering: "auto" }} 
          />
        }
      >
        {/* Book Title & Description */}
        <Meta title="Mastering React" description="Learn React with real-world projects" />

        {/* Author Name */}
        <p style={{ marginTop: "16px", fontWeight: "bold", color: "#555" }}>
          Author: Sarah Lee
        </p>

        {/* View Details Button */}
        <Button className="mt-4" type="default">View Details</Button>
      </Card>
      
    </div>
  );
};

export default Blogs;
