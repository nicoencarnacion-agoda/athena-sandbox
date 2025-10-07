import { Box, Typography } from "@mui/material";
import Layout from "../components/Layout";

export default function ClickToMessaging() {
  return (
    <Layout>
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" component="h1">
          Click to Message
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Messaging functionality will be implemented here.
        </Typography>
      </Box>
    </Layout>
  );
}
