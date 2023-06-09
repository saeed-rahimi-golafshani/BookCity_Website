/**
 * @swagger
 *  definitions:
 *      ListOfCategorySidebar:
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
 *                                  category_navbar: 
 *                                      type: string
 *                                      example: "6403548e530901e984e7de91"
 *                                  icon:
 *                                      type: string
 *                                      example: "icon of CategoryNavbar"                  
 */
/**
 * @swagger 
 *  components:
 *      schemas: 
 *          createCategorySidebar:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   category_navbar
 *                  -   icon
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of CategorySidebar
 *                  category_navbar: 
 *                      type: string
 *                      description: the title of CategorySidebar
 *                  icon: 
 *                      type: file
 *                      description: the summery of text of CategorySidebar
 *          UpdateCategorySidebar:
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of CategorySidebar
 *                  category_navbar: 
 *                      type: string
 *                      description: the title of CategorySidebar
 *                  icon: 
 *                      type: file
 *                      description: the summery of text of CategorySidebar
 */

/**
 * @swagger 
 *  /admin/category_sidebar/create:
 *      post:
 *          tags: [Admin-CategorySidebar]
 *          summary: create CategorySidebar document 
 *          consumer: 
 *              -   multipart/form-data
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/createCategorySidebar'
 *          responses: 
 *                  201:
 *                      description: CREATED
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition' 
 */

/**
/**
* @swagger
 *  /admin/category_sidebar/list:
 *      get: 
 *          tags: [Admin-CategorySidebar]
 *          summary: List Of CategorySidebar  In admin panel
 *          description: List Of CategorySidebar in admin panel
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCategorySidebar'
 */

/**
 * @swagger 
 *  /admin/category_sidebar/list/{id}: 
 *      get: 
 *          tags: [Admin-CategorySidebar]
 *          summary: update category_sidebar with Id
 *          description: update category_sidebar in admin panel
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
 *                                  $ref: '#/definitions/ListOfCategorySidebar'       
 */

/**
 * @swagger 
 *  /admin/category_sidebar/delete/{id}: 
 *      delete: 
 *          tags: [Admin-CategorySidebar]
 *          summary: delete CategorySidebar with Id
 *          description: delete CategorySidebar in admin panel
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
 *  /admin/category_sidebar/update/{id}: 
 *      patch: 
 *          tags: [Admin-CategorySidebar]
 *          summary: update CategorySidebar with Id
 *          description: update CategorySidebar in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateCategorySidebar'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'       
 */