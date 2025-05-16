import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type SummaryCardProps = {
  title: string;
  value: string | number;
  backgroundColor?: string;
  textColor?: string;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  backgroundColor = '#f5f5f5',
  textColor = '#333',
}) => {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
  },
  title: {
    fontSize: 14,
    marginTop: 4,
    textTransform: 'uppercase',
  },
});

export default SummaryCard;
