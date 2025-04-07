import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#007BFF',
  },
  tabText: {
    color: '#6C757D',
  },
  activeTabText: {
    color: 'white',
  },
  form: {
    padding: 15
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  leg: {
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  title:{
    height: 30,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  imageUpload: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  imageUploadText: {
    color: '#6C757D',
    marginTop: 10
  },
  imageUploadSubtext: {
    color: '#ADB5BD',
    fontSize: 12,
    marginTop: 5
  },
  publishButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center'
  },
  publishButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 5
  },
});

export default styles;