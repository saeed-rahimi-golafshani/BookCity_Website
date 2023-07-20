/**
* @swagger 
*  components:
*      schemas: 
*          create_Permission:
*              type: object
*              properties: 
*                   name: 
*                       type: string
*                       description: the name of Permission
*                   description: 
*                       type: string
*                       description: the description of Permission
*          UpdatePermission:
*               type: object
*               properties: 
*                   name: 
*                       type: string
*                       description: the name of permission
*                   description: 
*                       type: string
*                       description: the description of permission
*/

/**
* @swagger 
*  /admin/permission/create:
*      post:
*          tags: [Admin-Permission]
*          summary: create permission document 
*          requestBody: 
*              required: true
*              content:
*                  application/x-www-form-urlencoded:
*                      schema:         
*                          $ref: '#/components/schemas/create_Permission'
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
*  /admin/permission/list:
*      get:
*          tags: [Admin-Permission]
*          summary: get permission document 
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
 *  /admin/permission/update/{id}:
 *      patch:
 *          tags: [Admin-Permission]
 *          summary: upadte Permission document 
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:         
 *                          $ref: '#/components/schemas/UpdatePermission'
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
 *  /admin/permission/remove/{id}:
 *      delete:
 *          tags: [Admin_Permission]
 *          summary: remove the Permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true        
 *          responses:
 *              200:
 *                  description: removed the Permission
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 * 
 */