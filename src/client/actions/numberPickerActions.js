export function updateNumber(number) {
  return {
    type: 'UPDATE_NUMBER',
    number
  };
}

export function submitSuccess() {
  return {
    type: 'SUBMIT_SUCCESS'
  };
}

export function submitFailure(errorMessage) {
  return {
    type: 'SUBMIT_FAILURE',
    errorMessage
  };
}
