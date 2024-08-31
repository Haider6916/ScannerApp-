import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text, TextInput} from '..';
import {CopyGrey} from '../../assets';
import {useTheme} from '../../config/theme';
import {getCardType, getCountry, getDate} from '../../utils/stringOperations';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import {styles} from './styles';
import DropDownPicker from 'react-native-dropdown-picker';

const Index = props => {
  const {
    dType,
    setDType,
    subType,
    setSubType,
    country,
    setCountry,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    documentNum,
    setDocNum,
    passportNum,
    setPassNum,
    nationality,
    setNationality,
    dob,
    setDob,
    gender,
    setGender,
    validity,
    setValid,
    personalNum,
    setPersonalNum,
    saveData,
    openCamAgain,
  } = props;
  const colors = useTheme();
  //   console.log(dType);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Male', value: 'M'},
    {label: 'Female', value: 'F'},
    {label: 'Not Defined', value: ''},
  ]);
  /**
   * function will remove invalid values from mrz
   * @param {*} value from which extra data to be removed
   * @param {*} replacewith replacement string
   * @returns clean and formatted value
   */
  const replaceInvalid = (value, replacewith) => {
    return value.replace(/</gm, replacewith).replace(/cc|«/gm, '');
    // .replaceAll('<', replacewith)
    // .replaceAll('cc', '')
    //
    // .replaceAll('«', '');
  };

  const copyData = data => {
    Clipboard.setString(data.toString());
    Toast.show('Copied!', Toast.SHORT);
  };

  return (
    <ScrollView
      // nestedScrollEnabled={true}
      style={{width: '100%', backgroundColor: colors.whiteBackground}}>
      <View style={{marginVertical: 20}}>
        <View style={{height: 70, justifyContent: 'center'}}>
          <TextInput
            value={dType && dType.length > 0 ? getCardType(dType) : ''}
            onChangeText={setDType}
            placeholder={'Doc Type'}
          />
        </View>
        <View style={{height: 70, justifyContent: 'center'}}>
          <TextInput
            value={
              subType && subType.length > 0 ? replaceInvalid(subType, '') : ''
            }
            onChangeText={setSubType}
            placeholder={'Sub Type'}
          />
        </View>
        <View style={{height: 70, justifyContent: 'center'}}>
          <TextInput
            value={
              country && country.length > 0
                ? getCountry(replaceInvalid(country, ''))
                : ''
            }
            onChangeText={setCountry}
            placeholder={'Country'}
          />
        </View>

        <View style={{height: 70, justifyContent: 'center'}}>
          <TextInput
            value={
              firstName && firstName.length > 0
                ? replaceInvalid(firstName, ' ')
                : ''
            }
            onChangeText={setFirstName}
            placeholder={'First Name'}
            icon={
              <TouchableOpacity
                onPress={() =>
                  firstName && firstName.length > 0
                    ? copyData(replaceInvalid(firstName, ' '))
                    : Toast.show('Nothing To Copy', Toast.SHORT)
                }>
                <CopyGrey />
              </TouchableOpacity>
            }
          />
        </View>

        <View style={{height: 70, justifyContent: 'center'}}>
          <TextInput
            value={
              lastName && lastName.length > 0
                ? replaceInvalid(lastName, ' ')
                : ''
            }
            onChangeText={setLastName}
            placeholder={'Last Name'}
          />
        </View>

        <View style={{height: 70, justifyContent: 'center'}}>
          <TextInput
            value={
              documentNum && documentNum.length > 0
                ? replaceInvalid(documentNum, '')
                : ''
            }
            onChangeText={setDocNum}
            placeholder={'Doc Number'}
            icon={
              <TouchableOpacity
                onPress={() =>
                  documentNum && documentNum.length > 0
                    ? copyData(replaceInvalid(documentNum, ''))
                    : Toast.show('Nothing To Copy', Toast.SHORT)
                }>
                <CopyGrey />
              </TouchableOpacity>
            }
          />
        </View>

        <View style={{height: 70, justifyContent: 'center'}}>
          <TextInput
            value={
              passportNum && passportNum.length > 0
                ? replaceInvalid(passportNum, '')
                : ''
            }
            onChangeText={setPassNum}
            placeholder={'Passport Number'}
            icon={
              <TouchableOpacity
                onPress={() =>
                  passportNum && passportNum.length > 0
                    ? copyData(replaceInvalid(passportNum, ''))
                    : Toast.show('Nothing To Copy', Toast.SHORT)
                }>
                <CopyGrey />
              </TouchableOpacity>
            }
          />
        </View>

        <View style={{height: 70, justifyContent: 'center'}}>
          <TextInput
            value={
              nationality && nationality.length > 0
                ? getCountry(replaceInvalid(nationality, ''))
                : ''
            }
            onChangeText={setNationality}
            placeholder={'Nationality'}
          />
        </View>

        <View style={{height: 70, justifyContent: 'center'}}>
          <TextInput
            value={
              dob && dob.length > 0 ? getDate(replaceInvalid(dob, '')) : ''
            }
            onChangeText={setDob}
            placeholder={'Date of Birth'}
          />
        </View>

        <View
          style={{height: 70, justifyContent: 'center', flexDirection: 'row'}}>
          {/* <TextInput
            value={gender && gender.length > 0 ? getGender(gender) : ''}
            onChangeText={setGender}
            placeholder={'Gender'}
          /> */}
          <DropDownPicker
            open={open}
            value={gender}
            items={items}
            setOpen={setOpen}
            setValue={setGender}
            setItems={setItems}
            listMode="SCROLLVIEW"
            style={{backgroundColor: colors.whiteBackground}}
          />
        </View>

        <View style={{height: 70, justifyContent: 'center'}}>
          <TextInput
            value={
              validity && validity.length > 0
                ? getDate(replaceInvalid(validity, ''))
                : ''
            }
            onChangeText={setValid}
            placeholder={'Expiry'}
          />
        </View>

        <View style={{height: 70, justifyContent: 'center'}}>
          <TextInput
            value={
              personalNum && personalNum.length > 0
                ? replaceInvalid(personalNum, '')
                : ''
            }
            onChangeText={setPersonalNum}
            placeholder={'Personal Number'}
            icon={
              <TouchableOpacity
                onPress={() =>
                  personalNum && personalNum.length > 0
                    ? copyData(replaceInvalid(personalNum, ''))
                    : Toast.show('Nothing To Copy', Toast.SHORT)
                }>
                <CopyGrey />
              </TouchableOpacity>
            }
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={openCamAgain}
            style={{
              height: 50,
              paddingHorizontal: 30,
              borderWidth: 1,
              borderColor: colors.appBlue,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.45,
            }}>
            <View style={styles.buttonWrapper}>
              <Text appBlue regular subhead>
                {`Scan Again`}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => saveData()}
            style={{
              height: 50,
              paddingHorizontal: 30,
              backgroundColor: colors.appBlue,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.45,
            }}>
            <View style={styles.buttonWrapper}>
              <Text whiteColor regular body1>
                {`Save`}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default Index;
