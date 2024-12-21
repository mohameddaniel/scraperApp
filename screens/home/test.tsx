import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');
const itemsPerPage = 6;

const HomeScreen = (): React.JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false);
  const scrollOffset = useRef(0); 
  const totalPages = Math.ceil(30 / itemsPerPage); 
  const visiblePages = 4;

  const data = Array.from({ length: 30 }, (_, index) => `Item ${index + 1}`);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPaginationRange = () => {
    const start = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    const end = Math.min(start + visiblePages - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const isScrollingUp = currentOffset < scrollOffset.current;

    if (isScrollingUp) {
      setShowPagination(true);
    } else {
      setShowPagination(false);
    }
    scrollOffset.current = currentOffset;
  };

  const renderData = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#7dd3fc" />
      <FlatList
        data={paginatedData}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderData}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.flatListContent}
      />
      {showPagination && (
        <View style={styles.pagination}>
          {currentPage > 1 && (
            <TouchableOpacity
              onPress={() => setCurrentPage(currentPage - 1)}
              style={styles.pageButton}
            >
              <Text style={styles.pageText}>{"<"}</Text>
            </TouchableOpacity>
          )}
          {getPaginationRange().map((page) => (
            <TouchableOpacity
              key={page}
              onPress={() => setCurrentPage(page)}
              style={[styles.pageButton, page === currentPage && styles.currentPage]}
            >
              <Text
                style={[
                  styles.pageText,
                  page === currentPage && styles.currentPageText,
                ]}
              >
                {page}
              </Text>
            </TouchableOpacity>
          ))}
          {currentPage < totalPages && (
            <TouchableOpacity
              onPress={() => setCurrentPage(currentPage + 1)}
              style={styles.pageButton}
            >
              <Text style={styles.pageText}>{">"}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  flatListContent: { paddingHorizontal: 10 },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  itemText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f9ff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  pageButton: {
    marginHorizontal: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
  },
  currentPage: { backgroundColor: '#2563eb' },
  pageText: { color: '#374151', fontWeight: 'bold' },
  currentPageText: { color: '#fff' },
});

export default HomeScreen;
