import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  onCancelActivity: () => void;
  handleDeleteActivity: (activity: Activity) => void;
  openForm: (acitvity?: Activity) => void;
}

const ActivityDetails = ({
  activity,
  onCancelActivity,
  handleDeleteActivity,
  openForm,
}: Props) => {
  return (
    <Card>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group width={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => openForm(activity)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={onCancelActivity}
          />
          <Button
            basic
            color="red"
            content="Delete"
            onClick={() => handleDeleteActivity(activity)}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
