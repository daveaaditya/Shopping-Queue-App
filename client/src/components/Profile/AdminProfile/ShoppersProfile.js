import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UserProfile from '../ShopperProfile/ShopperProfile';
import SearchHistory from '../ShopperProfile/SearchHistory';
import QueueHistory from '../ShopperProfile/QueueHistory';
import Grid from '@material-ui/core/Grid';
import { styles } from '../style';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import { shoppers } from '../../../utils/shoppers';


class ShoppersProfile extends React.Component {

  state = {
    profileViews: new Array(shoppers.length).fill(0)
  };

  closeView(index) {
    const stateView = this.state.profileViews[index];
    const { classes } = this.props;

    if (stateView !== 0) {
      return (
        <Button
          className={classes.button}
          onClick={() => this.handleViewChange(index, 0)}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      );
    }
  };

  handleViewChange(index, newProfileView) {
    const viewsOpen = [...this.state.profileViews];
    viewsOpen[index] = newProfileView;

    this.setState({
      profileViews: viewsOpen
    });
  };

  getView(index) {
    const shopper = shoppers[index];
    const stateView = this.state.profileViews[index];
    switch (stateView) {
      case 1:
        return <UserProfile shopper={shopper}/>;
      case 2:
        return <SearchHistory shopper={shopper}/>;
      case 3:
        return <QueueHistory shopper={shopper}/>;
      default:
        return;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          {shoppers.map((shopper, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography
                    component="h2"
                    variant="h5"
                    color="primary"
                    gutterBottom
                  >
                    {shopper.firstName} {shopper.lastName}
                  </Typography>
                  <Typography color="textSecondary" className={classes.secondaryText}>
                    Email: {shopper.email}
                  </Typography>
                  <Typography color="textSecondary" className={classes.secondaryText}>
                    Location: {shopper.address}
                  </Typography>
                  <Button
                    className={classes.button}
                    onClick={() => this.handleViewChange(index, 1)}
                    variant="contained"
                    color="primary"
                  >
                    View Profile
                  </Button>
                  <Button
                    className={classes.button}
                    onClick={() => this.handleViewChange(index, 2)}
                    variant="contained"
                    color="primary"
                  >
                    View Search History
                  </Button>
                  <Button
                    className={classes.button}
                    onClick={() => this.handleViewChange(index, 3)}
                    variant="contained"
                    color="primary"
                  >
                    View Queue History
                  </Button>
                  <Button
                    className={classes.deleteButton}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon/>}
                  >
                    Delete User
                  </Button>

                  {this.closeView(index)}

                  {(this.state.profileViews[index] !== 0) && (
                    <div className={classes.adminUserProfile}>
                      {this.getView(index)}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ShoppersProfile);
