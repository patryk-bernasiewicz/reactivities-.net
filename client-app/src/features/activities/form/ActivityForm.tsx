import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props {
  activity?: Activity;
  handleCreateOrEditActivity: (activity: Activity) => void;
  closeForm: () => void;
}

type FormFields = Omit<Record<keyof Activity, string>, "id">;

const ActivityForm = ({
  activity,
  handleCreateOrEditActivity,
  closeForm,
}: Props) => {
  const initialState: FormFields = {
    title: activity?.title || "",
    category: activity?.category || "",
    city: activity?.city || "",
    date: activity?.date || "",
    description: activity?.description || "",
    venue: activity?.venue || "",
  };
  const [formState, setFormState] = useState<FormFields>(initialState);

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => {
      if (!(name in prevState)) {
        return prevState;
      }

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (data: FormFields) => {
    handleCreateOrEditActivity({
      id: activity ? activity.id : undefined,
      ...data,
    });
  };

  return (
    <Segment clearing>
      <Form onSubmit={() => handleSubmit(formState)}>
        <Form.Input
          placeholder="Title"
          name="title"
          value={formState.title}
          onChange={handleFieldChange}
        />
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={formState.description}
          onChange={handleFieldChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={formState.category}
          onChange={handleFieldChange}
        />
        <Form.Input
          placeholder="Date"
          name="date"
          value={formState.date}
          onChange={handleFieldChange}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={formState.city}
          onChange={handleFieldChange}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          value={formState.venue}
          onChange={handleFieldChange}
        />
        <Button floated="right" positive type="submit" content="Save" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
