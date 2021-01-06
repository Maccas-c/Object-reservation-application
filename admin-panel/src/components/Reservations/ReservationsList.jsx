import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { push } from 'react-router-redux';
import { Drawer, withStyles } from '@material-ui/core';

import { BooleanField, CardActions, CreateButton, Datagrid, EditButton, List, TextField } from 'react-admin';
import { Route } from 'react-router';
import { FilterReservation } from './FilterReservation';
import { EditReservations } from './EditReservations';
import { CreateReservations } from './CreateReservations';

// export const ReservationList = ({ ...props }) => (
// <List {...props} filters={<FilterReservation />}>
//   <Datagrid size={'medium'}>
//     <TextField source={'id'} />
//     <TextField label={'Data'} source={'start_time'} />
//     <TextField label={'Godzina'} source={'hour'} />
//     <TextField label={'Strefa boiska'} source={'courtId'} />
//     <TextField label={'Imię'} source={'userId.name'} />
//     <TextField label={'Nazwisko'} source={'userId.surname'} />
//     <BooleanField label={'Vat'} source={'vat'} />
//     <BooleanField label={'Faktura obsłużona'} source={'isServedVat'} />
//     <EditButton />
//   </Datagrid>
// </List>
// );
const TagListActions = ({ basePath }) => (
  <CardActions>
    <CreateButton basePath={basePath} />
    {/* <Button onClick={<FilterReservation />}> cos </Button> */}
  </CardActions>
);
const styles = {
  drawerContent: {
    width: 300,
  },
};
class ReservationList extends React.Component {
  handleClose = () => {
    const { push } = this.props;
    push('/reservations');
  };

  render() {
    const { push, classes, ...props } = this.props;

    return (
      <>
        <List actions={<TagListActions />} filters={<FilterReservation />} {...props}>
          <Datagrid size={'medium'}>
            <TextField source={'id'} />
            <TextField label={'Data'} source={'start_time'} />
            <TextField label={'Godzina'} source={'hour'} />
            <TextField label={'Strefa boiska'} source={'courtId'} />
            <TextField label={'Imię'} source={'userId.name'} />
            <TextField label={'Nazwisko'} source={'userId.surname'} />
            <BooleanField label={'Vat'} source={'vat'} />
            <BooleanField label={'Faktura obsłużona'} source={'isServedVat'} />
            <EditButton />
          </Datagrid>
        </List>
        <Route path={'/reservations/create'}>
          {({ match }) => (
            <Drawer open={!!match} anchor={'right'} onClose={this.handleClose}>
              <CreateReservations className={classes.drawerContent} onCancel={this.handleClose} {...props} />
            </Drawer>
          )}
        </Route>
        <Route path={'/reservations/:id'}>
          {({ match }) => {
            const isMatch = match && match.params && match.params.id !== 'create';

            return (
              <Drawer open={isMatch} anchor={'right'} onClose={this.handleClose}>
                {isMatch ? (
                  <EditReservations
                    className={classes.drawerContent}
                    id={isMatch ? match.params.id : null}
                    onCancel={this.handleClose}
                    {...props}
                  />
                ) : (
                  <div className={classes.drawerContent} />
                )}
              </Drawer>
            );
          }}
        </Route>
      </>
    );
  }
}

export default compose(connect(undefined, { push }), withStyles(styles))(ReservationList);
