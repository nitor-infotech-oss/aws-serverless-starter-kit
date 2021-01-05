import React from "react";
import { Mutation } from "react-apollo";
import { createItem} from "../graphql/mutations";
import gql from "graphql-tag";

class CreateItem extends React.Component {
  state = { checked : false, description: '' }
  
  handleSubmit = (e, createItem) => {
    e.preventDefault();
    createItem({
      variables: {
        input: {
          text: this.text.value,
          description: this.state.description,
          checked: this.state.checked,
        }
      }
    }).then(res => {
      this.text.value = "";
      this.setState({ description: '' });
      this.setState({ checked :false });
    });
  };

  handleChecked = (e) => {
    this.setState({ checked: !this.state.checked })
  }

  handleDescription = (event) => {
    this.setState({ description: event.target.value });
  }


  render() {
    return (
      <div>
        <h1>Create Item</h1>

        <Mutation mutation={gql(createItem)}>
          {(createItem, { data, loading, error }) => {
            return (
              <div>
                <form
                  className="add-todo"
                  onSubmit={e => this.handleSubmit(e, createItem)}
                >
                  <input
                    type="text" placeholder="Item Text"
                    ref={node => (this.text = node)}
                    required
                  />
                  <textarea placeholder="Item Description"
                    ref={node => (this.description = node)}
                    value={this.state.description} 
                    onChange={this.handleDescription} 
                  />
                  <span className="checkbox">
                    <input
                      type="checkbox" placeholder="is Checked?"
                      ref={node => (this.checked = node)}
                      defaultChecked={this.state.checked}
                      onChange={this.handleChecked}  
                    />
                    Is Checked?
                  </span>
                  <button>{loading ? "Yes Creating..." : "Create Item"}
                  </button>
                </form>
                {error && <p>{error.message}</p>}
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default CreateItem;