# GRUPS IMPORTS

1. Reactowe library,
2. External library,
3. Main components,
4. Children components,
5. Namespaces,
6. utils,
7. routes,
8. constants,
9. styles,

## HOW TO IMPORTS

1. import \* as C from '@constants/index'
2. import \* as S from './styles'
3. import \* as UF from '@utils/useful-functions'
4. import \* as A from '@utils/arrays'

// not needed '\' prettier fixed this lines please write only star

## CONSTANTS INSIDE UTILS

Have all readonly values, something like labels, names, routes

## NAMESPACES INSIDE CORE

Have all types from this app, there must me set a declartion types, but if you have one ore two parameters in function you can typed there.

## HOW TO SET PROPS AND DESTRUCTURING

First put strings, numbers, booleans, and finally functions.

## NODE-PRUNE CLEAN NOT NESSARY PACKAGES INTO NODE_MODULES

https://www.npmjs.com/package/node-prune

install this package global on your computer and when you are add new pacakges then please use this, because this clean/remove not nesseary packages and bundle is a less size

1. npm install -g node-prune
2. use script postinstall
