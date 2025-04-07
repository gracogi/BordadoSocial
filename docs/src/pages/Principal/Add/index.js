import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function NewPost() {
  const [activeTab, setActiveTab] = useState('text');
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      
      if (libraryPermission.status !== 'granted' || cameraPermission.status !== 'granted') {
        Alert.alert(
          "Permissões necessárias",
          "Precisamos de permissões para acessar sua galeria de fotos e câmera.",
          [{ text: "OK" }]
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params.image);
    }
  }, [route.params?.image]);

  const handleTabPress = (tab) => {
    if (tab === 'photo') {
      takePhoto();
    } else {
      setActiveTab(tab);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
      setImage(result.assets[0].uri);
      setActiveTab('text');
    }
  };

  const handlePublish = () => {
    console.log('Publicando:', { image, title, content });
    navigation.navigate('Feed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Publicação</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'text' && styles.activeTab]}
          onPress={() => handleTabPress('text')}
        >
          <Text style={[styles.tabText, activeTab === 'text' && styles.activeTabText]}>
            Texto e Imagem
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'photo' && styles.activeTab]}
          onPress={() => handleTabPress('photo')}
        >
          <Text style={[styles.tabText, activeTab === 'photo' && styles.activeTabText]}>
            Câmera
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>
        <TextInput 
          style={styles.title}
          placeholder="Adicione um título"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Conteúdo</Text>
        <TextInput 
          style={styles.leg}
          placeholder="O que você deseja compartilhar?"
          placeholderTextColor="#999"
          multiline
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.selectedImage} />
          ) : (
            <>
              <Ionicons name="image-outline" size={24} color="#999" />
              <Text style={styles.imageUploadText}>Adicionar Imagem</Text>
              <Text style={styles.imageUploadSubtext}>Arraste ou clique para selecionar</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}