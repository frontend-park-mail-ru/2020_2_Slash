enum Events {
    PathChanged = 'pathChanged',
    ProfileTabChanged = 'profileTabChanged',
    ContentInfoRequested = 'contentInfoRequested',
    RevealPopup = 'revealPopup',
    ContentInfoTabChanged = 'contentInfoTabChanged',
    InfoBlockClosed = 'infoBlockClosed',
    SubmitForm = 'submitForm',
    SubmitProfileForm = 'submitProfileForm',
    SignupUser = 'signupUser',
    LoginUser = 'loginUser',
    LogoutUser = 'logoutUser',
    UpdateProfile = 'updateProfile',
    UploadAvatar = 'uploadAvatar',
    RedirectBack = 'redirectBack',

    VideoPlay = 'videoPlay',
    VideoPause = 'videoPause',
    Mute = 'mute',
    VolumeOn = 'volumeOn',
    FullscreenModeOn = 'fullscreenModeOn',
    FullscreenModeOff = 'fullscreenModeOff',
}

export default Events;
