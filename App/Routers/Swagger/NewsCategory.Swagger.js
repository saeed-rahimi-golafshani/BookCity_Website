/**
* @swagger 
*  components:
*      schemas: 
*          create_NewsCategory:
*              type: object
*              required: 
*                   -   title
*                   -   category_navbar
*              properties: 
*                   title: 
*                       type: string
*                       description: the title of NewsCategory
*                   category_navbar: 
*                       type: string
*                       description: the title of NewsCategory
*          UpdateNewsCategory:
*               type: object
*               properties: 
*                   title: 
*                       type: string
*                       description: the title of News
*                   category_navbar: 
*                       type: string
*                       description: the title of NewsCategory
*/

/**
* @swagger 
*  /admin/newscategory/create:
*      post:
*          tags: [Admin-NewsCategory]
*          summary: create News document 
*          requestBody: 
*              required: true
*              content:
*                  application/x-www-form-urlencoded:
*                      schema:         
*                          $ref: '#/components/schemas/create_NewsCategory'
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
*  /admin/newscategory/list:
*      get:
*          tags: [Admin-NewsCategory]
*          summary: list of NewsCategory document 
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
*  /admin/newscategory/list/{id}:
*      get:
*          tags: [Admin-NewsCategory]
*          summary: list of NewsCategory document 
*          parameters: 
*              -   in: path
*                  name: id
*                  type: string
*                  required: true
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
 *  /admin/newscategory/update/{id}:
 *      patch:
 *          tags: [Admin-NewsCategory]
 *          summary: upadte NewsCategory document 
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          consumer: 
 *              -   multipart/form-data
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/UpdateNewsCategory'
 *          responses: 
 *                  201:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition' 
 */

/**
 * @swagger 
 *  /admin/newscategory/delete/{id}:
 *      delete:
 *          tags: [Admin-NewsCategory]
 *          summary: delete NewsCategory document 
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *                  201:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition' 
 */