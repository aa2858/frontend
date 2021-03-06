import { Linking, Alert } from 'react-native'
import { getReadableVersion } from 'react-native-device-info'
import * as Logger from 'services/Logger'

export const versionCheck = (async () => {
  try {
    const data = await (async () => {
      const data = await fetch('https://d3dclx0mrf3ube.cloudfront.net/versions/production.json')
      return await data.json()
    })()

    const forced = (
      Config.ENVIRONMENT !== 'development' &&
      !getReadableVersion().includes(data.minor) &&
      !getReadableVersion().includes(data.major)
    )

    if (forced) {
      Alert.alert(
        'App Update Available',
        'Please update REAL to continue',
        [{
          text: 'Update Now',
          onPress: () => Linking.openURL('itms-apps://itunes.apple.com/app/id1485194570'),
          style: 'cancel',
        }],
        { cancelable: false },
      )
    }
  } catch (error) {
    Logger.captureException(error)
  }
})