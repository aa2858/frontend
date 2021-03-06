import { Image } from 'react-native'
import { put, takeLatest, getContext } from 'redux-saga/effects'
import path from 'ramda/src/path'
import RNFetchBlob from 'rn-fetch-blob'
import * as actions from 'store/ducks/posts/actions'
import * as constants from 'store/ducks/posts/constants'
import CameraRoll from '@react-native-community/cameraroll'
import Share from 'react-native-share'
import Marker from 'react-native-image-marker'
import { v4 as uuid } from 'uuid'

function* handlePostsShareRequest(payload) {
  function* handeImageWatermark(url, hasWatermark, post) {
    if (!hasWatermark) {
      return url
    }

    const getSize = new Promise((resolve, reject) => Image.getSize(url, (width, height) => resolve({ width, height }), reject))
    const size = yield getSize

    const fontSizeFirstLine = size.height / 30
    const fontSizeSecondLine = size.height / 60

    const rgbToHex = (rgb) => {
      let hex = Number(rgb).toString(16)
      if (hex.length < 2) {
        hex = `0${hex}`
      }
      return hex
    }

    const fullColorHex = (r, g, b) => {
      const red = rgbToHex(r)
      const green = rgbToHex(g)
      const blue = rgbToHex(b)
      return `#${red}${green}${blue}`
    }

    const color = path(['image', 'colors', 1])(post) || { r: 255, b: 255, g: 255 }

    const firstLine = yield Marker.markText({
      src: url,
      text: `REAL`,
      color: fullColorHex(color.r, color.g, color.b),
      fontName: 'AppleSDGothicNeo-Bold',
      fontSize: fontSizeFirstLine,
      X: 10,
      Y: size.height - fontSizeFirstLine * 2,
      scale: 1, 
      quality: 100,
    })

    const secondLine = yield Marker.markText({
      src: firstLine,
      text: `${post.postedBy.username}`,
      color: fullColorHex(color.r, color.g, color.b),
      fontName: 'AppleSDGothicNeo-Bold',
      fontSize: fontSizeSecondLine,
      X: 15,
      Y: size.height - fontSizeFirstLine * 2 + fontSizeFirstLine,
      scale: 1, 
      quality: 100,
    })

    return secondLine
  }
  
  function* handleInstagramPostShare({ url, title }) {
    const shareOptions = {
      url,
      type: 'image/jpeg',
      social: Share.Social.INSTAGRAM,
      title,
    }

    yield Share.shareSingle(shareOptions)
  }
  
  function* handleInstagramStoryShare({ url, title }) {
    const shareOptions = {
      url,
      type: 'image/jpeg',
      social: Share.Social.INSTAGRAM,
      title,
    }

    yield Share.shareSingle(shareOptions)
  }
  
  function* handleFacebookShare({ url, title }) {
    const shareOptions = {
      url,
      type: 'image/jpeg',
      social: Share.Social.FACEBOOK,
      title,
    }

    yield Share.shareSingle(shareOptions)
  }

  function* handleNativeShare({ url, title }) {
    const shareOptions = {
      url,
      type: 'image/jpeg',
      title,
    }

    yield Share.open(shareOptions)
  }

  function* handleRepost({ url, title, post }) {
    const postId = uuid()
    const mediaId = uuid()

    return yield put(actions.postsCreateRequest({
      postId,
      postType: 'IMAGE',
      mediaId,
      lifetime: null,
      text: post.text,
      images: [url],
      commentsDisabled: post.commentsDisabled,
      likesDisabled: post.likesDisabled,
      sharingDisabled: post.sharingDisabled,
      takenInReal: path(['image', 'isVerified'])(post),
      originalFormat: 'jpg',
    }))
  }

  function* handleCameraRollSave(photoUri) {
    yield CameraRoll.saveToCameraRoll(photoUri)
    const photo = yield CameraRoll.getPhotos({
      first: 1,
      assetType: 'All',
    })
    return path(['edges', '0', 'node', 'image', 'uri'])(photo)
  }

  const res = yield (function* () {
    if (!payload.photoUrl.includes('http')) {
      return payload.photoUrl
    }

    const fetchConfig = { fileCache: true, appendExt: 'iga' }
    const response = yield RNFetchBlob.config(fetchConfig).fetch('GET', payload.photoUrl)
    const status = response.info().status
    if(status !== 200) {
      throw new Error('error occured')
    }
    return response.path()
  })()

  const watermarked = yield handeImageWatermark(res, payload.watermark, payload.post)

  if (payload.type === 'cameraroll') {
    yield handleCameraRollSave(watermarked)
  }

  if (payload.type === 'instagramPost') {
    yield handleInstagramPostShare({ url: watermarked, title: payload.title })
  }

  if (payload.type === 'instagramStory') {
    yield handleInstagramStoryShare({ url: watermarked, title: payload.title })
  }

  if (payload.type === 'facebook') {
    yield handleFacebookShare({ url: watermarked, title: payload.title })
  }

  if (payload.type === 'global') {
    yield handleNativeShare({ url: watermarked, title: payload.title })
  }

  if (payload.type === 'repost') {
    yield handleRepost({ url: watermarked, title: payload.title, post: payload.post })
  }
}

/**
 *
 */
function* postsShareRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    yield handlePostsShareRequest(req.payload)
    yield put(actions.postsShareSuccess({ data: {}, meta: {} }))
  } catch (error) {
    yield put(actions.postsShareFailure({ message: errorWrapper(error) }))
  }
}

export default () => [
  takeLatest(constants.POSTS_SHARE_REQUEST, postsShareRequest),
]