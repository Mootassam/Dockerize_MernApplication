import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/palier/view/palierViewActions';
import selectors from 'src/modules/palier/view/palierViewSelectors';
import PalierView from 'src/view/palier/view/PalierView';
import PalierViewToolbar from 'src/view/palier/view/PalierViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function PalierPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.palier.menu'), '/palier'],
          [i18n('entities.palier.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.palier.view.title')}
        </PageTitle>

        <PalierViewToolbar match={match} />

        <PalierView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
}

export default PalierPage;
