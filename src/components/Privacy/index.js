import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import PrivacyForm from 'components/Privacy/Form'
import Disclaimer from 'components/Privacy/Disclaimer'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Privacy = ({
  theme,
  user,
  togglePrivacyStatus,
  toggleFollowCountsHidden,
  toggleViewCountsHidden,
  toggleLikesDisabled,
  toggleCommentsDisabled,
  toggleSharingDisabled,
  toggleVerificationHidden,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <ScrollView>
      <View style={styling.root}>
        <PrivacyForm
          user={user}
          togglePrivacyStatus={togglePrivacyStatus}
          toggleFollowCountsHidden={toggleFollowCountsHidden}
          toggleViewCountsHidden={toggleViewCountsHidden}
          toggleLikesDisabled={toggleLikesDisabled}
          toggleCommentsDisabled={toggleCommentsDisabled}
          toggleSharingDisabled={toggleSharingDisabled}
          toggleVerificationHidden={toggleVerificationHidden}
        />
        <Disclaimer />
      </View>
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: theme.spacing.base,
  },
  form: {
    padding: theme.spacing.base,
  },
})

Privacy.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
  togglePrivacyStatus: PropTypes.any,
  toggleFollowCountsHidden: PropTypes.any,
}

export default withTheme(Privacy)
