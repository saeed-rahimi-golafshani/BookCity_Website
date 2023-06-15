/**
 * @swagger 
 *  components:
 *      schemas:
 *          Create_Category_Attribute: 
 *              type: object
 *              required: 
 *                  -   category
 *                  -   label
 *              properties: 
 *                  category: 
 *                      type: string
 *                      description: the category of CategoryAttribute 
 *                  label: 
 *                      type: string
 *                      description: the parent of CategoryAttribute
 *          UpdateCategoryAttribute: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of category
 *                  label: 
 *                      type: string
 *                      description: the parent of CategoryAttribute
 */

/**
 * @swagger 
 *  /admin/category_Attribute/create: 
 *      post: 
 *          tags: [Admin-CategoryAttribute]
 *          summary: CategoryAttribute in website
 *          description: CategoryAttribute is sub to category
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Create_Category_Attribute'          
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Create_Category_Attribute'
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
 *  /admin/category_Attribute/list:
 *      get: 
 *          tags: [Admin-CategoryAttribute]
 *          summary: List Of CategoryAttribute  In admin panel
 *          description: List Of CategoryAttribute in admin panel
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger 
 *  /admin/category_Attribute/list/{id}: 
 *      get: 
 *          tags: [Admin-CategoryAttribute]
 *          summary: update CategoryAttribute with Id
 *          description: update CategoryAttribute in admin panel
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
 *  /admin/category_Attribute/update/{id}: 
 *      patch: 
 *          tags: [Admin-CategoryAttribute]
 *          summary: update CategoryAttribute with Id
 *          description: update CategoryAttribute in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/UpdateCategoryAttribute'             
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateCategoryAttribute'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'       
 */