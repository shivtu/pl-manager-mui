export enum PROJECT_TYPE {
  EXISTING_MACHINE = 'Existing Machine',
  RD_NEW_MACHINE = 'R&D New Machine',
  OTHERS = 'Others',
}

export enum PROJECT_STAGE {
  GENESIS = 'Genesis',
  DESIGNING = 'Designing',
  ESTIMATING_COST = 'Estimating-Cost',
  CREATING_PURCHASE_ORDER = 'Creating-Purchase-Orders',
  IN_PRODUCTION = 'In-Production',
  DELIVERY = 'Delivery',
}

export enum PROJECT_STATUS {
  CREATED = 'Created',
  ACCEPTED = 'Accepted',
  IN_PROGRESS = 'In-Progress',
  ON_HOLD = 'On-Hold',
  COMPLETED = 'Completed',
}

export enum PROJECT_TASK {
  DESIGN = 'Design',
  PURCHASES = 'Purchases',
  ASSEMBLY = 'Assembly',
  TESTING = 'Testing',
}
