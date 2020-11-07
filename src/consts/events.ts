enum Events {
    PathChanged = 'pathChanged',
    RedirectBack = 'redirectBack',
    ProfileTabChanged = 'profileTabChanged',
    OpenInfoBlock = 'openInfoBlock',
    ContentInfoRequested = 'contentInfoRequested',
    ContentByExternalReference = 'сontentByExternalReference',
    RevealPopup = 'revealPopup',
    ContentInfoTabChanged = 'contentInfoTabChanged',
    InfoBlockClosed = 'infoBlockClosed',
    SubmitForm = 'submitForm',
    SubmitProfileForm = 'submitProfileForm',
    SignupUser = 'signupUser',
    LoginUser = 'loginUser',
    LogoutUser = 'logoutUser',
    UpdateProfileInfo = 'updateProfileInfo',
    UpdateProfileAvatar = 'updateProfileAvatar',
    UpdateUserProfile = 'updateUserProfile',
    UploadAvatar = 'uploadAvatar',
    VideoPlay = 'videoPlay',
    VideoPause = 'videoPause',
    Mute = 'mute',
    VolumeOn = 'volumeOn',
    FullscreenModeOn = 'fullscreenModeOn',
    FullscreenModeOff = 'fullscreenModeOff',
    UpdateHeader = 'updateHeader',
    OpenSubMenuGenres = 'openSubMenuGenres',
    ContentIsAdded = 'contentIsAdded',
    ContentIsLiked = 'contentIsLiked',
    ContentIsDisliked = 'contentIsDisliked',
    CheckSession = 'checkSession',
}

export default Events;
