import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function TransactionItem({ item, onDelete, onEdit }) {
  const [visible, setVisible] = useState(false);
  const anchorRef = useRef(null);
  const [anchorCoords, setAnchorCoords] = useState({ x: 0, y: 0 });
  const navigation = useNavigation();

  const openMenu = () => {
    if (anchorRef.current) {
      anchorRef.current.measure((fx, fy, width, height, px, py) => {
        setAnchorCoords({ x: px, y: py + height });
        setVisible(true);
      });
    }
  };

  return (
    <View style={{ backgroundColor: '#fff', padding: 12, marginBottom: 12, borderRadius: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text
          style={{
            color: '#2E7D32',
            flex: 1,
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          {item.title} - ₨ {item.amount} ({item.type})
        </Text>

        <TouchableOpacity ref={anchorRef} onPress={openMenu}>
          <Text style={{ fontSize: 20, paddingHorizontal: 8, color: '#555' }}>⋮</Text>
        </TouchableOpacity>

        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={{ x: anchorCoords.x, y: anchorCoords.y }}
        >
          <Menu.Item
            onPress={() => {
              setVisible(false);
              onEdit(item.id);
            }}
            title="Edit"
          />
          <Menu.Item
            onPress={() => {
              setVisible(false);
              onDelete(item.id);
            }}
            title="Delete"
          />
        </Menu>
      </View>

      <Text style={{ fontSize: 14, color: 'gray', marginTop: 6 }}>{item.date}</Text>
    </View>
  );
}
