import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import FormTextField from './FormTextField';


const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  edit: {
    marginTop: theme.spacing(2),
  },
});


class DataDisplay extends React.Component {

  getContent = () => {
    const {
      classes,
      content,
      edit,
      value,
      name,
      label,
      setEdit,
      comp,
      editComponent,
      type
    } = this.props;

    if (edit && editComponent !== undefined) {
      return editComponent;
    }

    return (edit) ? (
      <FormTextField
        variant="outlined"
        margin="normal"
        name={name}
        label={label}
        value={value}
        type={type}
        comp={comp}
      />
    ) : (
      <React.Fragment>
        <Typography component="p" variant="h6">
          {content}
        </Typography>

        {setEdit !== undefined && (
          <div className={classes.edit}>
            <Link color="primary" onClick={() => setEdit(true)}>
              Edit
            </Link>
          </div>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { classes, gridSize, title } = this.props;

    return (
      <Grid item xs={gridSize}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            {title}
          </Typography>
          {this.getContent()}
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(DataDisplay);
