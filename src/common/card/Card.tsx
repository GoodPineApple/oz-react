import {
  Card as MuiCard,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

const Card = ({ children, sx }: CardProps) => {
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
