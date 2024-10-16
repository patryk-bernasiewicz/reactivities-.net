import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../app/store/store";
import AppLoader from "../../../app/layout/AppLoader";

const ActivityDetails = observer(() => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { activityStore } = useStore();
  const { selectedActivity, loadSingleActivity, deleteActivity } =
    activityStore;

  useEffect(() => {
    loadSingleActivity(id);
  }, [id, loadSingleActivity]);

  if (!selectedActivity) {
    return <AppLoader />;
  }

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span>{selectedActivity.date}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity.description}</Card.Description>
        <Card.Description>{selectedActivity.venue}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group width={2}>
          <Button
            basic
            color="blue"
            as={Link}
            to={`/editActivity/${selectedActivity.id}`}
            content="Edit"
          />
          <Button
            basic
            color="grey"
            as={Link}
            to="/activities"
            content="Cancel"
          />
          <Button
            basic
            color="red"
            content="Delete"
            onClick={async () => {
              await deleteActivity(selectedActivity);
              navigate("/activities");
            }}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});

export default ActivityDetails;
