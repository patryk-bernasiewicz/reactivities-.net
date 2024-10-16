import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

const HomePage = () => (
  <Container style={{ marginTop: "6rem" }}>
    <h1>Home page</h1>
    <h3>
      Go to <Link to="/activities">Activities</Link>
    </h3>
  </Container>
);

export default HomePage;
