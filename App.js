// Importa os módulos necessários do React e React Native
import React, { useState } from "react"; 
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
// Importa funções específicas para abrir a câmera e a galeria de imagens
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// Define o componente principal do aplicativo
export default function App() {
  // Cria um estado chamado 'photo' para armazenar a URI da imagem selecionada ou capturada
  const [photo, setPhoto] = useState(null);

  // Função para abrir o álbum de fotos
  function opemAlbum() {
    // Define as opções para a seleção de imagens
    const options = {
      mediaType: "photo", // Tipo de mídia: foto
      quality: 1,         // Qualidade da imagem
      selectionLimit: 1,  // Limite de seleção: 1 imagem
    };

    // Lança a biblioteca de imagens com as opções especificadas
    launchImageLibrary(options, (response) => {
      // Verifica se o usuário cancelou a operação
      if (response.didCancel) {
        // Pode adicionar um tratamento para o cancelamento aqui
      } else if (response.error) {
        // Pode adicionar um tratamento para o erro aqui
      }

      // Atualiza o estado 'photo' com a URI da imagem selecionada
      setPhoto(response.assets[0].uri);
    });
  }

  // Função assíncrona para abrir a câmera
  async function openCamera() {
    // Define as opções para a captura de imagens
    const options = {
      mediaType: "photo", // Tipo de mídia: foto
      quality: 1,         // Qualidade da imagem
      saveToPhotos: true, // Salvar a foto na galeria do dispositivo
    };

    // Lança a câmera com as opções especificadas e aguarda a resposta
    const response = await launchCamera(options);

    // Atualiza o estado 'photo' com a URI da imagem capturada
    setPhoto(response.assets[0].uri);
  }

  // Retorna a interface do usuário do aplicativo
  return (
    // SafeAreaView garante que o conteúdo não se sobreponha a áreas do sistema, como o notch
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
        {/* Botão para abrir o álbum de fotos */}
        <TouchableOpacity style={styles.button} onPress={opemAlbum}>
          <Text style={styles.text}>Abrir Album</Text>
        </TouchableOpacity>

        {/* Botão para abrir a câmera */}
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.text}>Abrir Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Exibe a imagem selecionada ou capturada, se houver */}
      {photo !== null && (
        <Image 
          source={{ uri: photo }} // URI da imagem a ser exibida
          style={styles.image}    // Estilos da imagem
        />
      )}
    </SafeAreaView>
  );
}

// Define os estilos para os componentes do aplicativo
const styles = StyleSheet.create({
  container: {
    flex: 1,            // Ocupa todo o espaço disponível
    alignItems: 'center' // Alinha os itens no centro horizontalmente
  },
  buttons: {
    marginTop: 44,      // Margem superior de 44 pixels
    flexDirection: 'row', // Organiza os botões em linha
    gap: 14,            // Espaçamento entre os botões
    marginBottom: 24,   // Margem inferior de 24 pixels
  },
  button: {
    backgroundColor: '#121212', // Cor de fundo preta
    padding: 4,                 // Preenchimento de 4 pixels
    paddingLeft: 16,            // Preenchimento à esquerda de 16 pixels
    paddingRight: 16,           // Preenchimento à direita de 16 pixels
    borderRadius: 4,            // Borda arredondada de 4 pixels
  },
  text: {
    color: '#fff'               // Cor do texto branca
  },
  image: {
    width: '90%',               // Largura de 90% do contêiner
    height: 300,                // Altura de 300 pixels
    objectFit: "cover"          // A imagem cobrirá a área especificada mantendo a proporção
  }
});
