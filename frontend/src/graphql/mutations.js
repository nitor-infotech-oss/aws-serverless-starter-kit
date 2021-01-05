// eslint-disable
// this is an auto generated file. This will be overwritten

export const createItem = `mutation CreateItem($input: ItemInput!) {
    addItem(input: $input) {
      id
      text
      description
      checked
    }
  }
  `;
  export const updateItem = `mutation UpdateItem($id : String!, $input: ItemInput!) {
    updateItem(id: $id, input: $input) {
      id
      text
      description
      checked
    }
  }
  `;
  export const deleteItem = `mutation DeleteItem($id: String!) {
    deleteItem(id: $id) 
  }
  `;