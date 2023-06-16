import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
// import * as EmailValidator from 'email-validator';
import 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const VerifyPhoneNumber = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleConfirmEmail = () => {
    if (!email) {
      Alert.alert(
        'Cảnh báo',
        'Vui lòng nhập thông tin email',
        [
          {
            text: 'Hủy',
            onPress: () => console.log('Hủy pressed'),
            style: 'cancel',
          },
          { text: 'Xóa', onPress: () => console.log('Xóa pressed') },
        ],
        {
          titleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
          },
          messageStyle: {
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
          },
          containerStyle: {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
            padding: 20,
          },
        },
      );
      return;
    }

    if (!EmailValidator.validate(email)) {
      Alert.alert(
        'Cảnh báo',
        'Email không đúng định dạng, vui lòng nhập lại',
        [
          {
            text: 'Hủy',
            onPress: () => console.log('Hủy pressed'),
            style: 'cancel',
          },
          { text: 'Xóa', onPress: () => console.log('Xóa pressed') },
        ],
        {
          titleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
          },
          messageStyle: {
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
          },
          containerStyle: {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
            padding: 20,
          },
        },
      );
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => Alert.alert(
        'Thành công',
        'Link đổi mật khẩu đã được gữi ở email của bạn!',
        undefined,
        {
          titleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
          },
          messageStyle: {
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
          },
          containerStyle: {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
            padding: 20,
          },
        },
      ))
      .catch((err) => {
        Alert.alert(
          'Lỗi',
          err.message,
          undefined,
          {
            titleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
            },
            messageStyle: {
              fontSize: 16,
              color: '#666',
              textAlign: 'center',
            },
            containerStyle: {
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 10,
              padding: 20,
            },
          },
        );
      });
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Xác thực Email</Text>
        <TextInput
          style={styles.txtInput}
          placeholder="email"
          value={email}
          onChangeText={(e) => { setEmail(e) }} />
      </View>
      <View>
        <TouchableOpacity style={styles.btnsignup} onPress={() => handleConfirmEmail()}>
          <Text style={styles.txtbtnSignup}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.elevation}>
        <TouchableOpacity style={styles.btnreturn} onPress={() => navigation.goBack()}>
          <Text style={styles.txtbtnReturn}>Trở về đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontFamily: fontstyle.fontfamily_1,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginLeft: 20,
    marginTop: 270,
    marginBottom: 30,
  },
  image: {
    marginTop: 66,
    width: 369,
    height: 217,
  },
  txtInput: {
    width: 350,
    height: 46,
    borderRadius: 10,
    marginHorizontal: 19,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: color.bodercolor1,
  },

  btnsignup: {
    backgroundColor: color.btn_color1,
    width: 346,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 30,
  },
  btnreturn: {
    backgroundColor: color.btn_color3,
    width: 350,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 30,
    elevation: 5,
  },
  txtbtnSignup: {
    fontSize: 18,
    fontWeight: 300,
    fontFamily: fontstyle.fontfamily_2,
    color: color.txtbtn_color1,
  },
  txtbtnReturn: {
    fontSize: 18,
    fontWeight: 300,
    fontFamily: fontstyle.fontfamily_2,
    color: color.txtbtn_color2,
  },
});

export default VerifyPhoneNumber;
