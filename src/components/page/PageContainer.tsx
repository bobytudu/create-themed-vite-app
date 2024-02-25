import React from "react";
import Page from "./Page";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import useScreenSize from "utils/hooks/useScreenSize";

export default function PageContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const {
    sm,
    xs,
    md,
    lg
  } = useScreenSize();
  const padding = sm || xs ? 0 : md ? 2 : lg ? 4 : 6;
  return (
    <Page title={title}>
      <Box p={padding} pt={2}>
        <Container>{children}</Container>
      </Box>
    </Page>
  );
}
