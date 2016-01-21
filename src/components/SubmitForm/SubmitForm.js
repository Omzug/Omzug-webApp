/**
 * Created by hanwencheng on 1/13/16.
 */

import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import submitValidation from './submitValidation';

const submitValidate = (data/*, dispatch */) => {
  return new Promise((resolve, reject) => {

    // simulate server latency
  });
}

const asyncValidate = (values /*, dispatch */) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (['john', 'paul', 'george', 'ringo'].includes(values.rooms)) {
        reject({rooms: 'That rooms is taken'});
      } else {
        resolve();
      }
    }, 1000); // simulate server latency
  });
};

@reduxForm({
  form: 'register',
  fields : ['price', 'size', 'rooms', 'owner', 'startDate', 'endDate', 'type', 'city', 'street', 'note'],
  validate : submitValidation,
  asyncValidate,
  //asyncBlurFields: ['rooms'],
})

export default class SubmitForm extends Component{
  static propTypes = {
    asyncValidating: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }


  render() {
    const {
      fields: {
        price, rooms, size, owner, startDate, endDate, type, city, street, note
        },
      resetForm,
      handleSubmit,
      submitting,
      asyncValidating
      } = this.props;

    var canSubmit = true;

    return (
      <form onSubmit={handleSubmit(submitValidate)}>

        <div>
          <label>price</label>
          <div>
            <input type="text" placeholder="Email" {...price}/>
          </div>
          {price.touched && price.error && <div>{price.error}</div>}
        </div>

        <div>
          <label>Rooms</label>
          <div>
            <input type="text" placeholder="Username" {...rooms}/>
            {asyncValidating === 'rooms' && <i /* spinning cog *//>}
          </div>
          {rooms.touched && rooms.error && <div>{rooms.error}</div>}
        </div>

        <div>
          <label>size</label>
          <div>
            <input type="text" placeholder="size" {...size}/>
          </div>
          {size.touched && size.error && <div>{size.error}</div>}
        </div>

        <div>
          <label>city</label>
          <div>
            <input type="text" placeholder="Repeat size" {...city}/>
          </div>
          { city.touched && <div>{city.error}</div>}
        </div>

        <div>
          <label>street</label>
          <div>
            <input type="text" placeholder="Repeat size" {...street}/>
          </div>
          { street.touched && <div>{street.error}</div>}
        </div>

        <div>
          <label>startDate</label>
          <div>
            <input type="text" placeholder="Repeat size" {...startDate}/>
          </div>
          { startDate.touched && <div>{startDate.error}</div>}
        </div>

        <div>
          <label>endDate</label>
          <div>
            <input type="text" placeholder="Repeat size" {...endDate}/>
          </div>
          { endDate.touched && <div>{endDate.error}</div>}
        </div>

        <div>
          <label>Note</label>
          <div>
            <input type="text" placeholder="Repeat size" {...note}/>
          </div>
          { note.touched && <div>{note.error}</div>}
        </div>

        <div>
          <label>type</label>
          <div>
            <input type="text" placeholder="Repeat size" {...type}/>
          </div>
          { type.touched && <div>{type.error}</div>}
        </div>

        <div>
          <button disabled={canSubmit && submitting} onClick={handleSubmit(submitValidate)}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button disabled={canSubmit && submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}