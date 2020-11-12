/**
 * @swagger
 * /api/admin/users:
 *  get:
 *   summary: Get all users
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: err
 *
 * /api/admin/delete/{userId}:
 *  patch:
 *   summary: Delete user
 *   description: Delete user
 *   parameters:
 *    - in: path
 *      name: userId
 *      required: true
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       $ref: '#/definitions/UserDelete'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserDelete'
 *   responses:
 *    '200':
 *      description: Ok
 *    '404':
 *      description: Error
 * */