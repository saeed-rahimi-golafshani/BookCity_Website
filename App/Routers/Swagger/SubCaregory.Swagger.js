/**
 * @swagger
 *  definitions:
 *      ListOfSubCategory:
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
 *                                      example: "title of SubCategory"
 *                                  category: 
 *                                      type: string
 *                                      example: "6403548e530901e984e7de91"
 *                                  image:
 *                                      type: string
 *                                      example: "image of CategoryNavbar"                  
 */

/**
 * @swagger 
 *  components:
 *      schemas: 
 *          createSubCategory:
 *              type: object
 *              required: 
 *                  -   title
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of SubCategory
 *                  category: 
 *                      type: string
 *                      description: the category of SubCategory
 *                  image: 
 *                      type: file
 *                      description: the summery of text of SubCategory
 *          UpdateSubcategory:
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of SubCategory
 *                  category: 
 *                      type: string
 *                      description: the category of SubCategory
 *                  image: 
 *                      type: file
 *                      description: the summery of text of SubCategory
 */

/**
 * @swagger 
 *  /admin/subcategory/create:
 *      post:
 *          tags: [Admin-SubCategory]
 *          summary: create CategoryNavbar document 
 *          consumer: 
 *              -   multipart/form-data
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/createSubCategory'
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
 *  /admin/subcategory/list:
 *      get:
 *          tags: [Admin-SubCategory]
 *          summary: create CategoryNavbar document 
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
 *  /admin/subcategory/list/{id}: 
 *      get: 
 *          tags: [Admin-SubCategory]
 *          summary: update SubCategory with Id
 *          description: update SubCategory in admin panel
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
 *                                  $ref: '#/definitions/ListOfSubCategory'       
 */

/**
 * @swagger 
 *  /admin/subcategory/delete/{id}: 
 *      delete: 
 *          tags: [Admin-SubCategory]
 *          summary: delete SubCategory with Id
 *          description: delete SubCategory in admin panel
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
 *  /admin/subcategory/update/{id}: 
 *      patch: 
 *          tags: [Admin-SubCategory]
 *          summary: update SubCategory with Id
 *          description: update SubCategory in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateSubcategory'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'       
 */