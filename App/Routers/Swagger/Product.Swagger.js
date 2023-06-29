/**
 * @swagger
 *  components: 
 *      schemas:
 *          Active:
 *              type: string
 *              enum:
 *                  -   active
 *                  -   unactive
 */
/**
 * @swagger 
 *  components:
 *      schemas: 
 *          Create_Product:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   introduction
 *                  -   images
 *                  -   image_refrence
 *                  -   category
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Product
 *                  en_title: 
 *                      type: string
 *                      description: the en_title of Product
 *                  introduction: 
 *                      type: string
 *                      description: the summery of text of Product
 *                  expert_Check: 
 *                      type: string
 *                      description: the text of Product
 *                  category: 
 *                      type: string
 *                      description: the category for fprienkey of Product
 *                  subcategory: 
 *                      type: string
 *                      description: the subcategory for fprienkey of Product
 *                  tags: 
 *                      type: array
 *                      description: the tags of Product
 *                  image_refrence:
 *                      type: file
 *                      description: the tags of Product
 *                  images: 
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  main_price: 
 *                      type: number
 *                      description: the source of Product
 *                  discount: 
 *                      type: number
 *                      description: the source of Product
 *                  count: 
 *                      type: number
 *                      description: the source of Product
 *                  description: 
 *                      type: string
 *                      description: the source of blProductg
 *                  seller: 
 *                      type: string
 *                      description: the source of Product
 *                  producer: 
 *                      type: string
 *                      description: the source of Product
 *                  active:      
 *                      $ref: '#/components/schemas/Active'
 *          UpdateProduct:
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Product
 *                  en_title: 
 *                      type: string
 *                      description: the en_title of Product
 *                  introduction: 
 *                      type: string
 *                      description: the summery of text of Product
 *                  expert_Check: 
 *                      type: string
 *                      description: the text of Product
 *                  category: 
 *                      type: string
 *                      description: the category for prienkey of Product
 *                  subcategory: 
 *                      type: string
 *                      description: the subcategory for prienkey of Product
 *                  tags: 
 *                      type: array
 *                      description: the tags of Product
 *                  image_refrence:
 *                      type: file
 *                      description: the tags of Product
 *                  images: 
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  main_price: 
 *                      type: number
 *                      description: the source of Product
 *                  discount: 
 *                      type: number
 *                      description: the source of Product
 *                  count: 
 *                      type: number
 *                      description: the source of Product
 *                  description: 
 *                      type: string
 *                      description: the source of Product
 *                  seller: 
 *                      type: string
 *                      description: the source of Product
 *                  producer: 
 *                      type: string
 *                      description: the source of Product
 */   

/**
 * @swagger 
 *  /admin/product/create:
 *      post:
 *          tags: [Admin-Product]
 *          summary: create product document 
 *          consumer: 
 *              -   multipart/form-data
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/Create_Product'
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
 *  /admin/product/list:
 *      get: 
 *          tags: [Admin-Product]
 *          summary: get listof Product without Id
 *          parameters: 
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title of product
 *          responses: 
 *                  201:
 *                      description: success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfblog'
 */
/**
 * @swagger 
 *  /admin/product/list/{id}:
 *      get: 
 *          tags: [Admin-Product]
 *          summary: get listof Product with Id
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
 *                                  $ref: '#/definitions/ListOfblog'
 */

/**
 * @swagger 
 *  /admin/product/list_of_producer/{producerId}:
 *      get: 
 *          tags: [Admin-Product]
 *          summary: get listof Product with Id
 *          parameters: 
 *              -   in: path
 *                  name: producerId
 *                  type: string
 *                  required: true
 *          responses: 
 *                  201:
 *                      description: success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfblog'
 */

/**
 * @swagger 
 *  /admin/product/update/{id}:
 *      patch:
 *          tags: [Admin-Product]
 *          summary: upadte Product document 
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
 *                          $ref: '#/components/schemas/UpdateProduct'
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
 *  /admin/product/delete/{id}:
 *      delete:
 *          tags: [Admin-Product]
 *          summary: delete Product document 
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