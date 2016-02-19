const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];
const config = require('../config.js')

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function between(min, max){
  return value => {
    if(!isEmpty(value) && (value < min || value > max)){
      return `Should between ${min} and ${max}`;
    }
  }
}

export function numberAndLetter(value){
  if(!isEmpty(value) && !/^[a-zA-Z0-9]+$/.test(value)){
    return `Must only contain number and letters`
  }
}

export function phoneNumber(value){
  if(!isEmpty(value) && !/^\+?[0-9]{11,15}$/.test(value)) {
    return `Should be Numeric, only numbers here`
  }
}

export function numeric(value){
  if(!isEmpty(value) && !/^[0-9]+$/.test(value)) {
    return `Should be Numeric, only numbers here`
  }
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function validateImage(value){
  var error = [];
  value.forEach(function(file){
    if (!file.name.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)){
      error.push(file.name + "上传的不是图像文件");
    }
    if(file.size > config.limitImageSize * 1024 * 1024){
      error.push(file.name + "太大了,我们最大只接受" + config.limitImageSize + "M的文件")
    }
  });
  return error.length ? error.join(', ') : null
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
