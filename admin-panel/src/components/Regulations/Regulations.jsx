import * as React from 'react';
import {
    List,
} from 'react-admin';

export const Regulations = props => {
    return (
        <List {...props} exporter={false} >
            <h1>Regulamin</h1>
        </List>
    );
};

