module.exports = {
    MOBILE_PATTERN: /^09[0-9]{9}$/,
    PHONE_PATTERN: /^0\d{2,3}-\d{8}$/,
    EMAIL_PATTERN: /^([a-z]+)([\w\.\_]{3,20})(\@)([a-z]{2,8})\.([a-z]{2,7})$/,
    MONGOID_PATTERN: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ACCESS_Token_SECRETKEY: "4425A5AC563964A6DEBE14AEA4AB24C8513513935070B309",
    REFRESH_TOKEN_SECRETKEY: "D17C777EF75B85AD281B42DADEA3730A2B19D6BE7237DA67",
    FILENMAE_IMAGE_PATTERN: /(\.png|\.jpg|\.jpeg|\.webp|\.gif|\.jfif)$/,
    FILENMAE_ICON_PATTERN: /(\.svg|\.png|\.ico|\.avif)$/,
    ROLES: Object.freeze({
        BUYER: "BUYER",
        ADMIN: "ADMIN",
        USER:  "USER"
    }),
    MULTRE_FILENAME: Object.freeze({
        BLOGS: "BLOGS",
        PRODUCTS: "PRODUCTS"
    }),
    PERMISSIONS: Object.freeze(
        {
            USER: ["profile"],
            ADMIN: ["all"],
            ALL: "all"
        }
    ),
}