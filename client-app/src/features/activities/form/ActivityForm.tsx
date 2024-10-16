import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/store/store";

type FormFields = Omit<Record<keyof Activity, string>, "id">;

const getInitialState = (activity?: Activity) => ({
  title: activity?.title || "",
  category: activity?.category || "",
  city: activity?.city || "",
  date: activity?.date || "",
  description: activity?.description || "",
  venue: activity?.venue || "",
});

const ActivityForm = observer(() => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { activityStore } = useStore();
  const { createOrEdit, loading, selectedActivity } = activityStore;

  const initialState: FormFields = useMemo(
    () => getInitialState(selectedActivity),
    [selectedActivity]
  );
  const [formState, setFormState] = useState<FormFields>(initialState);
  const prevInitialState = useRef(initialState);

  useEffect(() => {
    activityStore.loadSingleActivity(id);
  }, [activityStore, id]);

  useEffect(() => {
    if (
      JSON.stringify(prevInitialState.current) !== JSON.stringify(initialState)
    ) {
      setFormState(initialState);
      prevInitialState.current = initialState;
    }
  }, [initialState]);

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

  const handleSubmit = async (data: FormFields) => {
    createOrEdit({
      id: selectedActivity ? selectedActivity.id : undefined,
      ...data,
    });
    if (id) {
      navigate(`/activities/${id}`);
    } else {
      setFormState(initialState);
    }
  };

  const isValid = useMemo(
    () =>
      Object.keys(initialState).every((stateKey) => {
        const stateKey2 = stateKey as keyof typeof initialState;
        return (
          stateKey2 in formState &&
          typeof formState[stateKey2] === "string" &&
          formState[stateKey2].length > 0
        );
      }),
    [initialState, formState]
  );

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
          disabled={loading || !isValid}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          loading={loading}
          disabled={loading}
        />
      </Form>
    </Segment>
  );
});

export default ActivityForm;
