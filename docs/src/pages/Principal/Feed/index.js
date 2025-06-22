import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Share, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function Feed() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('text');
  const route = useRoute();
  const { usuario } = route.params;
  const [publicacoes, setPublicacoes] = useState([]);

  useEffect(() => {
    const carregarPublicacoes = async () => {
      try {
        const response = await fetch('http://localhost:3000/publicacoes'); // 👉 Troque pelo seu endpoint real
        if (!response.ok) throw new Error('Erro ao buscar publicações');
        const data = await response.json();
        setPublicacoes(data);
        console.log('Publicações carregadas:', data);
      } catch (error) {
        console.error('Erro ao carregar publicações:', error);
        Alert.alert('Erro', 'Não foi possível carregar as publicações.');
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

    carregarPublicacoes();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
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

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Confira esta publicação incrível no Bordado Social!',
      });
      if (result.action === Share.sharedAction) {
        console.log('Compartilhado');
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartilhamento cancelado');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image 
          source={require('../../../assets/teste1.jpg')} 
          style={styles.postProfilePic}
        />
        <View>
          <Text style={styles.postUsername}>{item.nomeExibicao}</Text>
          <Text style={styles.postHandle}>@{item.arroba}</Text>
        </View>
        <TouchableOpacity style={styles.moreOptions}>
          <Ionicons name="ellipsis-horizontal" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <Text style={styles.postTitle}>Minha publicação</Text>
      <Text>{item.descricao}</Text>

      <Image 
        source={require('../../../assets/teste2.jpg')} 
        style={styles.postImage}
      />

      <View style={styles.postActions}>
        <View style={styles.actionGroup}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.actionText}>{item.curtidas}</Text>
        </View>

        <View style={styles.actionGroup}>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.actionText}>{item.comentarios}</Text>
        </View>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-social-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BORDADO SOCIAL</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil', { usuario })}>
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

      <FlatList
        data={publicacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Carregando publicações...</Text>}
      />
    </SafeAreaView>
  );
}
