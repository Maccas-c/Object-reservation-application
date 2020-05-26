import React from 'react';
import axios from '../../axios/axios-auth';
import MaterialTable from 'material-table';
import { withRouter } from 'react-router-dom';
import { MENU_ROUTES } from '../../constansts/routes/routes';

const UserLists = props => {
  const userRoute = () => {
    props.history.push(MENU_ROUTES.USER_PROFILE);
  };
  const [state, setState] = React.useState({
    columns: [
      { title: 'E-mail', field: 'login.email' },
      { title: 'Email Usos', field: 'longing2.email' },
      { title: 'Imie', field: 'name' },
      { title: 'Nazwisko', field: 'surname' },
    ],
  });

  return (
    <MaterialTable
      title='Lista użytkowników'
      columns={state.columns}
      data={query =>
        new Promise((resolve, reject) => {
          axios.get('/admin/users', { withCredentials: true }).then(result => {
            resolve({
              data: result.data,
              totalCount: result.total,
              page: result.page - 1,
            });
          });
        })
      }
      actions={[
        {
          icon: 'person',
          tooltip: 'Pokaż dane',
          onClick: userRoute,
        },
        { icon: 'delete', tooltip: 'usun użytkownika' },
        { icon: 'edit', tooltip: 'Edytuj' },
      ]}
    />
  );
};
export default withRouter(UserLists);
