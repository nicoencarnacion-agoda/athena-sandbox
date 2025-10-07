import { Box, Typography } from "@mui/material";
import Layout from "../components/Layout";

export default function MyCases() {
  return (
    <Layout>
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" component="h1">
          My Cases
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Cases management functionality will be implemented here.
        </Typography>
      </Box>
    </Layout>
  );
}
