// Place the URL here with the /api suffix.
// Ex.:`https://domain.com/api`;
const backendUrl = `http://localhost:8080/api`;
// const backendUrl = `http://176.58.124.65:8080/api`;

// SwaggerUI Documentation URL
// Leave black if documentation should be hidden
const apiDocumentationUrl = `/documentation`;

/**
 * Frontend URL.
 */
const frontendUrl = {
  host: 'domain.com',
  protocol: 'https',
};

/**
 * Tenant Mode
 * multi: Allow new users to create new tenants.
 * multi-with-subdomain: Same as multi, but enable access to the tenant via subdomain.
 * single: One tenant, the first user to register will be the admin.
 */
const tenantMode = 'single';

/**
 * Plan payments configuration.
 */
const isPlanEnabled = false;
const stripePublishableKey = '';

export default {
  frontendUrl,
  backendUrl,
  apiDocumentationUrl,
  tenantMode,
  isPlanEnabled,
  stripePublishableKey,
};
