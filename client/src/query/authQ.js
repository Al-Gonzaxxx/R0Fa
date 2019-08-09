import gql from 'graphql-tag';





//Types



// Mutations

export const LoginMutation = gql`
        mutation Login($email: String!,$password: String!) {
          login(email: $email,password: $password) {
            token
            userId
            tokenExpiration
        }
    }
` 

export const VerifyEmailMutation = gql`
        mutation VerifyEmail($email: String!,$token: String!) {
          verifyEmail(email: $email,token: $token) {
            status
            message
        }
    }
`


//Queries




