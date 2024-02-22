import axios from "service/axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import React, { useEffect } from "react";
import { Page } from "components/index";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import ProjectCard from "components/cards/ProjectCard";
import SearchIcon from "@mui/icons-material/Search";
import {
  formatVideoDetails,
  getVideoDetails,
  getVideoName,
} from "utils/api/chat";
import FilterComponent from "components/filter/FilterComponent";
// import ConnectDataSource from "components/dialog/adSource/ConnectDataSource";
// import ConnectAd from "components/dialog/adSource/ConnectAd";

export interface MetaData {
  date: string;
  spend: string;
  impressions: string;
  clicks: string;
  purchases: string;
  revenue: string;
}
//date, spend, impressions, clicks, purchases, revenue
export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>([]);
  const [status, setStatus] = React.useState(false);
  // const [tab, setTab] = React.useState("All");

  //filters
  const [type, setType] = React.useState("All");
  const [source, setSource] = React.useState("All");
  const [sortBy, setSortBy] = React.useState("All");

  // function handleTab(event: React.SyntheticEvent, newValue: string) {
  //   setTab(newValue);
  // }
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const res = await axios.get(`/get_all_creatives`);

        let tempData: any[] = res.data;
        tempData = tempData.map((videoUrl: string) => {
          const videoName = getVideoName(videoUrl);
          return {
            name: decodeURIComponent(videoName),
            url: videoUrl,
            type: videoName.includes(".mp4") ? "video" : "image",
          };
        });
        let temp: any[] = [];
        const apiPromises = tempData.map(async (item: any, i: number) => {
          try {
            const data = await getVideoDetails(tempData[i].name);
            temp = formatVideoDetails(data, tempData[i], temp);
          } catch (error: any) {
            temp.push({
              metaData: {
                date: "",
                spend: "0",
                impressions: "0",
                clicks: "0",
                purchases: "0",
                revenue: "0",
              },
              allDetails: [],
              ...tempData[i],
            });
            console.log(error.message);
          }
        });
        await Promise.all(apiPromises);
        temp = temp.map((item: any, i: number) => {
          let tempName = item.name.split(".")[0];
          tempName = tempName.split("_");
          tempName = tempName.slice(0, tempName.length - 1).join("_");
          return {
            ...item,
            tempName,
          };
        });
        setData(temp);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getData();
  }, [status]);

  return (
    <Page title="Home">
      <Box
        display="flex"
        borderBottom="1px solid rgba(0,0,0,0.1)"
        justifyContent="space-between"
        height={58}
        mb={7}
      >
        <Box
          height="100%"
          display="flex"
          alignItems="center"
          minWidth={200}
          ml={4}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            My Library
          </Typography>
          <Divider
            sx={{ height: "70%", mt: 1, mx: 2 }}
            flexItem
            orientation="vertical"
          />
          <OutlinedInput
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              width: 170,
              "&:focus-within": {
                width: 200,
              },
              transition: "width 0.5s",
              bgcolor: "background.color-background-grey",
              maxHeight: 38,
              borderRadius: 100,
            }}
            startAdornment={
              <SearchIcon sx={{ color: "text.color-text-clickable" }} />
            }
            placeholder="Search"
          />
        </Box>
        <FilterComponent
          type={type}
          setType={setType}
          setSortBy={setSortBy}
          sortBy={sortBy}
          source={source}
          setSource={setSource}
        />
      </Box>
      <Container>
        {/* <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3">My library</Typography>
          <Stack spacing={1} direction="row" maxHeight="32px">
            <IconButton
              sx={{
                borderRadius: "4px",
                bgcolor: "background.primary",
                fontSize: 14,
                fontWeight: 400,
                width: 30,
              }}
              size="small"
            >
              All
            </IconButton>
            <Divider flexItem orientation="vertical" />
            <CustomIconButton src={youtubeImg} alt="Youtube" />
            <CustomIconButton src={instagramImg} alt="Instagram" />
            <CustomIconButton src={tiktokImg} alt="Tiktok" />
            <CustomIconButton src={facebookImg} alt="Facebook" />
          </Stack>
        </Stack> */}
        {/* <Tabs
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
          sx={{ my: 3 }}
          value={tab}
          onChange={handleTab}
        >
          {tabs.map((item: string, index: number) => (
            <Tab
              key={item}
              label={item}
              sx={{
                mr: 2,
              }}
              value={item}
            />
          ))}
        </Tabs> */}
        <Grid container spacing={3}>
          {loading &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Grid item xs={12} key={item} sm={6} md={4} lg={3}>
                <Skeleton
                  variant="rectangular"
                  height={276}
                  width={"100%"}
                  sx={{ borderRadius: "8px" }}
                />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
              </Grid>
            ))}
          {!loading &&
            data
              .filter((item: any) => {
                if (type === "All") return true;
                else if (type === "Videos") return item.type === "video";
                else return item.type === "image";
              })
              .map((item: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ProjectCard
                    setStatus={setStatus}
                    setData={setData}
                    {...item}
                  />
                </Grid>
              ))}
        </Grid>
      </Container>
    </Page>
  );
}
