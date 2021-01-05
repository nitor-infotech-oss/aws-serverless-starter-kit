// eslint-disable
// this is an auto generated file. This will be overwritten

export const getItem = `query getItem($id: String!) {
    getItem(id: $id) {
        id
        text
        description
        checked
    }
}
`;

export const listItems = `query allItems {
    allItems {
        id
        text
        description
        checked
    }
}
`;