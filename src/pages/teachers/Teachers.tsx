import { PageContainer } from "components/index";
import dummyData from "./dummy.json";
import { Box, Grid, Typography } from "@mui/material";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";

export default function Teachers() {
  const navigate = useNavigate();
  return (
    <PageContainer title="Teachers">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Find teachers
      </Typography>
      <Grid container spacing={2}>
        {dummyData.map((teacher: any, index: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
                cursor: "pointer",
                transition: "0.4s ease",
                "&:hover":{
                    boxShadow: 5
                }
              }}
              onClick={() => navigate(`/teachers/${teacher.id}`)}
            >
              <Image
                preview={false}
                src="https://source.unsplash.com/random/300x200"
                style={{ width: "100%", height: 200 }}
                alt={teacher.name}
              />
              <Box p={3}>
                <Typography variant="h6">{teacher.name}</Typography>
                <Typography variant="subtitle1">{teacher.email}</Typography>
                <Typography variant="subtitle1">{teacher.location}</Typography>
                <Typography variant="subtitle1">
                  {teacher.specialization}
                </Typography>
                <Typography variant="subtitle1">
                  {teacher.experience}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
