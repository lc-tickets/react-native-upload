import React from 'react';
import {Button, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as LC from 'leancloud-storage';
import * as adapters from '@leancloud/platform-adapters-react-native';

LC.setAdapters(adapters);

LC.init({
  appId: process.env.LC_APP_ID,
  appKey: process.env.LC_APP_KEY,
  serverURL: process.env.LC_SERVER_URL,
});

const App = () => {
  const handleSelectImage = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const file = new LC.File(Date.now() + '.jpg', {blob: source});
        file.metaData('size', response.fileSize);
        file.save().then((file) => {
          console.log(`文件保存完成。objectId：${file.id}`);
        });
      }
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Button title="select image" onPress={handleSelectImage} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
