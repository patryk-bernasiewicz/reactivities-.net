import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";

import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/store/store";
import { getActivityRoute } from "../../../app/utils/routeHelpers";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  const { activityStore } = useStore();

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={getActivityRoute(activity.id)}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span style={{ display: "flex", gap: "2px" }}>
          <Icon name="clock" />
          <span>{activity.date}</span>
          <span
            style={{
              color: "#d0d0d0",
              display: "inline-block",
              margin: "0px 4px",
            }}
          >
            |
          </span>
          <Icon name="marker" />
          <span>{activity.venue}</span>
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={getActivityRoute(activity.id)}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
