import React from 'react';
import EditItem from './editItem'
import DeleteItem from './deleteItem'

class Item extends React.Component {

    componentDidMount() {
        this.props.subscribeToMore();
    }


    render() {
        const items = this.props.data.allItems;

        return items.map((item) => {
            return (
                <div key={item.id}>
                    <h1>{item.text}</h1>
                    
                    <p>Is Checked? <input type="checkbox" checked={item.checked}  readOnly/></p>
                    <br/>
                    <EditItem {...item} />
                    <DeleteItem {...item} />
                </div>

            )
        })


    }

}


export default Item;