import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

export const classNames = mergeStyleSets({
    image: {
      display: 'inline-block',
      position: 'relative'
    },
    one: {
      width: 48,
      height: 44,
      marginLeft: 27,
      marginTop: 10
    },
    oneImage: {
      left: -6,
      top: -4
    },
    check: {
      width: 35,
      height: 43,
      marginLeft: 55
    },
    checkImage: {
      left: -60,
      top: -5
    },
    lock: {
      width: 35,
      height: 42,
      marginLeft: 65
    },
    lockImage: {
      width: -109,
      top: -5
    }
  });