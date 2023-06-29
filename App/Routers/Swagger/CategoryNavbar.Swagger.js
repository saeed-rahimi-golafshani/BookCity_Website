/**
 * @swagger
 *  definitions:
 *      ListOfCategoryNavbar:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      courses:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "6403548e530901e984e7de91"
 *                                  title:
 *                                      type: string
 *                                      example: "title of CategoryNavbar"
 *                                  icon:
 *                                      type: string
 *                                      example: "icon of CategoryNavbar"                  
 */


/**
 * @swagger 
 *  components:
 *      schemas: 
 *          createCategoryNavbar:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   icon
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of CategoryNavbar
 *                  icon: 
 *                      type: file
 *                      description: the summery of text of CategoryNavbar
 *          UpdateCategoryNavbar: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of CategoryNavbar
 *                  icon: 
 *                      type: file
 *                      description: the summery of icon of CategoryNavbar
 */

/**
 * @swagger 
 *  /admin/category_navbar/create:
 *      post:
 *          tags: [Admin-CategoryNavbar]
 *          summary: create CategoryNavbar document 
 *          consumer: 
 *              -   multipart/form-data
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/createCategoryNavbar'
 *          responses: 
 *                  201:
 *                      description: CREATED
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition' 
 */

/**
* @swagger
 *  /admin/category_navbar/list:
 *      get: 
 *          tags: [Admin-CategoryNavbar]
 *          summary: List Of CategoryNavbar  In admin panel
 *          description: List Of CategoryNavbar in admin panel
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCategoryNavbar'
 */

/**
 * @swagger 
 *  /admin/category_navbar/list/{id}: 
 *      get: 
 *          tags: [Admin-CategoryNavbar]
 *          summary: update CategoryNavbar with Id
 *          description: update CategoryNavbar in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfCategoryNavbar'       
 */

/**
 * @swagger 
 *  /admin/category_navbar/delete/{id}: 
 *      delete: 
 *          tags: [Admin-CategoryNavbar]
 *          summary: delete CategoryNavbar with Id
 *          description: delete CategoryNavbar in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'
 */

/**
 * @swagger 
 *  /admin/category_navbar/update/{id}: 
 *      patch: 
 *          tags: [Admin-CategoryNavbar]
 *          summary: update CategoryNavbar with Id
 *          description: update CategoryNavbar in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateCategoryNavbar'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'       
 */