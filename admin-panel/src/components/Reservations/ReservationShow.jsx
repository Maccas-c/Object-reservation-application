import React from 'react';
import {
    Show,
    Tab,
    TabbedShowLayout,
    TextField,
} from 'react-admin';

const ReservationShow = props => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label='Rezerwacja'>
                <TextField label='id' source='id' />
                <TextField label='Data' source='start_time' />
                <TextField label='Godzina' source='hour' />
                <TextField label='Strefa boiska' source='courtid' />
                <TextField label='Imię' source='userid.name' />
                <TextField label='Nazwisko' source='userid.name' />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default ReservationShow;
