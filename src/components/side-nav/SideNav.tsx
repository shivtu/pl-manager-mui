import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { sideNavItems, SideNavItemsType } from './sideNavHelper';
import useIsMobile from '../../hooks/useIsMobile';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 0.5,
            pr: 0,
          }}
        >
          <Box component={LabelIcon} color='inherit' sx={{ mr: 1 }} />
          <Typography
            variant='body2'
            textAlign={'left'}
            sx={{ fontWeight: 'inherit' }}
          >
            {labelText}
          </Typography>
          <Typography variant='caption' color='inherit'>
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

export default function SideNav() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <TreeView
      aria-label='navigation'
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{
        height: '100%',
        flexGrow: 1,
        maxWidth: 250,
        display: { xs: isMobile ? 'block' : 'none', md: 'block' },
      }}
    >
      {sideNavItems.map((items: SideNavItemsType) => {
        return (
          <div key={items.labelText}>
            <StyledTreeItem
              nodeId={items.labelText}
              labelText={items.labelText}
              labelIcon={items.labelIcon}
              bgColor='#cccccc'
              color='black'
              onClick={() => items.routeTo && navigate(items.routeTo)}
            >
              {items.subMenu?.map((subMenuItems) => (
                <StyledTreeItem
                  key={subMenuItems.labelText}
                  nodeId={subMenuItems.labelText}
                  labelText={subMenuItems.labelText}
                  labelIcon={subMenuItems.labelIcon}
                  onClick={() => navigate(subMenuItems.routeTo)}
                />
              ))}
            </StyledTreeItem>
          </div>
        );
      })}
    </TreeView>
  );
}
