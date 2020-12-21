/**
 * @swagger
 * /api/admin/users:
 *  get:
 *   summary: Get all users data
 *   parameters:
 *    - in: query
 *      name: sort
 *      required: true
 *      schema:
 *       type: array
 *       items:
 *        type: string
 *      description: ["name", "ASC"]
 *    - in: query
 *      name: filter
 *      required: true
 *      schema:
 *       type: object
 *       items:
 *        type: string
 *      description: {"name":"Bartosz"}
 *    - in: query
 *      name: range
 *      required: true
 *      schema:
 *       type: array
 *       items:
 *        type: int
 *      description: [0,24]
 *   responses:
 *    '200':
 *     description: A list of users
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/UserUpdate'
 *    '500':
 *      description: Server error
 *    '404':
 *      description: Not found
 *
 * /api/admin/users/{userId}:
 *  get:
 *   summary: Get one user`s data
 *   parameters:
 *    - in: path
 *      name: userId
 *      required: true
 *   responses:
 *    '200':
 *     description: User`s data
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/UserUpdate'
 *    '500':
 *      description: Server error
 *    '404':
 *      description: Not found
 *  delete:
 *   summary: Delete user`s data
 *   parameters:
 *    - in: path
 *      name: userId
 *      required: true
 *   responses:
 *    '200':
 *     description: User has been deleted
 *    '500':
 *      description: Server error
 *    '404':
 *      description: User designated for deletion was not found

 *
 * /api/admin/reservations:
 *  get:
 *   summary: Get all reservations data
 *   parameters:
 *    - in: query
 *      name: sort
 *      required: true
 *      schema:
 *       type: array
 *       items:
 *        type: string
 *      description: ["start_time", "ASC"]
 *    - in: query
 *      name: filter
 *      required: true
 *      schema:
 *       type: object
 *       items:
 *        type: string
 *      description: {"courtId":"A"}
 *    - in: query
 *      name: range
 *      required: true
 *      schema:
 *       type: array
 *       items:
 *        type: int
 *      description: [0,24]
 *   responses:
 *    '200':
 *     description: A list of reservations
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ReservationCreate'
 *    '500':
 *      description: Server error
 *    '404':
 *      description: Not found
 *  post:
 *   summary: Create new reservation
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       $ref: '#/definitions/ReservationCreate'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ReservationCreate'
 *   responses:
 *    '200':
 *      description: Ok
 *    '404':
 *      description: Error
 *
 * /api/admin/reservations/{reservationId}:
 *  delete:
 *   summary: Delete reservation`s data
 *   parameters:
 *    - in: path
 *      name: reservationId
 *      required: true
 *   responses:
 *    '200':
 *     description: Reservation has been deleted
 *    '500':
 *      description: Server error
 *    '404':
 *      description: Reservation designated for deletion was not found
 */
