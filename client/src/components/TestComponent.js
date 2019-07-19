import React, {Component} from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';



const getAllUserQuery = gql`
{
  users{
    firstname
    lastname
    email
    _id
  }
}
`




class TestComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: null
    }
  }


 showalluser(){
   console.log(this.props);
   let data = this.props.data;
   if(data.loading){
     return (<div> loading data.... </div>);
   }else{
     return data.users.map(user => {
       return (
         <li key={user._id} onClick={ (e) => this.setState({selected: user._id})}> {user.firstname} {user.lastname}</li>
       );
     })
   }
 }



  render(){
    return (
            <div id="main">
              <h1> return all users</h1>
              <ul>
                { this.showalluser() }
              </ul>
            </div>
    )
  }
}


export default graphql(getAllUserQuery)(TestComponent);
