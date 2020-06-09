import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './HoursStyles';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Hours = () => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Dostępne Godziny
          </Typography>
          <div className={classes.demo}>
            <List >
              {generate(
                <ListItem>
                  <ListItemText
                    primary="10:00"
                  />
                </ListItem>,
              )}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
        </Grid>
      </Grid>
    </div>
  );
}
export default Hours;