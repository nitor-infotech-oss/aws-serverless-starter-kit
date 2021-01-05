import React from 'react';
import { updateItem } from '../graphql/mutations';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class EditItem extends React.Component {

    state = {
        show: false,
        itemData: {
            text: this.props.text,
            checked: this.props.checked
        }
    }


    handleModal = () => {
        this.setState({ show: !this.state.show })
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    handleSubmit = (e, updateItem) => {
        e.preventDefault();
        updateItem({
            variables: {
                input: {
                    text: this.state.itemData.text,
                    checked: this.state.itemData.checked,
                },
                id: this.props.id
            }

        }).then(res => this.handleModal())
    }

    handleText = (e) => {
        this.setState({ itemData: { ...this.state.itemData, text: e.target.value } })
    }

    handleChecked = (e) => {
        this.setState({ itemData: { ...this.state.itemData, checked: !this.state.itemData.checked } })
    }

    render() {
        return (
            <>
                {this.state.show &&
                    < div className="modal">
                        <button className="close" onClick={this.handleModal}>X</button>
                        <Mutation mutation={gql(updateItem)}  >
                            {(updateItem) => {
                                return (
                                    <form className="add-todo" onSubmit={(e) =>
                                        this.handleSubmit(e, updateItem)}>
                                        <input type="text"
                                            required
                                            value={this.state.itemData.text}
                                            onChange={this.handleText}

                                        />
                                        <span className="checkbox"> 
                                            <input type="checkbox"
                                                defaultChecked={this.state.itemData.checked}
                                                onChange={this.handleChecked}
                                            />
                                            Is Checked? 
                                        </span>
                                        <button>Update Todo</button>
                                    </form>
                                )

                            }}

                        </Mutation>
                    </div>
                }
                <button onClick={this.handleModal}>Edit</button>
            </>
        )

    }
}




export default EditItem;