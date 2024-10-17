export const getActivitiesRoute = () => `/activities`;

export const getActivityRoute = (id?: string) => {
  if (!id) {
    throw new Error("Missing activity ID!");
  }

  return `/activities/${id}`;
};
