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
 *          UpdateCategory: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Producer
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