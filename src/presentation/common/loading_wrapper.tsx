import {RootState} from '@app/redux/store';
import colors from '@app/theme/colors';
import React from 'react';

import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

type LoadingWrapperProps = {
  children: React.ReactNode;
};

const LoadingWrapper = ({children}: LoadingWrapperProps) => {
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  return (
    <View style={styles.container}>
      {children}
      {isLoading && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={true}
          onRequestClose={() => {}}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    padding: 30,
    backgroundColor: colors.background,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingWrapper;
