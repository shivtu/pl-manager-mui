import {
  PROJECT_STAGE,
  PROJECT_STATUS,
  PROJECT_TASK,
  PROJECT_TYPE,
} from './enums';

export type UserRoleTypes =
  | 'admin'
  | 'designer'
  | 'production'
  | 'assembly'
  | 'purchases';

export interface ILoggedInUser {
  _id: string;
  userName: string;
  userEmail: string;
  isActive: boolean;
  userRole: UserRoleTypes;
  userPhoneNumber: number;
  userAddress: string;
  userGovId: {
    docType: string;
    docId: string;
  };
  createdAt: Date;
}

export interface IProjectResponseData {
  projectRequirements: string[];
  _id: string;
  projectName: string;
  summary: string;
  description: string;
  projectType: PROJECT_TYPE;
  currentOwner: ICurrentOwner;
  stage: PROJECT_STAGE;
  status: PROJECT_STATUS;
  createdAt: string;
}

export interface IProjectResponse {
  success: boolean;
  count: number;
  data: IProjectResponseData[];
}

export interface INewProjectData {
  projectRequirements: string[];
  projectName: string;
  summary: string;
  description?: string;
  projectType: PROJECT_TYPE;
  currentOwner: ICurrentOwner;
  stage: PROJECT_STAGE;
  status: PROJECT_STATUS;
}

export interface IInfiniteListColumn {
  id: string;
  placeHolder: string;
}

export interface IDesignTaskData {
  componentName: string;
  cost?: number;
  process: string;
}

export interface ICurrentOwner {
  userId: string;
  userName: string;
  userEmail: string;
  userPhoneNumber: number;
}

export interface IDesign {
  _id: string;
  parentProjectName: string;
  parentProjectId: string;
  components: IDesignTaskData[];
  status: PROJECT_STATUS;
  createdAt: Date;
  completedAt?: Date;
  currentOwner: ICurrentOwner;
}

export interface IAppState {
  token?: string;
  loggedInUser?: ILoggedInUser;
  projects?: IProjectResponseData[];
  designs?: IDesign[];
}

export interface IAppStateAction {
  type: string;
  payload: IAppState;
}

export interface IMessageDialogProps {
  dialogTitle?: string;
  dialogContent?: string;
  dialogActions?: JSX.Element;
  open: boolean;
  dialogType: 'error' | 'success';
  onClose?: () => void;
}

export type ProjectTypeTypes =
  | PROJECT_TYPE.EXISTING_MACHINE
  | PROJECT_TYPE.RD_NEW_MACHINE
  | PROJECT_TYPE.OTHERS;

export type ProjectStatusTypes =
  | PROJECT_STATUS.CREATED
  | PROJECT_STATUS.ACCEPTED
  | PROJECT_STATUS.COMPLETED
  | PROJECT_STATUS.IN_PROGRESS
  | PROJECT_STATUS.ON_HOLD;

export type ProjectStageTypes =
  | PROJECT_STAGE.CREATING_PURCHASE_ORDER
  | PROJECT_STAGE.DELIVERY
  | PROJECT_STAGE.DESIGNING
  | PROJECT_STAGE.ESTIMATING_COST
  | PROJECT_STAGE.GENESIS
  | PROJECT_STAGE.IN_PRODUCTION;

export type ProjectTaskTypes =
  | PROJECT_TASK.ASSEMBLY
  | PROJECT_TASK.DESIGN
  | PROJECT_TASK.PURCHASES
  | PROJECT_TASK.TESTING;
