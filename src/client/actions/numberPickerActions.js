export function updateNumber(newNumber) {
  return {
    type: 'UPDATE_NUMBER',
    newNumber
  };
}

export function setError(errorMessage) {
  return {
    type: 'SET_ERROR',
    errorMessage
  };
}

export function unsetError() {
  return {
    type: 'UNSET_ERROR'
  };
}
