import * as React from 'react';
import {
    List,
} from 'react-admin';

export const PriceList = props => {
    return (
        <List {...props} exporter={false} >
            <h1>Cennik</h1>
        </List>
    );
};

