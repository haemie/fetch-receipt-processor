import Ajv from "ajv";
import addFormats from "ajv-formats"
const ajv = new Ajv({allErrors: true, validateFormats: true});
require("ajv-errors")(ajv /*, {singleError: true} */)

// declare the default formats we are using, and add custom formats according to api requirements
addFormats(ajv, ["date", "time", "uuid"] )
ajv.addFormat('uuid', "^\\S+$")
// ajv.addFormat('retailer', "^\\S+$") // pattern from api, but should not fail according to example
ajv.addFormat('total', "^\\d+\\.\\d{2}$")
ajv.addFormat('shortDescription', "^[\\w\\s\\-]+$")
ajv.addFormat('price', "^\\d+\\.\\d{2}$")
ajv.addFormat('time', /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)

const itemSchema = {
  type: "object",
  errorMessage: {
    type: 'item must be an object', 
  },
  properties: {
    shortDescription: {type: "string", format: "shortDescription",   errorMessage: {
      type: 'shortDescription must be a string following "^[\\w\\s\\-]+$"', 
    }},
    price: {type: "string", format: "price", errorMessage: {
      type: 'price must be a string following "^\\d+\\.\\d{2}$"', 
    }}
  }
}

const receiptSchema = {
  type: "object",
  properties: {
    retailer: {type: "string", errorMessage: {
      type: 'retailer must be a string following', 
    }},
    purchaseDate: {type: "string", format: "date", errorMessage: {
      type: 'purchaseDate must be a string following RFC3339', 
    }},
    purchaseTime: {type: "string", format: "time", errorMessage: {
      type: 'purchaseTime must be a string following /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/', 
    }},
    items: {type: "array", minItems: 1, items: itemSchema, errorMessage: {
      type: 'items must be an array of items with at least 1 item', 
    }},
    total: {type: "string", format: "total", errorMessage: {
      type: 'total must be a string following "^\\d+\\.\\d{2}$"',
    } }
  }
}

const idSchema = {
  type: "string", format: "uuid"
}

export const validateItemSchema = ajv.compile(itemSchema);
export const validateReceiptSchema = ajv.compile(receiptSchema);
export const validateIdSchema = ajv.compile(idSchema);