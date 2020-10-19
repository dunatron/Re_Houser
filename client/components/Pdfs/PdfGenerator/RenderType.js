import {
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import styles from '../styles';

const RenderType = ({ item }) => {
  const {
    type,
    value,
    fieldProps,
    layoutProps,
    inners,
    listStyle,
    listNum,
    title,
  } = item;

  switch (type) {
    case 'Section':
      // return <HandleInners inners={inners} />;
      return (
        <View style={styles.section} wrap={layoutProps.wrap}>
          <View style={styles[layoutProps.variant]}>
            <HandleInners inners={inners} />
          </View>
        </View>
      );
    case 'List':
      return (
        <View style={{ ...styles.ul }}>
          <HandleInners inners={inners} />
        </View>
      );
    case 'Li':
      return (
        <View
          style={{
            ...styles.li_wrapper,
          }}>
          <Text style={{ ...styles[`li_${listStyle}`] }}>{listNum}</Text>
          {title && <Text style={{ ...styles.li_title }}>{title}</Text>}
          <Text
            style={{
              ...styles.li,
              ...styles[fieldProps.variant],
              ...styles[layoutProps.variant],
            }}>
            {value}
          </Text>
        </View>
      );
    case 'Text':
      return (
        <Text
          style={{
            ...styles[fieldProps.variant],
            ...styles[layoutProps.variant],
          }}>
          {value}
        </Text>
      );
    default:
      return (
        <Text style={{ ...styles.h1, ...styles.center }}>
          IMPORTANT: No Type was specified or is not a valid type: {type}
        </Text>
      );
  }
};

const HandleInners = ({ inners }) => {
  if (!inners) return null;
  if (inners.length === 0) return null;
  return inners.map((inner, idx) => {
    return <RenderType key={idx} item={inner} />;
  });
};

export default RenderType;
