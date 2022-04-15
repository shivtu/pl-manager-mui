import { Divider, List, ListItem, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { Dispatch, SetStateAction } from 'react';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer({
  drawerAnchor = 'left',
  open,
  projectRequirements,
  setProjectRequirements,
}: {
  drawerAnchor?: Anchor;
  open: boolean;
  projectRequirements: {
    visible: boolean;
    data: string[];
    parentProjectName: string | false;
  };
  setProjectRequirements: Dispatch<
    SetStateAction<{
      visible: boolean;
      data: string[];
      parentProjectName: string | false;
    }>
  >;
}) {
  const renderDrawerContent = () => {
    if (projectRequirements.data.length) {
      return projectRequirements.data.map((d, i) => (
        <List key={`${d}-${i}`}>
          <ListItem>{d}</ListItem>
          <Divider />
        </List>
      ));
    }
    return (
      <Typography>
        Atleaset one Design task must be in edit state to view the requirement
        list
      </Typography>
    );
  };

  return (
    <div>
      <Drawer
        anchor={drawerAnchor}
        open={open}
        onClose={() =>
          setProjectRequirements({
            ...projectRequirements,
            ...{ visible: false },
          })
        }
      >
        {renderDrawerContent()}
      </Drawer>
    </div>
  );
}
