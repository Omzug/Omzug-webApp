/**
 * Created by hanwencheng on 1/19/16.
 */

import memoize from 'lru-memoize';
import {createValidator, required, minLength, email, numberAndLetter,integer} from 'utils/validation';

const submitValidation = createValidator({
  location: [],
  city: [required],//which should be a string
  type: [required, between(0,1), integer],
  roomNumber: [integer, required],
  size : [required, integer],
  price: [required, integer],
  caution: [integer],
  startDate : [required],
  endDate : [],
  description: [],
  title : [],
  owner : [],
  email : [email],
  phone : [minLength(11), maxLength(12)],
  note : [],
  maximumPerson : [integer],
});
export default memoize(10)(submitValidation);