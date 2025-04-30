import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ededed',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 350, 
    height: 350, 
  },
  loaderContainer: {
    position: 'absolute',
    bottom: '10%'
  }
});

export default styles;