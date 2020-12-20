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
 *       description: Ok
 *     '404':
 *       description: Error
 *
 * /api/reservation/{reservationId}:
 *  get:
 *   summary: Get reservations by Id
 *   parameters:
 *    - in: path
 *      name: reservationId
 *      schema: string
 *   responses:
 *    '200':
 *      description: Ok
 *    '404':
 *      description: Error
 * /api/reservations:
 *  get:
 *   summary: Get all reservations in 1 day
 *   parameters:
 *    - in: query
 *      name: time
 *      schema: string
 *   responses:
 *    '200':
 *      description: Ok
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
