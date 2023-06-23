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
 *          UpdateBlog:
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