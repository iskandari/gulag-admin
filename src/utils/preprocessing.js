import { assoc, compose, map, prop, reduce, values } from 'ramda';
import { renameKeys, pickByRegExp } from './utils';

export const getMaxPrisoners = (prison) => {
  const features = prison.features || [];

  const getMaxPrisoners = compose(
    reduce(Math.max, 0),
    values,
    map(prop('peoples')),
    pickByRegExp(/^\d{4}$/),
    prop('properties')
  );

  const maxPrisoners = reduce((acc, feature) => {
    return Math.max(acc, getMaxPrisoners(feature));
  }, 0, features);

  return assoc('max_prisoners', maxPrisoners, prison);
}

export const fillMaxPrisoners = (prisons) => {
  return map(getMaxPrisoners, prisons);
}

export const directoryToOptions = map(renameKeys({ id: 'value', name: 'label' }));
