/**
 * Created by hanwencheng on 1/17/16.
 */

import memoize from 'lru-memoize';
import {createValidator, required, minLength, email, numberAndLetter} from 'utils/validation';

const registerValidation = createValidator({
  username: [required, minLength(5), numberAndLetter],
  email: [required, email],
  password : [required, numberAndLetter, minLength(6)],
  passwordRepeat: required // single rules don't have to be in an array
});
export default memoize(10)(registerValidation);
