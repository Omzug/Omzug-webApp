/**
 * Created by hanwencheng on 1/17/16.
 */

import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email, numberAndLetter, match} from 'utils/validation';

const surveyValidation = createValidator({
  name: [required, maxLength(10)],
  email: [required, email],
  password : [required, numberAndLetter],
  passwordRepeat: [required] // single rules don't have to be in an array
});
export default memoize(10)(surveyValidation);
