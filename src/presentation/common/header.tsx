import colors from '@app/theme/colors';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeaderProps {
  title: string;
}

const Header = ({title}: HeaderProps) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressBack}>
        <Icon name="arrow-left" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.empty} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  empty: {
    width: 24,
    height: 24,
  },
});

export default Header;
