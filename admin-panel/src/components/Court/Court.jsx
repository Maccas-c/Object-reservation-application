import * as React from 'react';
import {
    List,
} from 'react-admin';

export const Court = props => {
    return (
        <List {...props} exporter={false} >
           <h1>Boisko</h1>
        </List>
    );
};

