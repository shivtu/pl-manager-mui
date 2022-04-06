import {
  GOV_ID_PROOF_TYPES,
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

export interface IUserDetails {
  userName: string;
  userEmail: string;
  userRole: string;
  password: string;
  confirmPassword: string;
  userPhoneNumber: string;
  userAddress: string;
  docType: GOV_ID_PROOF_TYPES | null;
  docId: string;
}

export interface IGovId {
  docType: string;
  docId: string;
}

export interface ICreateUserProfilePayload {
  userName: string;
  userEmail: string;
  userRole: string;
  userPhoneNumber: number;
  userAddress: string;
  userGovId: IGovId;
}

export interface ICreateUserPayload {
  userEmail: string;
  password: string;
  userRole: string;
  userProfile: string;
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

export type GovDocTypes =
  | GOV_ID_PROOF_TYPES.ADHAAR
  | GOV_ID_PROOF_TYPES.DRIVING_LICENSE
  | GOV_ID_PROOF_TYPES.OTHERS
  | GOV_ID_PROOF_TYPES.PAN_CARD
  | GOV_ID_PROOF_TYPES.PASSPORT
  | GOV_ID_PROOF_TYPES.RATION_CARD;
