import { Button, Stack, SxProps, Typography } from "@mui/material";
import { PageContainer } from "components/index";
import React from "react";
import { useNavigate } from "react-router-dom";
import useScreenSize from "utils/hooks/useScreenSize";

function CustomButton({
  children,
  color,
  onClick,
  sx,
}: {
  children: React.ReactNode;
  color: string;
  onClick?: () => void;
  sx?: SxProps;
}) {
  return (
    <Button
      variant="outlined"
      sx={{
        p: 5,
        fontSize: 24,
        border: 3,
        borderColor: color,
        color,
        mb: 3,
        borderRadius: 4,
        "&:hover": {
          backgroundColor: color,
          color: "white",
          border: 3,
          borderColor: color,
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const {xs, sm} = useScreenSize();
  return (
    <PageContainer title="Home">
      <Typography
        variant="h2"
        sx={{ textAlign: "center", fontWeight: 400, my: 5 }}
      >
        Affordable learning made accessible. Find quality teachers at
        competitive rates
      </Typography>
      <Stack justifyContent="center" spacing={xs ? 0 : sm?2: 3} flexWrap="wrap" direction="row">
        <CustomButton
          color="#2a3eb1"
          sx={{ p: { xs: 3, md: 5 }, borderRadius: { xs: 2, md: 4 } }}
          onClick={() => navigate("/teachers")}
        >
          Searching for a Teacher
        </CustomButton>
        <CustomButton
          color="#1769aa"
          sx={{ p: { xs: 3, md: 5 }, borderRadius: { xs: 2, md: 4 } }}
          onClick={() => navigate("/teachers/register")}
        >
          Apply as a Teacher
        </CustomButton>
      </Stack>
    </PageContainer>
  );
}
