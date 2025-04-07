import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Share, Alert, Platform, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';

const SCREEN_WIDTH = Dimensions.get('window').width;
const POST_SIZE = SCREEN_WIDTH - 40; 

const Perfil = () => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const handleLogout = () => {
    hideMenu();
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel"
        },
        { 
          text: "Sair",
          onPress: () => {
          if (Platform.OS === 'android') {
            BackHandler.exitApp();
          } else {
            // No iOS, não podemos forçar o fechamento do app
            Alert.alert("Informação", "Por favor, feche o aplicativo manualmente.");
            // Opcionalmente, você pode navegar para a tela inicial do app aqui
          }
         }
        }
      ]
    );
  };

  const handleAbout = () => {
    hideMenu();
    Alert.alert("Sobre", "Informações sobre o aplicativo...");
  };
  
  //Compartilhamento
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Confira esta publicação incrível no Bordado Social!',
        // Adicionar um URL aqui se tiver um link para a publicação
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Compartilhado com sucesso');
        } else {
          console.log('Compartilhado');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartilhamento cancelado');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity onPress={showMenu}>
              <Ionicons name="menu-outline" size={24} color="black" />
            </TouchableOpacity>
          }
          onRequestClose={hideMenu}
        >
          <MenuItem style={styles.bnt} onPress={handleAbout}>Sobre</MenuItem>
          <MenuItem style={styles.bnt} onPress={handleLogout}>Sair</MenuItem>
        </Menu>
      </View>

      <View style={styles.profileInfo}>
        <Image
          source={require('../../../assets/profile.png')}
          style={styles.profilePicture}
        />
        <Text style={styles.name}>Claudia</Text>
        <Text style={styles.location}>São Paulo, SP</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>44</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
      </View>

      <View style={styles.gridPhoto}>
        <View style={styles.postContainer}>
          <Image
            source={require('../../../assets/teste1.jpg')}
            style={styles.post}
          />
          <View style={styles.postActions}>
            <View style={[styles.actionGroup, styles.topLeft]}>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.actionText}>45</Text>
            </View>
            <View style={[styles.actionGroup, styles.topRight]}>
              <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.actionText}>12</Text>
            </View>
            <TouchableOpacity style={styles.bottomRight} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginTop: 5
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10
  },
  statItem: {
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  statLabel: {
    fontSize: 14,
    color: '#666'
  },
  gridPhoto: {
    paddingVertical: 20,
  },
  postContainer: {
    width: POST_SIZE,
    height: POST_SIZE,
    marginBottom: 20,
    alignSelf: 'center',
    borderWidth: 1,  
    borderColor: '#ccc',  
    borderRadius: 8,  
    overflow: 'hidden',
    position: 'relative',
  },
  post: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  postActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
  topLeft: {
    top: 10,
    left: 10,
  },
  topRight: {
    top: 10,
    right: 10,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
  actionText: {
    marginLeft: 5,
    color: 'white',
  },
  bnt:{
    backgroundColor: '#F5F5F5',
    borderWidth: 0.25,
    borderColor: "#ccc"
    }
});

export default Perfil;