import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

ac.grant('user').readOwn('profile');

ac.grant('admin').readAny('profile');

export { ac };
