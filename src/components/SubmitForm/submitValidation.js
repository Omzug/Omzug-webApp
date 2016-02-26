/**
 * Created by hanwencheng on 1/19/16.
 */

import memoize from 'lru-memoize';
import {createValidator, required, email, numberAndLetter,integer, isImage, phoneNumber, between} from 'utils/validation';

const submitValidation = createValidator({
  city: [required],//which should be a string
  type: [required, between(0,1), integer],
  price: [required, integer],
  startDate : [required],
  title : [required],
  priceType : [required],

  description: [],
  location: [],
  size : [integer],
  caution: [integer],
  endDate : [],
  email : [email],
  phone : [phoneNumber],
  note : [],
  images : [],
});
export default memoize(10)(submitValidation);