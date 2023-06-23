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
 *                      description: the title of blog
 *                  icon: 
 *                      type: file
 *                      description: the summery of text of blog
 *          UpdateBlog:
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of blog
 *                  icon: 
 *                      type: file
 *                      description: the summery of text of blog
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