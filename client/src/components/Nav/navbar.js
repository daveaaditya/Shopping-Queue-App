import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '../../utils/menu';
import { styles } from './style';


// NavBar component class
class NavBar extends React.Component {
  state = {
    tabIndex: 0,
  };

  handleTabChange = (event, tabIndex) => {
    this.setState({ tabIndex });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  currPath = () => {
    switch (window.location.pathname) {
      case '/':
        return 0;
      case '/profile':
      case '/store/profile':
      case '/admin/profile':
      case '/login':
        return 1;
      case '/map':
      case '/register':
      case '/store/queues':
      case '/admin/store/queues':
        return 2;
      case '/queue':
      case '/store/shoppers':
      case '/admin/shopper/queues':
        return 3;
      case '/admin/messages':
        return 4;
      default:
        return 0;
    }
  };

  render() {
    const { classes, position, userType, isLoggedIn } = this.props;

    return (
      <AppBar
        color="default"
        className={classes.appBar}
        position={(position) ? position : 'relative'}
      >
        <Toolbar>
          <Grid item xs={12} className={classes.flex}>
            <div className={classes.inline}>
              <Typography variant="h6" color="inherit" noWrap>
                <span className={classes.tagLine}>Shopping Queue</span>
              </Typography>
            </div>

            <div className={classes.productLogo}>
              <Typography>A Pandemic Shopping Manager</Typography>
            </div>

            <div className={classes.tabContainer}>
              <Tabs
                value={this.currPath() || this.state.tabIndex}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleTabChange}
              >
                {Menu(userType, isLoggedIn).map((item, index) => (
                  <Tab
                    key={index}
                    classes={{ root: classes.tabItem }}
                    label={item.label}
                    href={item.pathname}
                  />
                ))}
              </Tabs>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(NavBar);
