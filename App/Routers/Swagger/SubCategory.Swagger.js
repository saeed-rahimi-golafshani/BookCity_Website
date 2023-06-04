/**
 * @swagger 
 *  components:
 *      schemas:
 *          Add_SubCategory: 
 *              type: object
 *              required: 
 *                  -   title
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of subCategory 
 *                  parent: 
 *                      type: string
 *                      description: the parent of sub category
 *          UpdateCategory: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of category
 */

/**
 * @swagger 
 *  /admin/sub_category/create: 
 *      post: 
 *          tags: [Admin-SubCategory]
 *          summary: subcategory in website
 *          description: subcategory is sub to category
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Add_SubCategory'          
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Add_SubCategory'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'
 * 
 *                
 *                         
 *                 
 */
/**
* @swagger
 *  /admin/sub_category/list:
 *      get: 
 *          tags: [Admin-SubCategory]
 *          summary: List Of SubCategory  In admin panel
 *          description: List Of SubCategory in admin panel
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
 *  /admin/sub_category/all_list:
 *      get: 
 *          tags: [Admin-SubCategory]
 *          summary: List Of All SubCategory  In admin panel
 *          description: List Of All SubCategory in admin panel
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
 *  /admin/sub_category/remove/{id}: 
 *      delete: 
 *          tags: [Admin-SubCategory]
 *          summary: delete category with Id
 *          description: delete category in admin panel
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
 *  /admin/sub_category/update/{id}: 
 *      patch: 
 *          tags: [Admin-SubCategory]
 *          summary: update subcategory with Id
 *          description: update subcategory in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/UpdateCategory'             
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateCategory'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'       
 */