import { Button, Chip, Grid, Stack, Typography } from "@mui/material";
import { Image } from "antd";
import { PageContainer } from "components/index";
import dummyData from "./dummy.json";
import { Icon } from "@iconify/react";
import Card from "components/container/Card";
import TextContainer from "components/container/TextContainer";

export default function TeacherProfile() {
  const data = dummyData[0];
  return (
    <PageContainer title="Teacher Profile">
      <Card sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Image
              src="https://source.unsplash.com/random/300x300"
              style={{ width: 300, height: 300, borderRadius: 8 }}
              alt={data.name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Stack justifyContent="space-between" sx={{ height: "100%" }}>
              <div>
                <Typography variant="h3">{data.name}</Typography>
                <TextContainer>
                  <Icon
                    icon="iconamoon:email-thin"
                    style={{ marginRight: 4 }}
                  />
                  <Typography variant="subtitle1"> {data.email}</Typography>
                </TextContainer>
                <TextContainer>
                  <Icon icon="mynaui:location" style={{ marginRight: 4 }} />
                  <Typography variant="subtitle1">{data.location}</Typography>
                </TextContainer>
                <TextContainer>
                  <Icon icon="carbon:tool-kit" style={{ marginRight: 4 }} />
                  <Typography variant="subtitle1">
                    {data.specialization}
                  </Typography>
                </TextContainer>
                <TextContainer>
                  <Icon icon="noto-v1:man-teacher" style={{ marginRight: 4 }} />
                  <Typography variant="subtitle1">{data.experience}</Typography>
                </TextContainer>
                <TextContainer>
                  <Icon icon="oui:globe" style={{ marginRight: 4 }} />
                  <Typography variant="subtitle1">{data.timezone}</Typography>
                </TextContainer>
                <TextContainer>
                  <Icon icon="svg-spinners:clock" style={{ marginRight: 4 }} />
                  <Typography variant="subtitle1">
                    {data.availability}
                  </Typography>
                </TextContainer>
              </div>
              <Stack
                direction="row"
                spacing={2}
                mt={2}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <Chip
                  label="Send message"
                  onDelete={() => {}}
                  deleteIcon={<Icon icon="radix-icons:paper-plane" />}
                  onClick={() => {}}
                />
                <Chip
                  label="Request availability"
                  deleteIcon={<Icon icon="iconoir:clock" />}
                  onDelete={() => {}}
                  onClick={() => {}}
                />
              </Stack>
              <Stack
                spacing={1}
                sx={{ display: { xs: "flex", md: "none" }, mt: 2 }}
              >
                <Button
                  variant="outlined"
                  endIcon={<Icon icon="radix-icons:paper-plane" />}
                >
                  Send message
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<Icon icon="iconoir:clock" />}
                >
                  Request availability
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
      <Card>
        <Typography variant="h5">History</Typography>
        <Typography variant="body1">
          The classroom wasn't always a room with four walls for me. It's been a
          bustling marketplace in Morocco, a sun-drenched beach in Bali, and a
          windswept yurt in Mongolia. As a travelling teacher, the world has
          been my curriculum, and every experience, a lesson learned. Let me
          tell you about my journey. My first 'classroom' was a rural village
          school in India. The dusty floor and rickety benches held eager eyes
          brimming with a thirst for knowledge that transcended language and
          resources. Here, I learned that teaching isn't just about imparting
          facts, it's about igniting a fire within young minds, even in the face
          of limitations. Adventure then lured me to Morocco, where I taught
          English in a bustling marketplace. The classroom was a cacophony of
          languages, smells, and sights, a constant reminder that learning
          happens everywhere, not just within rigid structures. My students were
          shopkeepers, artisans, and aspiring entrepreneurs, each with their own
          unique story to tell. I learned the power of flexibility and adapting
          lessons to diverse needs and learning styles. Next, I found myself on
          the shores of Bali, teaching English to children in a school nestled
          amidst rice paddies. The open-air classroom, the rhythm of waves
          crashing in the distance, and the laid-back island culture taught me
          the importance of mindfulness and incorporating the natural world into
          learning. We held poetry readings under the stars, wrote stories
          inspired by the ocean, and learned about sustainability by planting
          trees together. A different kind of adventure awaited me in Mongolia,
          where I taught English in a traditional yurt.
        </Typography>
      </Card>
    </PageContainer>
  );
}
