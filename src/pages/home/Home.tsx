import { Typography } from "@mui/material";
import { PageContainer } from "components/index";
export default function Home() {
  return (
    <PageContainer title="Home">
      <Typography
        variant="h2"
        sx={{ textAlign: "center", fontWeight: 400, my: 5 }}
      >
        Edit this HOME page
      </Typography>
      
    </PageContainer>
  );
}
