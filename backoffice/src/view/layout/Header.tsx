import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import { getHistory } from 'src/modules/store';
import I18nSelect from 'src/view/layout/I18nSelect';
import HeaderWrapper from 'src/view/layout/styles/HeaderWrapper';
import Avatar from 'src/view/shared/Avatar';
import config from 'src/config';

import selectorsAudit from 'src/modules/auditLog/auditLogSelectors';
import selectorsSettings from 'src/modules/settings/settingsSelectors';

function Header(props) {
  const dispatch = useDispatch();

  const doToggleMenu = () => {
    dispatch(layoutActions.doToggleMenu());
  };

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const hasPermissionToReadAudit = useSelector(
    selectorsAudit.selectPermissionToRead,
  );

  const hasPermissionToReadSettings = useSelector(
    selectorsSettings.selectPermissionToEdit,
  );

  console.log('hasPermissionToReadAudit', hasPermissionToReadAudit)
  console.log('hasPermissionToReadSettings', hasPermissionToReadSettings)
  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToProfile = () => {
    getHistory().push('/profile');
  };

  const doNavigateToSettings = () => {
    getHistory().push('/settings');
  };

  const doNavigateToAuditlog = () => {
    getHistory().push('/audit-logs');
  };

  const doNavigateToPasswordChange = () => {
    getHistory().push('/password-change');
  };

  const doNavigateToTenants = () => {
    getHistory().push('/tenant');
  };

  return (
    <HeaderWrapper className="navbar sticky-top navbar-light bg-white border-bottom">
      <button
        type="button"
        onClick={doToggleMenu}
        className="menu-toggle-button"
      >
        <i className="fas fa-bars" />
      </button>

      <div>
        {/* <span className="i18n-select" style={{ float: 'left', marginTop:'15px' }}>
          <I18nSelect />
        </span> */}

        <div className="dropdown">
          <span
            className="user-dropdown"
            data-toggle="dropdown"
          >
            <div className="user-dropdown-content">
              <span className="user-dropdown-avatar">
                <Avatar
                  size="small"
                  src={userAvatar || undefined}
                  alt="avatar"
                />
              </span>
              <span className="user-dropdown-text">
                <span>{userText}</span>{' '}
                {['multi', 'multi-with-subdomain'].includes(
                  config.tenantMode,
                ) && (
                    <span className="user-dropdown-text-tenant">
                      {currentTenant && currentTenant.name}
                    </span>
                  )}
              </span>
            </div>
          </span>
          <div className="dropdown-menu" style={{ float: 'none' }}>
            <button
              onClick={doNavigateToProfile}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-user" />{' '}
              {i18n('auth.profile.title')}
            </button>
            <button
              onClick={doNavigateToPasswordChange}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-lock" />{' '}
              {i18n('auth.passwordChange.title')}
            </button>
            {hasPermissionToReadSettings ?
              <button
                onClick={doNavigateToSettings}
                className="dropdown-item"
                type="button"
              >
                <i className="fas fa-cog" />{' '}
                {i18n('settings.title')}
              </button>
              :
              null
            }
            {hasPermissionToReadAudit ?
              <button
                onClick={doNavigateToAuditlog}
                className="dropdown-item"
                type="button"
              >
                <i className="fas fa-history" />{' '}
                {i18n('auditLog.title')}
              </button>
              :
              null}
            {['multi', 'multi-with-subdomain'].includes(
              config.tenantMode,
            ) && (
                <button
                  onClick={doNavigateToTenants}
                  className="dropdown-item"
                  type="button"
                >
                  <i className="fas fa-th-large" />{' '}
                  {i18n('auth.tenants')}
                </button>
              )}
            {/* {config.apiDocumentationUrl && (
              <a
                href={config.apiDocumentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button
                  className="dropdown-item"
                  type="button"
                >
                  <i className="fas fa-code" />{' '}
                  {i18n('api.menu')}
                </button>
              </a>
            )} */}
            <button
              onClick={doSignout}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-sign-out-alt" />{' '}
              {i18n('auth.signout')}
            </button>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
