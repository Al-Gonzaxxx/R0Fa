import * as React from 'react'



const UserState={
	userId: String,
	loggingIn: Boolean
}

export const UserContext = React.createContext({
  userState: UserState,
  setUserState: () => {},
  //getUser: () => {},
  signUp: () => {},
  logIn: () => {},
  logOut: () => {},
})

export const UserProvider = props => {
  const initUserState = {userId:null,loggingIn: true};
  const [userState, setUserState] = React.useState(initUserState);

  const getUser = async () => {
    // let user = null
    // try {
    //   user = await accountsGraphQL.getUser()
    //   console.log('!!!user', user)
    // } catch (error) {
    //   console.error('There was an error logging in.', error)
    // } finally {
    //   setUserState({ user: user && { ...user, _id: user.id }, loggingIn: false })
    // }
  }

  const logIn = async (email, password) => {
    // await accountsPassword.login({ password, user: { email } })
    // await getUser()
  }

  const signUp = async (
    firstName,
    lastName,
    email,
    password,
    isLandlord
  ) => {
    // await accountsPassword.createUser({
    //   password,
    //   email,
    //   profile: { firstName, lastName },
    // })
    // await logIn(email, password)
  }

  const logOut = async () => {
    // await accountsGraphQL.logout()
    setUserState({ user: undefined, loggingIn: false });
  }

  return (
    <UserContext.Provider
      value={{
        userState,
        setUserState,
        getUser,
        signUp,
        logIn,
        logOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => React.useContext(UserContext)