import gql from 'graphql-tag';


//mutations



// types
export const User = {
	__typename: 'User',
	firstname: String,
	lastname: String,
	email: String,
	_id: String,
}




// query
export const GetAllUsersQuery = gql`
	query{ 
  		users{
    			firstname
    			lastname
    			email
    			_id
  			}
	}
`
