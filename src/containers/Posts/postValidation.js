/**
 * Created by hanwencheng on 3/5/16.
 */

import memoize from 'lru-memoize';
import {createValidator, required, email, numberAndLetter,integer, isImage, phoneNumber, between} from 'utils/validation';

const postValidation = createValidator({
  city: [required],//which should be a string
  description: [required],

  email : [email],
  phone : [phoneNumber],
  wechat : [],
  major : [],
  startDate : [required],
  endDate : [],
});
export default memoize(10)(postValidation);