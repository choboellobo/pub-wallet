module.exports = {


  friendlyName: 'Has attrs',


  description: '',


  inputs: {
    'body': {
      type: {},
      required: true
    },
    'attrs': {
      type: ['string'],
      required: true
    }
  },





  fn: async function (inputs, exits) {
    let result = true;
    let missing = []
    const body = inputs.body;
    const attrs = inputs.attrs
    attrs.forEach(element => {
      if(!body.hasOwnProperty(element)) {
        result = false
        missing.push(element)
      }
    });
    return exits.success({result, missing});
  }


};

