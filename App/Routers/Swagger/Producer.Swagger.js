/**
 * @swagger 
 *  components:
 *      schemas:
 *          Add_Producer: 
 *              type: object
 *              required: 
 *                  -   title
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Producer 
 *                  description: 
 *                      type: string
 *                      description: the parent of Producer
 *          Update_Producer: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Producer 
 *                  description: 
 *                      type: string
 *                      description: the parent of Produce 
 */

/**
 * @swagger 
 *  /admin/producer/create: 
 *      post: 
 *          tags: [Admin-Producer]
 *          summary: Producer in website
 *          description: Producer is sub to Producer
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Add_Producer'          
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Add_Producer'
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
 *  /admin/producer/list:
 *      get: 
 *          tags: [Admin-Producer]
 *          summary: List Of Producer In admin panel
 *          description: List Of Producer in admin panel
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  required: true
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
 *  /admin/producer/list/{id}:
 *      get: 
 *          tags: [Admin-Producer]
 *          summary: List Of Producer By Id
 *          description: List Of Producer By Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
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
 *  /admin/producer/update/{id}: 
 *      patch: 
 *          tags: [Admin-Producer]
 *          summary: update Producer with Id
 *          description: update Producerin admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Update_Producer'
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
 *  /admin/producer/delete/{id}: 
 *      delete: 
 *          tags: [Admin-Producer]
 *          summary: delete Producer with Id
 *          description: delete Producer in admin panel
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