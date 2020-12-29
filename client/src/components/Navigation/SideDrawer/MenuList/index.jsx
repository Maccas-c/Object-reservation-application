import React from 'react';

import { List } from '@material-ui/core';

import MenuItem from '../MenuItem';

import { MENU_ITEMS } from '@constants/menuList';

import { useMenuListService } from './service';

const MenuList = ({ link, location, routes }) => {
  const { classes, menuList, getKeyByValue } = useMenuListService(MENU_ITEMS);

  return (
    <div
      style={{ fontFamily: 'roboto' }}
      {...{ className: classes.drawerList }}
    >
      <List>
        {menuList.map(mItem => {
          const key = getKeyByValue(MENU_ITEMS, mItem);
          return (
            <MenuItem
              {...{
                link,
                path: routes[key],
                selected: routes[key] === location.pathname,
                key,
                item: mItem,
              }}
            />
          );
        })}
      </List>
    </div>
  );
};

export default MenuList;
