/**
 * @swagger
 *  definitions:
 *      ListOfNews:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      News:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "6403548e530901e984e7de91"
 *                                  title:
 *                                      type: string
 *                                      example: "title of news"
 *                                  text:
 *                                      type: string
 *                                      example: "summary text of news"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary text of news"
 *                                  category: 
 *                                      type: string
 *                                      example: "text of news"
 *                                  image_refrence: 
 *                                      type: string
 *                                      example: "refrence image of news"
 *                                  images: 
 *                                      type: array
 *                                      items: 
 *                                          type: string
 *                                          example: "image of news" 
 *                                  tags: 
 *                                      type: array
 *                                      items: 
 *                                          type: string
 *                                          example: "tags of news"
 *                                  source: 
 *                                      type: array
 *                                      items: 
 *                                          type: string
 *                                          example: "source of news"
 *                                  time_range:
 *                                      type: string
 *                                      example: "summary text of news"
 */
/**
 * @swagger 
 *  components:
 *      schemas: 
 *          create_News:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   images
 *                  -   image_refrence
 *                  -   newscategory
 *                  -   time_range
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of News
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of News
 *                  text: 
 *                      type: string
 *                      description: the text of News
 *                  newscategory: 
 *                      type: array
 *                      description: the category for fprienkey of News
 *                  tags: 
 *                      type: array
 *                      description: the tags of News
 *                  image_refrence:
 *                      type: file
 *                      description: the tags of News
 *                  images: 
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  source: 
 *                      type: array
 *                      description: the source of News
 *                  time_range: 
 *                      type: string
 *                      description: the time_range of News
 *          UpdateNews:
 *              type: object
 *              properties: 
  *                  title: 
 *                      type: string
 *                      description: the title of News
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of News
 *                  text: 
 *                      type: string
 *                      description: the text of News
 *                  newscategory: 
 *                      type: array
 *                      description: the category for fprienkey of News
 *                  tags: 
 *                      type: array
 *                      description: the tags of News
 *                  image_refrence:
 *                      type: file
 *                      description: the tags of News
 *                  images: 
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  source: 
 *                      type: array
 *                      description: the source of News
 *                  time_range: 
 *                      type: string
 *                      description: the time_range of News
 */

/**
 * @swagger 
 *  /admin/news/create:
 *      post:
 *          tags: [Admin-News]
 *          summary: create News document 
 *          consumer: 
 *              -   multipart/form-data
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/create_News'
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
 *  /admin/news/list:
 *      get: 
 *          tags: [Admin-News]
 *          summary: get listof News without Id
 *          parameters: 
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title of News
 *          responses: 
 *                  201:
 *                      description: success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfNews'
 */
/**
 * @swagger 
 *  /admin/news/list/{id}:
 *      get: 
 *          tags: [Admin-News]
 *          summary: get listof News with Id
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *                  201:
 *                      description: success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfNews'
 */
/**
 * @swagger 
 *  /admin/news/listbycategory/{catId}:
 *      get: 
 *          tags: [Admin-News]
 *          summary: get listof News with Id
 *          parameters: 
 *              -   in: path
 *                  name: catId
 *                  type: string
 *                  required: true
 *          responses: 
 *                  201:
 *                      description: success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfNews'
 */
/**
 * @swagger 
 *  /admin/news/update/{id}:
 *      patch:
 *          tags: [Admin-News]
 *          summary: upadte News document 
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
 *                          $ref: '#/components/schemas/UpdateNews'
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
 *  /admin/news/delete/{id}:
 *      delete:
 *          tags: [Admin-News]
 *          summary: delete News document 
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