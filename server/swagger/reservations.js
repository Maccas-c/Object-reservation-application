/**
 * @swagger
 * /api/reservation/create:
 *  post:
 *    summary: Create new reservation as user
 *    parameters:
 *     - in: body
 *       name: body
 *       required: true
 *       schema:
 *        $ref: '#/definitions/ReservationCreate'
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ReservationCreate'
 *    responses:
 *     '200':
 *       description: Reservation has been created
 *     '404':
 *       description: Error
 *
 * /api/reservations/{userId}:
 *  get:
 *   summary: Get reservations booked by specific user
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema: string
 *   responses:
 *    '200':
 *     description: Specific user`s list of reservations
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ReservationCreate'
 *    '404':
 *      description: Not found
 * /api/reservations:
 *  get:
 *   summary: Get all busy reservations for the specific day
 *   parameters:
 *    - in: query
 *      name: time
 *      schema:
 *       type: string
 *      description: "2020-12-21"
 *   responses:
 *    '200':
 *     description: All busy reservations for the specific day
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ReservationCreate'
 *    '404':
 *      description: Error
 */

/**
 * @swagger
 * definitions:
 *  ReservationCreate:
 *   type: object
 *   properties:
 *    start_time:
 *     type: string
 *     example: "2020-05-12"
 *    hour:
 *     type: string
 *     example: "16:00"
 *    courtId:
 *     type: string
 *     example: A
 *    userId:
 *     type: string
 *     example: "5fbbfc024397f30100824d67"
 *
 */
