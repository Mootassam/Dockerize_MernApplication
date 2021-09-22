import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link
} from "react-router-dom";
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import actions from 'src/modules/layout/layoutActions';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import MenuWrapper from 'src/view/layout/styles/MenuWrapper';
import menus from 'src/view/menus';
import selectors from 'src/modules/auth/authSelectors';

import { Navbar, Nav, NavDropdown, Dropdown  } from 'react-bootstrap';

import AuthService from 'src/modules/auth/authService';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';

function Menu(props) {

  const dispatch = useDispatch();
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const menuVisible = useSelector(
    layoutSelectors.selectMenuVisible,
  );

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );
  const [activeSubmenu, setActiveSubmenu] = useState(false);

  useLayoutEffect(() => {
    const toggleMenuOnResize = () => {
      window.innerWidth < 576
        ? dispatch(actions.doHideMenu())
        : dispatch(actions.doShowMenu());
    };

    toggleMenuOnResize();

    window.addEventListener('resize', toggleMenuOnResize);
    return () => {
      window.removeEventListener(
        'resize',
        toggleMenuOnResize,
      );
    };
  }, [dispatch]);

  var BreakException = {};
  useEffect(() => {
    AuthService.fetchMe().then(res => {
      try {
        Object.values(res).forEach(val => {
          if (val == null) {
            throw BreakException;
          }
        });
      } catch (e) {
        if (e === BreakException) {
          Message.error(i18n('auth.profile.fullForm'));
          getHistory().push('/profile');
        }
      }
    });
  }, []);

  const selectedKeys = () => {
    const url = props.url;
    return url;
  };

  const match = (permission) => {
    return permissionChecker.match(permission);
  };

  return (
    <MenuWrapper style={{ display: menuVisible ? 'block' : 'none', }}  >
      <div className="menu-nav border-right">
        <div className="menu-logo">
          <Link to="/" >
            {logoUrl ? (
              <img
                src={logoUrl}
                width="164px"
                alt={i18n('Ligue Digital')}
                style={{ verticalAlign: 'middle' }}
              />
            ) : (
              <>{i18n('Ligue Digital')}</>
            )}
          </Link>
        </div>
        <div>
          <div className="row">
            <div className="col-md-12">
              {menus
                .filter((menu) =>
                  match(menu.permissionRequired),
                )
                .map((menu) => (
                  <Nav 
                    className={`menu-li text-nowrap ${selectedKeys()===(menu.path) ? 'active' : ''}`}
                  >
                    {
                      (menu.haveSubMenu) ? (
                        <>
                          <NavDropdown 
                            title={menu.label} 
                            // className = {`${menu.subPaths.includes(selectedKeys()) ? 'nav-item show dropdown' : 'basic-nav-dropdown'}`}
                            id="basic-nav-dropdown" 
                            // style={{ display: menu.subPaths.includes(selectedKeys()) ? 'block' : 'block', }}
                            // className={`${menu.subPaths.includes(selectedKeys()) ? 'showMenu' : ''}`}
                            // show={menu.subPaths.includes(selectedKeys())}
                          >
                            {menu.subMenu.map(singleItem => {
                              return (
                                <>
                                  <NavDropdown.Item>
                                    <Nav className={`menu-li text-nowrap ${selectedKeys() === singleItem.path ? 'active' : ''}`}>
                                      <Link className='nav-link' to={singleItem.path}>{singleItem.label}</Link>
                                    </Nav>
                                  </NavDropdown.Item>
                                </>
                              )
                            })}
                          </NavDropdown>                        
                        </>
                      ) : (
                        <>
                          <Nav>
                            <Link className='nav-link' to={menu.path}>{menu.label}</Link>
                          </Nav>
                        </>
                      )
                    }
                  </Nav>
                ))}
              <br />
            </div>
          </div>
        </div>
      </div>
    </MenuWrapper>
  );
}

export default Menu;
