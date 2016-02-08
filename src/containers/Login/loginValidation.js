/**
 * Created by hanwencheng on 2/8/16.
 */

import memoize from 'lru-memoize';
import {createValidator, required, minLength, email, numberAndLetter} from 'utils/validation';

const loginValidation = createValidator({
  email: [required, email],
  password : [required, numberAndLetter, minLength(6)],
});
export default memoize(10)(loginValidation);