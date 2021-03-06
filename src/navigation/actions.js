/**
 * Root -> Home -> Feed -> Feed
 */

export const navigateBack = (navigation, params) => () =>
  navigation.goBack()

export const navigateHome = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'Home',
    params: {
      screen: 'Feed',
      params: {
        screen: 'Feed',
          ...params,
      },
    },
  })

export const navigatePostCreate = (navigation, params) => () =>
  navigation.navigate('Root', {
    screen: 'PostCreate',
    params,
  })

export const navigateCamera = (navigation, params) => () =>
  navigation.navigate('Camera', params)

export const navigateStory = (navigation, params) => () =>
  navigation.push('Story')

export const navigateChat = (navigation, params) => () =>
  navigation.navigate('Chat')

export const navigateVerification = (navigation, params) => () =>
  navigation.navigate('Verification', params)

export const navigatePostShare = (navigation, params) => () =>
  navigation.push('PostShare', params)

export const navigatePostEdit = (navigation, params) => () =>
  navigation.navigate('PostEdit', params)

export const navigateProfileRequests = (navigation, params) => () =>
  navigation.navigate('ProfileRequests', params)

export const navigateAlbum = (navigation, params) => () =>
  navigation.push('Album', params)

export const navigateAlbumCreate = (navigation, params) => () =>
  navigation.navigate('AlbumCreate', params)

export const navigateAlbums = (navigation, params) => () =>
  navigation.navigate('Albums', params)

export const navigateComments = (navigation, params) => () =>
  navigation.push('Comments', params)

export const navigatePostType = (navigation, params) => () =>
  navigation.navigate('PostType', params)

export const navigateProfile = (navigation, params) => () =>
  navigation.push('Profile', params)

export const navigateProfileSelf = (navigation, params) => () =>
  navigation.push('ProfileSelf', params)

export const navigateProfileFollower = (navigation, params) => () =>
  navigation.push('ProfileFollower', params)

export const navigateProfileFollowed = (navigation, params) => () =>
  navigation.push('ProfileFollowed', params)

export const navigatePostMedia = (navigation, params) => () =>
  navigation.push('PostMedia', params)

export const navigatePostLikes = (navigation, params) => () =>
  navigation.push('PostLikes', params)

export const navigatePostViews = (navigation, params) => () =>
  navigation.push('PostViews', params)

export const navigateSettings = (navigation, params) => () =>
  navigation.navigate('Settings', params)

export const navigatePayout = (navigation, params) => () =>
  navigation.navigate('Payout', params)

/**
 * 
 */
export const navigateAuth = (navigation, params) => () =>
  navigation.navigate('Auth', params)

export const navigateAuthForgot = (navigation, params) => () =>
  navigation.navigate('AuthForgot', params)

export const navigateAuthForgotConfirm = (navigation, params) => () =>
  navigation.navigate('AuthForgotConfirm', params)

export const navigateAuthSignup = (navigation, params) => () =>
  navigation.navigate('AuthSignup', params)

export const navigateAuthSignupConfirm = (navigation, params) => () =>
  navigation.navigate('AuthSignupConfirm', params)
