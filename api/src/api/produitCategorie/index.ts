export default (app) => {
  app.post(
    `/tenant/:tenantId/produit-categorie`,
    require('./produitCategorieCreate').default,
  );
  app.put(
    `/tenant/:tenantId/produit-categorie/:id`,
    require('./produitCategorieUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/produit-categorie/import`,
    require('./produitCategorieImport').default,
  );
  app.delete(
    `/tenant/:tenantId/produit-categorie`,
    require('./produitCategorieDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/produit-categorie/autocomplete`,
    require('./produitCategorieAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/produit-categorie`,
    require('./produitCategorieList').default,
  );
  app.get(
    `/tenant/:tenantId/produit-categorie/:id`,
    require('./produitCategorieFind').default,
  );
};