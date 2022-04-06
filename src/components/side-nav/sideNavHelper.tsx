import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import VerifiedIcon from '@mui/icons-material/Verified';
import FactoryIcon from '@mui/icons-material/Factory';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import HomePage from '../../pages/home/HomePage';
import CurrentProjectsPages from '../../pages/projects/CurrentProjectsPage';
import CreateNewProjectPage from '../../pages/projects/CreateNewProjectPage';
import CompletedProjectsPage from '../../pages/projects/CompletedProjectsPage';
import PendingDesignsPage from '../../pages/designs/PendingDesignsPage';
import CompletedDesignsPage from '../../pages/designs/CompletedDesignsPage';
import PendingPOPage from '../../pages/purchase-orders/PendingPOPage';
import CompletedPOPage from '../../pages/purchase-orders/CompletedPOPage';
import AnalyticsPage from '../../pages/analytics/AnalyticsPage';
import BadgeIcon from '@mui/icons-material/Badge';
import UserManagementPage from '../../pages/user-management/UserManagementPage';

export type SideNavItemsType = {
  labelText: string;
  labelIcon:
    | OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
      };
  routeTo?: string;
  allowedRoles: string[];
  component?: JSX.Element;
  subMenu?: {
    labelText: string;
    labelIcon?: any;
    routeTo: string;
    component: JSX.Element;
  }[];
};

export const sideNavItems: SideNavItemsType[] = [
  {
    labelText: 'Analytics',
    labelIcon: QueryStatsIcon,
    routeTo: '/analytics',
    allowedRoles: ['admin'],
    component: <AnalyticsPage />,
  },
  {
    labelText: 'Projects',
    labelIcon: AccountTreeIcon,
    allowedRoles: ['admin'],
    subMenu: [
      {
        labelText: 'Current Projects',
        routeTo: 'projects',
        component: <CurrentProjectsPages />,
      },
      {
        labelText: 'New Projects',
        routeTo: '/new-project',
        component: <CreateNewProjectPage />,
      },
      {
        labelText: 'Completed Projects',
        routeTo: '/completed-projects',
        component: <CompletedProjectsPage />,
      },
    ],
  },
  {
    labelText: 'Designs',
    labelIcon: DesignServicesIcon,
    allowedRoles: ['admin', 'designer'],
    subMenu: [
      {
        labelText: 'Pending Desins',
        routeTo: '/pending-designs',
        component: <PendingDesignsPage />,
      },

      {
        labelText: 'Completed designs',
        routeTo: '/completed-designs',
        component: <CompletedDesignsPage />,
      },
    ],
  },
  {
    labelText: 'Purchase Orders',
    labelIcon: ShoppingCartIcon,
    allowedRoles: ['admin'],
    subMenu: [
      {
        labelText: 'Pending Purchase Orders',
        routeTo: '/pending-po',
        component: <PendingPOPage />,
      },

      {
        labelText: 'Completed Purchase Orders',
        routeTo: '/completed-po',
        component: <CompletedPOPage />,
      },
    ],
  },
  {
    labelText: 'Production',
    labelIcon: FactoryIcon,
    routeTo: '/production',
    allowedRoles: ['admin'],
    component: <>Production page</>,
  },
  {
    labelText: 'Assembly',
    labelIcon: PrecisionManufacturingIcon,
    routeTo: '/assembly',
    allowedRoles: ['admin'],
    component: <>assembly</>,
  },
  {
    labelText: 'Testing',
    labelIcon: VerifiedIcon,
    routeTo: '/testing',
    allowedRoles: ['admin'],
    component: <>Tesing</>,
  },
  {
    labelText: 'User Management',
    labelIcon: BadgeIcon,
    routeTo: 'manage-user',
    allowedRoles: ['admin'],
    component: <UserManagementPage />,
  },
];
