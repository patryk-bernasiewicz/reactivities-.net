import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const { selectedActivity, clearSelectedActivity, deleteActivity, openForm } =
    activityStore;

  if (!selectedActivity) {
    return null;
  }

  return (
    <Card>
      <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span>{selectedActivity.date}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group width={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => openForm(selectedActivity)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={clearSelectedActivity}
          />
          <Button
            basic
            color="red"
            content="Delete"
            onClick={() => deleteActivity(selectedActivity)}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
