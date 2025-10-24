import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const YouTubeModal = ({ route, navigation }) => {
  const { url } = route.params;

  return (
    <Modal animationType="slide" transparent={false} visible={true}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <WebView source={{ uri: url }} style={styles.webView} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 40, // Daha aşağıya taşındı
    left: 20,
    zIndex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default YouTubeModal;