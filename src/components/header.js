import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext, Fragment } from "react"
import { FirebaseContext } from './Firebase'
import styled from "styled-components"

const Header = ({ siteTitle }) => {

  const { firebase, user } = useContext(FirebaseContext);
  console.log(user, "user")

  const handleLogout = () => {
    firebase.logout()
    .then(() => navigate("/login"))
  }

  return(
  <HeaderWrapper>
    <HeaderCtn>
      <Title>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </Title>
      <LoginWrapper>
        {!!user && !!user.email && (
          <LoginCtn>
              Hello, {user.username || user.email}
              <div>
                {!!user.isAdmin && 
                <Fragment>
                  <Link to="/add-author">
                      Add author
                  </Link>
                  <Divider />
                  <Link to="/add-book">
                    Add book
                </Link>
                <Divider />
                </Fragment>}
                <LogoutLink onClick={handleLogout}> Logout </LogoutLink>
              </div>
          </LoginCtn>
        )}
        {(!user || !user.email) &&
        <div>
            <Link to="/login">
              Login
            </Link>
            <Divider />
            <Link to="/register">
              Register
            </Link>
          </div> }
      </LoginWrapper>
    </HeaderCtn>
  </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const LogoutLink = styled.span`

  color: white;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;

  }

`

const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background-color: #ddd;
`

const HeaderCtn = styled.div`
        margin:  0 auto;
        max-width: 960px;
        padding: 1.45rem 1.0875rem;
        display: flex;
`

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const Title = styled.h1`
  margin: 0;
  flex-grow: 1;
`

const LoginWrapper = styled.div`
  margin: auto 0;

  a {
    color: #fff;
  }
`

const LoginCtn = styled.div`
  text-align: right;
`

export default Header
