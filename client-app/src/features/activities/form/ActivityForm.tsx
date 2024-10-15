import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useStore } from "../../../app/store/store";

type FormFields = Omit<Record<keyof Activity, string>, "id">;

const ActivityForm = () => {
  const { activityStore } = useStore();
  const { selectedActivity, createOrEdit, closeForm, loading } = activityStore;
  const initialState: FormFields = useMemo(
    () => ({
      title: selectedActivity?.title || "",
      category: selectedActivity?.category || "",
      city: selectedActivity?.city || "",
      date: selectedActivity?.date || "",
      description: selectedActivity?.description || "",
      venue: selectedActivity?.venue || "",
    }),
    [selectedActivity]
  );
  const [formState, setFormState] = useState<FormFields>(initialState);

  useEffect(() => {
    if (!selectedActivity) {
      setFormState(initialState);
    }
  }, [selectedActivity, initialState, setFormState]);

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
    createOrEdit({
      id: selectedActivity ? selectedActivity.id : undefined,
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
          type="date"
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
        <Button
          floated="right"
          positive
          type="submit"
          content="Save"
          loading={loading}
          disabled={loading}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
          loading={loading}
          disabled={loading}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
