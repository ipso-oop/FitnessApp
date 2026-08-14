const React = require('react');
const { SafeAreaView, StatusBar, StyleSheet } = require('react-native');
const { EmojiTranslatorScreen } = require('./src/presentation/screens/EmojiTranslatorScreen');

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <EmojiTranslatorScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7fb',
  },
});

module.exports = App;
