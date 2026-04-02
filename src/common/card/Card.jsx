import "./Card.css";

const Card = ({ children }) => {
  return (
    <div className="card">
      {children ? (
        children
      ) : (
        <>
          <h2>Card Title</h2>
          <p>Card Content</p>
        </>
      )}
    </div>
  );
};

export default Card;
