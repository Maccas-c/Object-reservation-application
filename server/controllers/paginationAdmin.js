const userModel = require('../models/userModel');
const reservationModel = require('../models/reservationModel');

module.exports.rangeReservations = async function (req, res, next) {
  if (req.query.filter && req.query.sort) {
    let filter = JSON.parse(req.query.filter);
    let keyFilters = Object.keys(filter).toString();
    let rangeFilters = JSON.parse(req.query.range);
    let sort = JSON.parse(req.query.sort);
    let response = [];
    const keyForSort = sort[0];
    const valueForSort = keyForSort[1] === 'ASC' ? '1' : '-1';

    if ('name' in filter || 'surname' in filter) {
      try {
        const filterUser = JSON.parse(JSON.stringify(filter));
        delete filterUser['courtId'];
        const users = await userModel.find(filterUser);
        let ids = [];
        for (const user of users) {
          ids.push(user._id);
        }

        delete filter['name'];
        delete filter['surname'];
        const reservations = await reservationModel
          .find({ $and: [{ userId: { $in: ids } }, filter] })
          .populate('userId')
          .sort({ [keyForSort]: valueForSort });

        const reservationFixed = JSON.parse(
          JSON.stringify(reservations).split('"_id":').join('"id":'),
        );

        const path = req.path.slice(11);
        const header = `${path} 0-${reservationFixed.length}/${reservationFixed.length}`;
        res.header('Content-Range', header);
        res.locals.allReservations = reservationFixed;
        res.locals.rangeFilters = rangeFilters;
        next();
      } catch (err) {
        console.log(err);
        res.status(404).json(err);
      }
    } else if ('userId' in filter) {
      filter['isServedVat'] = false;
      filter['vat'] = true;
      try {
        const reservations = await reservationModel
          .find(filter)
          .populate('userId')
          .sort({ [keyForSort]: valueForSort });

        const reservationFixed = JSON.parse(
          JSON.stringify(reservations).split('"_id":').join('"id":'),
        );
        const path = req.path.slice(11);
        const header = `${path} 0-${reservationFixed.length}/${reservationFixed.length}`;
        res.header('Content-Range', header);
        res.locals.allReservations = reservationFixed;
        res.locals.rangeFilters = rangeFilters;
        next();
      } catch (err) {
        console.log(err);
        res.status(404).json(err);
      }
    } else {
      try {
        const reservations = await reservationModel
          .find(filter)
          .populate('userId')
          .sort({ [keyForSort]: valueForSort });

        const reservationFixed = JSON.parse(
          JSON.stringify(reservations).split('"_id":').join('"id":'),
        );
        const path = req.path.slice(11);
        const header = `${path} 0-${reservationFixed.length}/${reservationFixed.length}`;
        res.header('Content-Range', header);
        res.locals.allReservations = reservationFixed;
        res.locals.rangeFilters = rangeFilters;
        next();
      } catch (err) {
        console.log(err);
        res.status(404).json(err);
      }
    }
  } else {
    res.status(404).end('no query and sort');
  }
};

module.exports.rangeUsers = async function (req, res, next) {
  if (req.query.filter && req.query.sort) {
    let filter = JSON.parse(req.query.filter);
    const sort = JSON.parse(req.query.sort);
    let rangeFilters = JSON.parse(req.query.range);
    const key = sort[0];
    const value = sort[1] === 'ASC' ? '1' : '-1';

    try {
      const usersDocuments = await userModel
        .find(filter)
        .sort({ [key]: value });
      const usersFixed = JSON.parse(
        JSON.stringify(usersDocuments).split('"_id":').join('"id":'),
      );
      const path = req.path.slice(11);
      const header = `${path} 0-${usersFixed.length}/${usersFixed.length}`;
      res.header('Content-Range', header);
      res.locals.allUsers = usersFixed;
      res.locals.rangeFilters = rangeFilters;
      next();
    } catch (err) {
      console.log(err);
      res.status(404).json(err);
    }
  } else {
    res.status(404).end('no filter and sort');
  }
};
