/**
 * @swagger 
 *  components:
 *      schemas:
 *          LoginOtp: 
 *              type: object
 *              required: 
 *                  -   mobile
 *              properties: 
 *                  mobile: 
 *                      type: string
 *                      description: the user mobile for signUp/signIn
 *          CheckLogin:
 *              type: object
 *              required: 
 *                  -   mobile
 *                  -   code
 *              properties: 
 *                  mobile: 
 *                      type: string
 *                      description: the user mobile for Check Login
 *                  code: 
 *                      type: string
 *                      description: the Otp code
 *          refreshToken:
 *              type: object
 *              required: 
 *                  -   refreshToken
 *              properties: 
 *                  refreshToken:
 *                      type: string
 *                      description: the refreshToken
 */

/**
 * @swagger 
 *  /users/login: 
 *      post: 
 *          tags: [User-Authentication]
 *          summary: Login User In Otp Code with Mobile
 *          description: One Time Password (OTP) login
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/LoginOtp'             
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginOtp'
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