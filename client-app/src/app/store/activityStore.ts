import { computed, makeAutoObservable, observable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";

import { Activity } from "../models/activity";
import agent from "../api/agent";

export default class ActivityStore {
  activityRegistry = observable.map<string, Activity>();
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
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        runInAction(() => {
          this.activityRegistry.set(activity.id as string, activity);
        });
      });
    } catch (err) {
      console.error("[GET] Error! ", err);
    } finally {
      this.setLoadingStateInitial(false);
    }
  };

  loadSingleActivity = async (id: string) => {
    let activity = this.getActivityFromMemory(id);
    if (activity) {
      this.setSelectedActivity(activity);
    } else {
      this.setLoadingStateInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.setSelectedActivity(activity);
      } catch (error) {
        console.log("Load single error", error);
      }
      this.setLoadingStateInitial(false);
    }
  };

  private setSelectedActivity = (activity: Activity) => {
    runInAction(() => {
      activity.date = activity.date.split("T")[0];
      this.selectedActivity = activity;
    });
  };

  private getActivityFromMemory = (id: string) => {
    return this.activityRegistry.get(id);
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
    try {
      if (submittedActivity.id) {
        await agent.Activities.update(submittedActivity);
      } else {
        submittedActivity.id = uuid();
        await agent.Activities.create(submittedActivity);
      }
    } catch (error) {
      const errorActionType = submittedActivity.id ? "EDIT" : "CREATE";
      console.error(`[${errorActionType}] Error! `, error);
    } finally {
      this.updateActivity(submittedActivity);
      this.setLoadingState(false);
      this.setEditMode(false);
    }
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

  private updateActivity = (activity: Activity) => {
    runInAction(() => {
      this.activityRegistry.set(activity.id as string, activity);
      console.log("====", this.activityRegistry.get(activity.id as string));
    });
  };
}
