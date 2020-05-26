import React from 'react';

import MaterialTable from 'material-table';
import { withRouter } from 'react-router-dom';
import { MENU_ROUTES } from '../../constansts/routes/routes';
const UserLists = props => {
  const tableRef = React.createRef();
  const userRoute = () => {
    props.history.push(MENU_ROUTES.USER_PROFILE);
  };
  const [state, setState] = React.useState({
    columns: [
      { title: 'E-mail', field: 'email' },
      { title: 'Imie', field: 'name' },
      { title: 'Nazwisko', field: 'surname' },
      { title: 'Rok Urodzenia', field: 'rok_urodzenia', type: 'numeric' },
    ],
    data: [
      {
        name: 'Maciek',
        surname: 'Baran',
        email: 'Janek@gmail.com',
        rok_urodzenia: 1987,
      },
      {
        name: 'Janusz',
        surname: 'Fiołek',
        rok_urodzenia: 2017,
        email: 'Waldek@email.com',
      },
    ],
  });

  return (
    <MaterialTable
      title='Lista użytkowników'
      columns={state.columns}
      data={state.data}
      actions={[
        {
          icon: 'person',
          tooltip: 'Pokaż dane',
          onClick: userRoute,
        },
        {
          icon: 'refresh',
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => tableRef.current && tableRef.current.onQueryChange(),
        },
      ]}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
};
export default withRouter(UserLists);
