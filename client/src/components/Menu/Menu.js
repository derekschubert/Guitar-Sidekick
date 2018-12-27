import React, { useState } from 'react';
import './Menu.css';

// For Header Menu
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// For Menu Drawer and Menu Items
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const MenuItems = () => (
  <div>
    <List>
      {['Home', 'Settings', 'Share and Export'].map((text, index) => (
        <ListItem button key={text}>
          {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['Account', 'Logout'].map((t, i) => (
        <ListItem button key={t}>
          {/* <ListItemIcon>{i % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
          <ListItemText primary={t} />
        </ListItem>
      ))}
    </List>
  </div>
);

const MenuDrawer = ({ open, setOpen }) => (
  <Drawer open={open} onClose={() => setOpen(false)}>
    <div
      tabIndex={0}
      role="button"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
      className='menu-drawer'
    >
      {<MenuItems />}
    </div>
  </Drawer>
);


export default ({ active, onClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <div>
        <AppBar classes={{root: 'header'}} position="static">
          <Toolbar>
            <IconButton onClick={() => setOpen(true)} 
              color="inherit" 
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography classes={{root: 'page-name'}} variant="h6" color="inherit">
              {active}
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </div>
      {open && <MenuDrawer open={open} setOpen={setOpen} />}
    </React.Fragment>
  );
}