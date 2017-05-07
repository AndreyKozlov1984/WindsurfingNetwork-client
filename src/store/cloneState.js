// @flow
export default function cloneState<T: $Subtype<Object>> (originalObject: T, changes: $Shape<T>): T {
  return Object.assign({}, originalObject, changes);
}

