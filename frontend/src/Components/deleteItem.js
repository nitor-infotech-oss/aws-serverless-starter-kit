import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { deleteItem } from '../graphql/mutations';
import gql from 'graphql-tag';
import { listItems } from '../graphql/queries';



class DeleteItem extends Component {


    handleDelete = (deleteItem) => {
        deleteItem({
            variables: {
                id: this.props.id
            },
            optimisticResponse: () => ({
                deleteItem: {
                    // This type must match the return type of the query below (listItems)
                    __typename: 'ModelPostConnection',
                    id: this.props.id,
                    text: this.props.text,
                    checked: this.props.checked,
                }
            }),
            update: (cache, { data: { deleteItem } }) => {
                const query = gql(listItems);

                // Read query from cache
                const data = cache.readQuery({ query });

                // Add updated todosList to the cache copy
                data.allItems = [
                    ...data.allItems.filter(item => item.id !== this.props.id)
                ];

                //Overwrite the cache with the new results
                cache.writeQuery({ query, data });
            }
        })
    }

    render() {
        return (
            <Mutation mutation={gql(deleteItem)}>
                {(deleteItem, { loading, error }) => {
                    return <button onClick={() => this.handleDelete(deleteItem)}>
                        Delete</button>
                }}
            </Mutation>
        )
    }
}


export default DeleteItem;