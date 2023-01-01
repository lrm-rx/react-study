import styled from 'styled-components'

export const FriendWrapper = styled.div`
  .content {
    border-color: #fff;
    min-height: 700px;

    .pic {
      position: relative;
      width: 808px;
      height: 484px;
      margin: 0 auto;
      background: url(${require("@/assets/img/friend_sprite.jpg")}) 0 104px no-repeat;

      .login {
        position: absolute;
        width: 168px;
        height: 46px;
        left: 482px;
        top: 368px;
        text-indent: -99999px;
      }
    }
  }
`