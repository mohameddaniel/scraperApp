import React, { useState,useRef,useEffect } from 'react';
import { 
  View, Text, Image, StyleSheet, StatusBar, ScrollView, TouchableOpacity, FlatList, SafeAreaView, Dimensions, 
  NativeSyntheticEvent,
  NativeScrollEvent,
  BackHandler,
  Alert
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Searchbar, Surface } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { category } from './const/category'; 
import { prodData } from './const/data'; 
import { groupData } from './const/groupData'; 
import * as Animatable from 'react-native-animatable';
import { renderData } from './const/HomeUtils';
import { Product } from './const/type';

const { width } = Dimensions.get('window');
const itemsPerPage = 6;

const HomeScreen = (): React.JSX.Element => {
  const rowData = groupData(prodData, 3); 
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rowData.length / itemsPerPage);
  const visiblePages = 4;
  const [showPagination, setShowPagination] = useState(false);
  const scrollOffset = useRef(0); 



  
  useEffect(()=>{
    const backAction = () =>{
        Alert.alert('Quitter l’application',
        'Êtes-vous sûr de vouloir quitter l’application ?',
        [{text:'Non' ,onPress:()=>null,style:'cancel'},
         {text:'Oui',onPress:BackHandler.exitApp ,style:'default'}],
        {cancelable:false})
        return true
    }

    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
    )
    return ()=> backHandler.remove()
  },[])

  const handleScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const isScrollingUp = currentOffset > scrollOffset.current;

    if (isScrollingUp) {
      setShowPagination(true);
    } else {
      setShowPagination(false);
    }
    scrollOffset.current = currentOffset; 
  };


  const paginatedData = rowData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPaginationRange = () => {
    const start = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    const end = Math.min(start + visiblePages - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#7dd3fc" />
      <View style={styles.searchSection}>
        <Searchbar
          placeholder="Rechercher par nom ou marque"
          style={styles.searchbar}
        />
        <AntDesign name="filter" size={24} color="#0c4a6e" style={styles.filterIcon} />
      </View>

      <Text style={styles.categoryLabel}>
        <MaterialIcons name="category" size={20} color="red" /> Catégories
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {category.map((item, index) => (
          <Surface style={styles.categoryItem} key={index}>
            <Text style={styles.categoryText}>{item.name}</Text>
            <Icon name={item.icon} size={20} color="#fff" />
          </Surface>
        ))}
      </ScrollView>
      <FlatList
        data={paginatedData}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderData}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={styles.flatList}
      />

     {showPagination && (
      <View style={styles.pagination}>
        {currentPage > 1 && (
          <Animatable.View animation={"fadeInUp"}>
          <TouchableOpacity onPress={() => setCurrentPage(currentPage - 1)} style={styles.pageButton}>
            <Text style={styles.pageText}>{"<"}</Text>
          </TouchableOpacity>
          </Animatable.View>
        )}
        {getPaginationRange().map((page) => (
          <Animatable.View
          animation={"fadeInUp"}
           key={page}>
            <TouchableOpacity
            onPress={() => setCurrentPage(page)}
            style={[styles.pageButton, page === currentPage && styles.currentPage]}
          >
            <Text style={[styles.pageText, page === currentPage && styles.currentPageText]}>
              {page}
            </Text>
          </TouchableOpacity>
          </Animatable.View>
        ))}
        {currentPage < totalPages && (
        <Animatable.View animation={"fadeInUp"}>
          <TouchableOpacity onPress={() => setCurrentPage(currentPage + 1)} style={styles.pageButton}>
            <Text style={styles.pageText}>{">"}</Text>
          </TouchableOpacity>
        </Animatable.View>
        )}
      </View>)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#f0f9ff'
     },
  menuIcon: { 
    marginLeft: 'auto' 
  },
  searchSection: { 
     flexDirection: 'row',
     padding: 10, 
     alignItems: 'center' 
    },
  searchbar: { 
    flex: 1, 
    borderRadius: 20, 
    backgroundColor: '#bae6fd', 
    marginRight: 8 
  },
  filterIcon: { 
    padding: 10, 
    backgroundColor: '#bae6fd', 
    borderRadius: 20, 
    elevation: 4
   },
  categoryLabel: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#0c4a6e', 
    padding: 8,

  },
  categoryScroll: {
     paddingHorizontal: 6, 
     height:50
  },
  categoryItem: { 
    padding:6, 
    backgroundColor: '#0c4a6e', 
    borderRadius: 20, 
    flexDirection: 'row', 
    alignItems: 'center' ,
    marginRight:6
  },
  categoryText: { 
    color: '#fff', 
    marginRight: 5
   },
  flatList: { 
    paddingHorizontal: 10
   },
  pagination: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 10 
  },
  pageButton: { 
    marginHorizontal: 5, 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    height:30,
    width:30,
    backgroundColor: '#e5e7eb', 
    borderRadius: 50
  },
  currentPage: { 
    backgroundColor: '#0284c7'
   },
  pageText: { 
    color: '#374151',
     fontWeight: 'bold' },
  currentPageText: { 
    color: '#fff' },
});

export default HomeScreen;
