import { computed, makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";

import { Activity } from "../models/activity";
import agent from "../api/agent";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity?: Activity = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this, {
      sortedActivities: computed,
    });
  }

  loadActivities = async () => {
    try {
      runInAction(async () => {
        const activities = await agent.Activities.list();
        activities.forEach((activity) => {
          activity.date = activity.date.split("T")[0];
          this.activityRegistry.set(activity.id as string, activity);
        });
      });
    } catch (err) {
      console.error("[GET] Error! ", err);
    } finally {
      this.setLoadingStateInitial(false);
    }
  };

  selectActivity = (activity: Activity) => {
    runInAction(() => {
      this.selectedActivity = activity;
    });
  };

  clearSelectedActivity = () => {
    runInAction(() => {
      this.selectedActivity = undefined;
    });
  };

  createOrEdit = async (submittedActivity: Activity) => {
    this.setLoadingState(true);

    if (submittedActivity.id) {
      try {
        await agent.Activities.update(submittedActivity);
      } catch (err) {
        console.error("[UPDATE] Error! ", err);
      }
    } else {
      try {
        submittedActivity.id = uuid();
        await agent.Activities.create(submittedActivity);
      } catch (err) {
        console.error("[CREATE] Error! ", err);
      }
    }

    runInAction(() => {
      this.activityRegistry.set(
        submittedActivity.id as string,
        submittedActivity
      );
    });
    this.setLoadingState(false);
    this.setEditMode(false);
  };

  openForm = (activity?: Activity) => {
    if (activity) {
      this.selectActivity(activity);
    } else {
      this.clearSelectedActivity();
    }
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  deleteActivity = async (deletedActivity: Activity) => {
    if (!deletedActivity.id) {
      return;
    }

    await agent.Activities.delete(deletedActivity.id);
    this.activityRegistry.delete(deletedActivity.id);
  };

  get activities() {
    return Array.from(this.activityRegistry, ([, value]) => value);
  }

  get sortedActivities() {
    return this.activities
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  private setLoadingStateInitial = (state: boolean) => {
    runInAction(() => {
      this.loadingInitial = state;
    });
  };

  private setLoadingState = (state: boolean) => {
    runInAction(() => {
      this.loading = state;
    });
  };

  private setEditMode = (state: boolean) => {
    runInAction(() => {
      this.editMode = state;
    });
  };
}
