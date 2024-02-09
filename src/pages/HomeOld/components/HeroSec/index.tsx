
import { Paper, Container, Typography, Link, Box, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import logo from "../../../../assets/Overlay.png"

export default function HeroSec() {
  return (
    <Paper
      sx={{
        position: 'relative',
        minHeight: '80vh',
        py: "124px",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${logo})`,
      }}>
      <Container>
        <Box bgcolor="primary.main" maxWidth="768px" p="30px" borderRadius="6px">
          <Typography component="h1" variant="h1" color="primary.contrastText" marginBottom={"30px"} textTransform="capitalize">
            We ensure <Typography color="secondary" component="span" variant="h1"> The future </Typography> of <Typography color="secondary" component="span" variant="h1">patient care </Typography> is in safe hand
          </Typography>
          <Typography variant="body1" color="primary.contrastText" paragraph marginBottom={"30px"}>
            With more hospitals adopting electronic health records, a simulated EHR system lets nurse educators give students hands-on experience.
          </Typography>
          {/* <Link color="primary.contrastText" href="#">
            Learn more
            <ArrowForwardIcon />
          </Link> */}
          <Button aria-label="learn more" sx={{ color: "primary.contrastText", textTransform: "unset", textDecoration: "underline" }} endIcon={<ArrowForwardIcon />}>
            Learn more
          </Button>
        </Box>
      </Container>
    </Paper>
  );
}