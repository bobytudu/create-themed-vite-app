import React from "react";
import Page from "./Page";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

export default function PageContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Page title={title}>
      <Box p={7}>
        <Container>{children}</Container>
      </Box>
    </Page>
  );
}
