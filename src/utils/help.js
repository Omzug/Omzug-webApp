/**
 * Created by hanwencheng on 3/2/16.
 */

export function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function findCityValue(cityArray, label){
  var ret = null
  cityArray.some(el => {
    if(el.label === label){
      ret = el.value
      return true
    }else{
      return false
    }
  })

  console.log("return value is" , ret)

  return ret
}