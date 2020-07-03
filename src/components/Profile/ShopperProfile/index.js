import React from 'react';
import NavBar from '../../Nav/navbar';
import SearchHistory from './SearchHistory.js';
import QueueHistory from './QueueHistory.js';
import UserProfile from './UserProfile.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HistoryIcon from '@material-ui/icons/History';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import { styles } from './style';
import { getShopper, Shopper } from '../../../utils/shoppers';
import store from 'store';
import PropTypes from 'prop-types';


const tabs = [
  'Profile',
  'Search History',
  'Queue History'
];

const tabIcons = [
  <PersonIcon/>,
  <HistoryIcon/>,
  <ShoppingCartIcon/>
];


class Profile extends React.Component {

  state = {
    setting: 0,
  };

  setSetting = (val) => {
    this.setState({ setting: val });
  };

  profileSettings = (propShopper) => {
    const shopper = (propShopper === undefined) ? getShopper(store.get('user')) : propShopper;

    switch (this.state.setting) {
      case 0:
        return <UserProfile shopper={shopper}/>;
      case 1:
        return <SearchHistory shopper={shopper}/>;
      case 2:
        return <QueueHistory shopper={shopper}/>;
      default:
        return Error('Unknown case');
    }
  };

  render() {
    const { classes, shopper } = this.props;

    return (
      <React.Fragment>
        <CssBaseline/>
        <NavBar currentPath={this.props.location.pathname}/>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar}/>
          <Divider/>
          <List>
            {tabs.map((label, index) => (
              <ListItem button key={label} onClick={() => this.setSetting(index)}>
                <ListItemIcon>{tabIcons[index]}</ListItemIcon>
                <ListItemText primary={label}/>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Container className={classes.container}>
          {this.profileSettings(shopper)}
        </Container>
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  shopper: PropTypes.objectOf(Shopper)
};

export default withRouter(withStyles(styles)(Profile));
