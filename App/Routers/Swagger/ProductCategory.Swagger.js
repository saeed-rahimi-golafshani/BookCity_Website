/**
 * @swagger 
 *  components:
 *      schemas:
 *          Add_ProductCategory: 
 *              type: object
 *              required: 
 *                  -   title
 *                  -   sub_category
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of productCategory 
 *                  sub_category: 
 *                      type: string
 *                      description: the sub_category of productCategory
 *                  parent: 
 *                      type: string
 *                      description: the parent of productCategory
 *          UpdateCategory: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of category
 */

/**
 * @swagger 
 *  /admin/product_category/create: 
 *      post: 
 *          tags: [Admin-ProductCategory]
 *          summary: subcategory in website
 *          description: subcategory is sub to category
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Add_ProductCategory'          
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Add_ProductCategory'
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
