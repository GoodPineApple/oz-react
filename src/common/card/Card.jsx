import { Card as MuiCard, CardHeader, CardContent } from "@mui/material";

const Card = ({ children }) => {
  return (
    <MuiCard>
      {children ? (
        children
      ) : (
        <>
          <CardHeader title="Card Title" />
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </>
      )}
    </MuiCard>
  );
};

export default Card;
