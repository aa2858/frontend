import React from 'react'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileServiceComponent from 'components/Profile/index.service'
import ProfileComponent from 'components/Profile'
import { Provider as PaperProvider } from 'react-native-paper'
import UserServiceProvider from 'services/providers/User'

class ProfileScreen extends React.Component {
  render() {
    return (
      <ProfileServiceComponent>
        {(profileProps) => (
          <UserServiceProvider>
            {((userProps) => (
              <PaperProvider theme={this.props.route.params.theme}>
                <PostsGridServiceComponent>
                  {(postsProps) => (
                    <ProfileComponent
                      {...profileProps}
                      {...postsProps}
                      {...userProps}
                    />
                  )}
                </PostsGridServiceComponent>
              </PaperProvider>
            ))}
          </UserServiceProvider>
        )}
      </ProfileServiceComponent>
    )
  }
}

export default ProfileScreen