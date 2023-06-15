/**
 * @swagger 
 *  components:
 *      schemas:
 *          Create_ProductCategory_Attribute: 
 *              type: object
 *              required: 
 *                  -   category_attribute
 *                  -   product
 *                  -   value
 *              properties: 
 *                  product: 
 *                      type: string
 *                      description: the parent of CategoryAttribute
 *                  category_attribute: 
 *                      type: string
 *                      description: the category of CategoryAttribute
 *                  value: 
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
 *  /admin/product_category_attribute/create: 
 *      post: 
 *          tags: [Admin-ProductCategoryAttribute]
 *          summary: ProductCategoryAttribute in website
 *          description: ProductCategoryAttribute is sub to category
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Create_ProductCategory_Attribute'          
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Create_ProductCategory_Attribute'
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
 *  /admin/product_category_attribute/list:
 *      get: 
 *          tags: [Admin-ProductCategoryAttribute]
 *          summary: List Of ProductCategoryAttribute  In admin panel
 *          description: List Of ProductCategoryAttribute in admin panel
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
 *  /admin/product_category_attribute/list/{proId}: 
 *      get: 
 *          tags: [Admin-ProductCategoryAttribute]
 *          summary: update ProductCategoryAttribute with Id
 *          description: update ProductCategoryAttribute in admin panel
 *          parameters:
 *              -   in: path
 *                  name: proId
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