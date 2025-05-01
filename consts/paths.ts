export const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1`;

// auth
export const signinUrl = `${apiBaseUrl}/auth/signin`;

// notifications
export const notiUrl = `${apiBaseUrl}/notifications`;

// transactions
export const transactionsUrl = `${apiBaseUrl}/transactions`;
export const transactionDetailUrl = `${apiBaseUrl}/transactions`;

// integrations
export const webhooksUrl = `${apiBaseUrl}/webhooks`;

// finance
export const payoutsUrl = `${apiBaseUrl}/payouts`;
export const payoutDetailUrl = `${apiBaseUrl}/payouts`;
export const payoutAccountsUrl = `${apiBaseUrl}/payouts/accounts`;

// settings
export const tfaStatusUrl = `${apiBaseUrl}/settings/tfa/status`;
