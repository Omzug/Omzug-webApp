/**
 * Created by hanwencheng on 1/19/16.
 */

import memoize from 'lru-memoize';
import {createValidator, required, minLength, email, numberAndLetter,integer, isImage, numeric} from 'utils/validation';

const submitValidation = createValidator({
  id:[required],
  city: [required],//which should be a string
  type: [required, between(0,1), integer],
  price: [required, integer],
  startDate : [required],
  title : [required],

  description: [],
  location: [],
  roomNumber: [integer],
  size : [integer],
  caution: [integer],
  endDate : [],
  email : [email],
  phone : [minLength(11), maxLength(12),numeric],
  note : [],
  maximumPerson : [integer],
  images : [],
});
export default memoize(10)(submitValidation);