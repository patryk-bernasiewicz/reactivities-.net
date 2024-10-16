import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import { useStore } from "../store/store";

const Navbar = () => {
  const { activityStore } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
            onClick={() => activityStore.clearSelectedActivity()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
