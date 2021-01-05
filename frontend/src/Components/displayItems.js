import React from 'react'
import { Query } from 'react-apollo'
import { listItems } from '../graphql/queries';
import { onCreateItem } from '../graphql/subscriptions'
import gql from 'graphql-tag';
import Item from './item'

class DisplayItems extends React.Component {

    subsCribeNewItems = (subscribeToMore) => {
        return subscribeToMore({
            document: gql(onCreateItem),
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newItemData = subscriptionData.data.addedItem;
                return Object.assign({}, prev, {
                    ...prev.allItems,
                    allItems: [...prev.allItems, newItemData]
                })
               
            }
        })
    }


    render() {
        return (
            <div className="todos">
                <h1><u>Items List </u></h1> 
                <Query query={gql(listItems)}  >
                    {({ loading, data, error, subscribeToMore }) => {
                        if (loading) return <p>loading...</p>
                        if (error) return <p>{error.message}</p>
                        return <Item data={data} subscribeToMore={() =>
                            this.subsCribeNewItems(subscribeToMore)} />
                    }}
                </Query>



            </div>
        )
    }
}

export default DisplayItems;