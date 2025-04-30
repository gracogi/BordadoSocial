import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Share} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import { openDatabase } from '../../../database/setup';

export default function Feed() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('text');
  const [setImage] = useState(null);

  const route = useRoute();
  const { usuario } = route.params;
  const [publicacao, setPublicacao] = useState(null);
 

  useEffect(() => {

    const carregarPublicacao = async () => {
      try {
        const db = await openDatabase();
        const publicacao = await db.getFirstAsync(
          'SELECT * FROM publicacoes WHERE usuario_id = ?',
          [usuario.id]
        );
        setPublicacao(publicacao);
        console.log('Publicação carregada:', publicacao);
      } catch (error) {
        console.error('Erro ao carregar publicação:', error);
        Alert.alert('Erro', 'Não foi possível carregar a publicação.');
      }
    };
    
    
    (async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      
      if (cameraPermission.status !== 'granted') {
        Alert.alert(
          "Permissões necessárias",
          "Precisamos de permissões para acessar sua câmera.",
          [{ text: "OK" }]
        );
      }
    })();
    carregarPublicacao();
    
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Navega para a tela de publicação com a imagem
      navigation.navigate('Add', { image: result.assets[0].uri });
    }
};

  const handleTabPress = (tab) => {
    if (tab === 'photo') {
      takePhoto();
    } else {
      setActiveTab(tab);
    }
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BORDADO SOCIAL</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Image 
            source={require('../../../assets/profile.png')}
            style={styles.profilePic}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.activeTab}>
          <Ionicons name="home" size={24} color="#1DA1F2" />
          <Text style={styles.activeTabText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Add')}>
          <Ionicons name="create-outline" size={24} color="gray" />
          <Text style={styles.tabText}>Publicar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'photo' && styles.activeTab]}
          onPress={() => handleTabPress('photo')}
        >
          <Ionicons name="camera-outline" size={24} color="gray" />
          <Text style={[styles.tabText, activeTab === 'photo' && styles.activeTabText]}>
            Foto
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Image 
            source={require('../../../assets/teste1.jpg')} 
            style={styles.postProfilePic}
          />
          <View>
            <Text style={styles.postUsername}>Maria Silva</Text>
            <Text style={styles.postHandle}>@mariasilva</Text>
          </View>
          <TouchableOpacity style={styles.moreOptions}>
            <Ionicons name="ellipsis-horizontal" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.postTitle}>Minha primeira publicação</Text>
        <Text style={styles.postContent}>
          Acabei de descobrir este aplicativo incrível! Estou muito animada para
          compartilhar mais conteúdo com vocês.
        </Text>
        <Image 
          source={require('../../../assets/teste2.jpg')} 
          style={styles.postImage}
        />
        <View style={styles.postActions}>
          <View style={styles.actionGroup}>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.actionText}>45</Text>
          </View>
          <View style={styles.actionGroup}>
            <TouchableOpacity>
              <Ionicons name="chatbubble-outline" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.actionText}>12</Text>
          </View>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="share-social-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Image 
            source={require('../../../assets/teste1.jpg')} 
            style={styles.postProfilePic}
          />
          <View>
            <Text style={styles.postUsername}>Maria Silva</Text>
            <Text style={styles.postHandle}>@mariasilva</Text>
          </View>
          <TouchableOpacity style={styles.moreOptions}>
            <Ionicons name="ellipsis-horizontal" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.postTitle}>Minha primeira publicação</Text>
        
        {publicacao ? (
          <Text>{publicacao.descricao}</Text>
        ) : (
          <Text>Carregando publicação...</Text>
        )}

        <Image 
          source={require('../../../assets/teste2.jpg')} 
          style={styles.postImage}
        />
        <View style={styles.postActions}>
          <View style={styles.actionGroup}>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.actionText}>45</Text>
          </View>
          <View style={styles.actionGroup}>
            <TouchableOpacity>
              <Ionicons name="chatbubble-outline" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.actionText}>12</Text>
          </View>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="share-social-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>

  );
}