import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { getActivitiesRoute } from "../../app/utils/routeHelpers";

const HomePage = () => (
  <Segment inverted textAlign="center" vertical className="masthead">
    <Container text>
      <Header as="h1" inverted>
        <Image
          size="massive"
          src="/assets/logo.png"
          alt="Logo"
          style={{ marginBottom: 12 }}
        />
        Reactivities
      </Header>
      <Header as="h2" inverted content="Welcome to Reactivities" />
      <Button as={Link} to={getActivitiesRoute()} size="huge" inverted>
        Take me to the Activities
      </Button>
    </Container>
  </Segment>
);

export default HomePage;
