/**
 * Created by hanwencheng on 1/19/16.
 */

import memoize from 'lru-memoize';
import {createValidator, required, minLength, email, numberAndLetter} from 'utils/validation';

const registerValidation = createValidator({

});
export default memoize(10)(registerValidation);