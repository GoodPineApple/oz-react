import {
  Card as MuiCard,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";

const Card = ({ children, sx }) => {
  return (
    <MuiCard variant="outlined" sx={sx}>
      {children ? (
        children
      ) : (
        <>
          <CardHeader title="Card Title" />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Card Content
            </Typography>
          </CardContent>
        </>
      )}
    </MuiCard>
  );
};

export default Card;
