/**
 * @swagger 
 *  components:
 *      schemas:
 *          Add_Category: 
 *              type: object
 *              required: 
 *                  -   title
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Category 
 *                  category_sidebar: 
 *                      type: string
 *                      description: the category_sidebar of Category 
 *                  parent: 
 *                      type: string
 *                      description: the parent of category
 *          UpdateCategory: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of category
 */

/**
 * @swagger 
 *  /admin/category/create: 
 *      post: 
 *          tags: [Admin-Category]
 *          summary: category in website
 *          description: subcategory is sub to category
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Add_Category'          
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Add_Category'
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
 *  /admin/category/list:
 *      get: 
 *          tags: [Admin-Category]
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
 *  /admin/category/list/{id}: 
 *      get: 
 *          tags: [Admin-Category]
 *          summary: update category with Id
 *          description: update category in admin panel
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
 *  /admin/category/all_list:
 *      get: 
 *          tags: [Admin-Category]
 *          summary: List Of All Category  In admin panel
 *          description: List Of All Category in admin panel
 *          parameters: 
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title of product
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
 *  /admin/category/remove/{id}: 
 *      delete: 
 *          tags: [Admin-Category]
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
 *  /admin/category/update/{id}: 
 *      patch: 
 *          tags: [Admin-Category]
 *          summary: update category with Id
 *          description: update category in admin panel
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