/**
 * @swagger 
 *  components:
 *      schemas: 
 *         createContact:
 *              type: object
 *              required: 
 *                  -   phone
 *                  -   email
 *                  -   address
 *                  -   fax
 *              properties: 
 *                  phone: 
 *                      type: string
 *                      description: the phone of Contact
 *                  email: 
 *                      type: string
 *                      description: the email of Contact
 *                  address: 
 *                      type: string
 *                      description: the address of Contact
 *                  fax: 
 *                      type: string
 *                      description: the faxm of Contact
 *          UpdateContact:
 *              type: object
 *              properties: 
 *                  phone: 
 *                      type: string
 *                      description: the phone of Contact
 *                  email: 
 *                      type: string
 *                      description: the email of Contact
 *                  address: 
 *                      type: string
 *                      description: the address of Contact
 *                  fax: 
 *                      type: string
 *                      description: the faxm of Contact
 */

/**
 * @swagger 
 *  /admin/contact/create:
 *      post:
 *          tags: [Admin-Contact]
 *          summary: create Contact document 
 *          consumer: 
 *              -   multipart/form-data
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/createContact'
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
 *  /admin/contact/list:
 *      get: 
 *          tags: [Admin-Contact]
 *          summary: get listof Contact without Id
 *          responses: 
 *                  201:
 *                      description: success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'
 */

/**
 * @swagger 
 *  /admin/contact/update/{id}:
 *      patch:
 *          tags: [Admin-Contact]
 *          summary: upadte Contact document 
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
 *                          $ref: '#/components/schemas/UpdateContact'
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
 *  /admin/conatct/delete/{id}:
 *      delete:
 *          tags: [Admin-Contact]
 *          summary: delete Contact document 
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