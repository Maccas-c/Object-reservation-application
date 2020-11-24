import * as React from 'react';
import {
    List,
    Datagrid,
    Responsive,
    TextField,
} from 'react-admin';

export const ReservationsList = props => {
    return (
        <List {...props}>
            <Responsive
                medium={
                    <Datagrid>
                        <TextField source='id'/>
                        <TextField label='Data' source='start_time'/>
                        <TextField label='Godzina' source='hour'/>
                        <TextField label='Strefa boiska' source='courtid'/>
                        <TextField label='Imię' source='userid.name'/>
                        <TextField label='Nazwisko' source='userid.name'/>
                    </Datagrid>
                }
            />
        </List>
    );
};
