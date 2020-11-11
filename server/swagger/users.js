/**
 * @swagger
 * /api/user/create:
 *  post:
 *   summary: Create user
 *   description: Create user
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       $ref: '#/definitions/UserCreate'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserCreate'
 *   responses:
 *    '200':
 *      description: Ok
 *    '404':
 *      description: Error
 * /api/user/update:
 *  patch:
 *   summary: Update user
 *   description: Update user
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       $ref: '#/definitions/UserUpdate'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserUpdate'
 *   responses:
 *    '200':
 *      description: Ok
 *    '404':
 *      description: Error
 *
 * /api/user/{userId}:
 *  get:
 *   summary: Get a user by userId
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema: string
 *   responses:
 *    '200':
 *      description: Ok
 *    '404':
 *      description: Error
 * */

/**
 * @swagger
 * definitions:
 *  UserUpdate:
 *   type: object
 *   properties:
 *    _id:
 *     type: ObjectId
 *     example: 5ed3f91ee5d88124e08f3925
 *    name:
 *     type: string
 *     example: Marcin
 *    surname:
 *     type: string
 *     example: Kowalski
 *    email:
 *     type: string
 *     example: costam@wp.pl
 *    age:
 *     type: integer
 *     exmaple: 23
 *    phone_number:
 *     type: string
 *     example: 515000211
 *    sex:
 *     type: string
 *     example: female
 *    adress_street:
 *     type: string
 *     exmaple: bukowska
 *    adress_city:
 *     type: string
 *     exmample: poznan
 *    adress_postalCode:
 *     type: string
 *     example: 30-311
 *    nip:
 *     type: string
 *     example: 777111222
 *  UserDelete:
 *   type: object
 *   properties:
 *    IsActive:
 *     type: boolean
 *     example: false
 *  UserCreate:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     examaple: Marcin
 *    surname:
 *     type: string
 *     examaple: Marcin
 *    sex:
 *     type: string
 *     examaple: female
 *    email:
 *     type: string
 *     examaple: costam@wp.pl
 *
 */