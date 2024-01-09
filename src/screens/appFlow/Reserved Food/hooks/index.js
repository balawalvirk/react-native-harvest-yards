import { useEffect, useMemo, useState } from "react"
import firestore from '@react-native-firebase/firestore'
import { firestoreCollections, orderStatuses, useFirebaseAuth } from "../../../../services";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export function useHooks() {

    const navigation = useNavigation();

    const { user, auth } = useFirebaseAuth()

    //new
    const [pendingPickups, setPendingPickups] = useState(null)
    // const [favourites, setFavourites] = useState(null)
    //old
    const [selectedTouchable, setSelectedTouchable] = useState('Pending Pick-ups');
    const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
    const [showQRMainView, setShowQRMainView] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingAnimation, setLoadingAnimation] = useState(false);
    const [reservedFoodData, setReservedFoodData] = useState([]);
    const [favoritesData, setFavoritesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    //const [filteredData, setFilteredData] = useState([]);

    const isPendingPickupsTab = useMemo(() => selectedTouchable === 'Pending Pick-ups', [selectedTouchable])
    //fetch pending pickups / pending orders
    useEffect(() => {
        // Reference to the Firestore collection
        const collectionRef = firestore().
            collection(firestoreCollections.orders).
            where('userId', '==', user?.uid).
            where('status', '==', orderStatuses.pending);

        // Subscribe to changes in the collection
        const unsubscribe = collectionRef.onSnapshot((snapshot) => {
            const newData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('pending pickes data: ', newData)
            setPendingPickups(newData);
            getDistributorData(newData)
        });


        // Unsubscribe when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array means it runs once on mount

    //fetch favourite distributer
    // useEffect(() => {
    //     // Reference to the Firestore collection
    //     const collectionRef = firestore().
    //         collection(firestoreCollections.distributors).
    //         where('usersFavourit', 'array-contains', user?.uid)

    //     // Subscribe to changes in the collection
    //     const unsubscribe = collectionRef.onSnapshot((snapshot) => {
    //         const newData = snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));
    //         setFavourites(newData);
    //     });

    //     // Unsubscribe when the component unmounts
    //     return () => unsubscribe();
    // }, []); // Empty dependency array means it runs once on mount


    const getDistributorData = async (ordersData) => {
        // Collect all distributorIds from the orders
        const _pendingPickups=ordersData
        const distributorIds = _pendingPickups.map((order) => order.distributorId);
        console.log('distributorIds: ', distributorIds)
        // Fetch distributor details from "distributors" collection
        const distributorPromises = distributorIds.map(async (distributorId) => {
            const distributorDoc = await firestore().collection(firestoreCollections.distributors).doc(distributorId).get();
            return {
                id: distributorId,
                data: distributorDoc.data(),
            };
        });

        // Wait for all distributor data promises to resolve
        const distributorDataList = await Promise.all(distributorPromises);

        // Update the pendingPickups with distributor details
        const updatedOrdersData = _pendingPickups.map((order) => {
            const distributorData = distributorDataList.find((distributor) => distributor.id === order.distributorId);
            return {
                ...order,
                //...distributorData.data,
                distributor: distributorData ? distributorData.data : null,
            };
        });

        console.log('updatedOrdersData: ', updatedOrdersData)
        // Update the state with the updated pendingPickups
        setPendingPickups(updatedOrdersData);
    };

  





    const handleCardPress = (item) => {
        if (selectedTouchable === 'Pending Pick-ups') {
            // Navigate to ReservedPickups screen with parameters for 'pending'
            navigation.navigate('AppNavigation', {
                screen: 'ReservedPickups',
                params: { item: { ...item, reservationDate: item.reservationDate.toDate() }, selectedTouchable: selectedTouchable }
            });
        } else if (selectedTouchable === 'Favorites') {
            // Navigate to Reservedfavorites screen with parameters for 'favourites'
            navigation.navigate('AppNavigation', {
                screen: 'Reservedfavorites',
                params: { item: item, selectedTouchable: selectedTouchable, reservationDate: item.reservationDate }
            });
        }
    };
    const onRefresh = () => {
        setRefreshing(true);
       // fetchDataFromFirestore();
        fetchFavorites();
        setRefreshing(false);
    };

    const fetchFavorites = async () => {
        try {
            setLoading(true);

            setLoadingAnimation(true);
            const currentUser = auth().currentUser;
            const userId = currentUser ? currentUser.uid : null;
            if (!userId) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'User ID not found',
                });
                return;
            }
            const userDocRef = firestore().collection('users').doc(userId);
            const userDoc = await userDocRef.get();
            const userData = userDoc.data();
            let favoritesArray = userData && userData.favorites ? userData.favorites : [];
            setFavoritesData(favoritesArray);
            setLoading(false);

            setLoadingAnimation(false);
        } catch (error) {
            setLoading(false);
            setLoadingAnimation(false);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch favorites. Please try again.',
            });
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);


    const handleSearch = (text) => {
        const formattedQuery = text.toLowerCase();
        setSearchQuery(formattedQuery);

        const filteredItems = isPendingPickupsTab
            ? pendingPickups.filter(item =>
                item.organization.toLowerCase().includes(formattedQuery)
            )
            : favoritesData.filter(item =>
                item.organization.toLowerCase().includes(formattedQuery)
            );

        //setFilteredData(filteredItems);
        return filteredItems
    };



    // const fetchDataFromFirestore = async () => {
    //     try {
    //         setLoading(true);
    //         setLoadingAnimation(true);
    //         const currentUser = auth().currentUser;
    //         const userId = currentUser ? currentUser.uid : null;
    //         if (!userId) {
    //             console.error('User ID not found');
    //             return;
    //         }
    //         const userDocRef = firestore().collection('users').doc(userId);
    //         const userDoc = await userDocRef.get();
    //         const userData = userDoc.data();

    //         if (userData && userData.reservedFood) {
    //             // Set the reserved food data fetched from Firestore to state
    //             setReservedFoodData(userData.reservedFood);
    //         }
    //         setLoading(false);
    //         setLoadingAnimation(false);
    //     } catch (error) {
    //         setLoading(false);
    //         setLoadingAnimation(false);
    //         console.error('Error fetching reserved food information:', error);
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Error',
    //             text2: 'Failed to fetch reserved food information. Please try again.',
    //         });
    //     }
    // };
    // useEffect(() => {
    //     fetchDataFromFirestore();
    // }, []);


    const filteredData = useMemo(() => {
        let _data = []
        if (searchQuery) {
            _data = handleSearch(searchQuery)
        }
        return _data
    }, [searchQuery, isPendingPickupsTab, pendingPickups, favoritesData])

    const viewableData = useMemo(() => {
        const _data = searchQuery !== '' ? filteredData : isPendingPickupsTab ? pendingPickups : favoritesData

        return _data
    }, [searchQuery, filteredData, isPendingPickupsTab, pendingPickups, favoritesData])

    return {
        //local states
        pendingPickups, setPendingPickups,
        selectedTouchable, setSelectedTouchable,
        isHelpCalloutModalVisible, setHelpCalloutModalVisible,
        showQRMainView, setShowQRMainView,
        refreshing, setRefreshing,
        loading, setLoading,
        loadingAnimation, setLoadingAnimation,
        reservedFoodData, setReservedFoodData,
        searchQuery, setSearchQuery,
        filteredData,
        favoritesData, setFavoritesData,

        //data
        viewableData,
        isPendingPickupsTab,

        //local methods
        handleCardPress,
        handleSearch,
        onRefresh
    }
}